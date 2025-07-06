import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Replicate from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });
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
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('role, credits').eq('id', user.id).single();
    if (!profile) throw new Error("User profile not found.");
    const isAdmin = profile.role === 'admin';
    if (!isAdmin && profile.credits <= 0) return new Response(JSON.stringify({ error: "No credits left." }), { status: 402 });

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const prompt = `award-winning architectural photography of a ${formData.get('designStyle')} ${formData.get('roomType')}, featuring ${formData.get('furniture')} made from ${formData.get('materials')}. The lighting is ${formData.get('lightingEffect')}. ${formData.get('other') || ''}. extremely detailed, photorealistic, 8k, masterpiece, cinematic, interior design by Kelly Wearstler.`;
    
    const inputFilePath = `${user.id}/input/${Date.now()}`;
    await supabase.storage.from('generations').upload(inputFilePath, imageFile);
    const { data: { publicUrl: inputImageUrl } } = supabase.storage.from('generations').getPublicUrl(inputFilePath);

    const imageGenOutput = await replicate.run(IMAGE_GENERATION_MODEL, {
        input: { image: inputImageUrl, prompt, image_strength: 0.75, negative_prompt: "blurry, low quality" }
    });
    
    const replicateImageUrl = (imageGenOutput as string[])?.[0];
    if (!replicateImageUrl) throw new Error("AI model returned an empty result.");
    
    const imageResponse = await fetch(replicateImageUrl);
    const imageBlob = await imageResponse.blob();

    (async () => {
        try {
            const outputFilePath = `${user.id}/output/${Date.now()}.png`;
            await supabase.storage.from('generations').upload(outputFilePath, imageBlob.slice());
            const { data: { publicUrl: finalImageUrl } } = supabase.storage.from('generations').getPublicUrl(outputFilePath);
            await supabase.from('generations').insert({ user_id: user.id, prompt, style: formData.get('designStyle') as string, input_image_url: inputImageUrl, output_image_url: finalImageUrl });
            if (!isAdmin) await supabase.rpc('decrement_credits', { user_id_param: user.id });
        } catch (e) { console.error("Background save task failed:", e); }
    })();
    
    return new Response(imageBlob, { status: 200, headers: { 'Content-Type': 'image/png' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}