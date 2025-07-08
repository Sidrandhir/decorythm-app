// FINAL, ROBUST - File: app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Replicate from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

// Using the proven stable model for reliable image-to-image generation
const IMAGE_GENERATION_MODEL = "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single();
    if (!profile || profile.credits <= 0) return NextResponse.json({ error: "No credits left." }, { status: 402 });

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const style = formData.get('designStyle') as string; // Matches StyleSelector name
    const roomType = formData.get('roomType') as string; // Matches StyleSelector name
    if (!imageFile || !style || !roomType) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const filePath = `${user.id}/input/${Date.now()}.${imageFile.name.split('.').pop()}`;
    await supabase.storage.from('generations').upload(filePath, imageFile);
    const { data: { publicUrl: inputImageUrl } } = supabase.storage.from('generations').getPublicUrl(filePath);

    // Simple, direct, and effective prompting
    const prompt = `award-winning architectural photography of a ${style} ${roomType}, ${formData.get('lightingEffect')}, featuring ${formData.get('furniture')} made from ${formData.get('materials')}, extremely detailed, photorealistic, 8k, interior design`;

    const imageGenOutput = await replicate.run(IMAGE_GENERATION_MODEL, {
        input: { image: inputImageUrl, prompt, image_strength: 0.7 }
    });
    
    const outputImageUrl = (imageGenOutput as string[])?.[0];
    if (!outputImageUrl) throw new Error("AI model returned an empty result.");
    
    // Save everything to the database
    await supabase.from('generations').insert({ user_id: user.id, prompt, style, input_image_url: inputImageUrl, output_image_url: outputImageUrl });
    await supabase.rpc('decrement_credits', { user_id_param: user.id });
    
    // Return the URL as JSON, which is what the frontend will now expect
    return NextResponse.json({ outputUrl: outputImageUrl }, { status: 200 });

  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}