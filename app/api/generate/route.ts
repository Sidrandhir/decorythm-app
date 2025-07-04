// FINAL - File: app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Replicate from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });
const IMAGE_GENERATION_MODEL = "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication and Validation
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single();
    if (!profile || profile.credits <= 0) return new Response("No credits left", { status: 402 });

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const style = formData.get('style') as string;
    const roomType = formData.get('roomType') as string;
    if (!imageFile || !style || !roomType) return new Response("Missing required fields", { status: 400 });

    // 2. Upload original image
    const inputFilePath = `${user.id}/input/${Date.now()}_${imageFile.name}`;
    await supabase.storage.from('generations').upload(inputFilePath, imageFile);
    const { data: { publicUrl: inputImageUrl } } = supabase.storage.from('generations').getPublicUrl(inputFilePath);

    // 3. AI Generation
    const prompt = `A photorealistic, ${style} ${roomType}, high-end interior design, 8k, high quality, architectural digest`;
    console.log(`Calling Stable Model: ${IMAGE_GENERATION_MODEL}`);
    const replicateOutput = await replicate.run(IMAGE_GENERATION_MODEL, {
      input: { image: inputImageUrl, prompt, image_strength: 0.65 }
    });

    const replicateImageUrl = (replicateOutput as string[])?.[0];
    if (!replicateImageUrl) throw new Error("AI model did not return an image URL.");
    console.log(`AI generated temporary URL: ${replicateImageUrl}`);

    // 4. Download the generated image from Replicate
    console.log("Downloading generated image from Replicate...");
    const imageResponse = await fetch(replicateImageUrl);
    if (!imageResponse.ok) throw new Error("Failed to download generated image from AI service.");
    const imageBlob = await imageResponse.blob();

    // 5. Asynchronously save the final image to our own storage AND return it to the user
    // We create a promise to handle the upload to Supabase
    const outputFilePath = `${user.id}/output/${Date.now()}.png`;
    const uploadPromise = supabase.storage.from('generations').upload(outputFilePath, imageBlob);

    // We create a promise to save the metadata to our database
    const dbPromise = uploadPromise.then(async (uploadResult) => {
        if (uploadResult.error) throw new Error(`Supabase upload error: ${uploadResult.error.message}`);
        const { data: { publicUrl: finalImageUrl } } = supabase.storage.from('generations').getPublicUrl(outputFilePath);
        console.log(`Successfully saved to our storage. Final URL: ${finalImageUrl}`);
        
        await supabase.from('generations').insert({ user_id: user.id, prompt, style, input_image_url: inputImageUrl, output_image_url: finalImageUrl });
        await supabase.rpc('decrement_credits', { user_id_param: user.id });
    });

    // We don't wait for the save to finish. We send the image to the user immediately.
    // This makes the UI feel much faster.
    
    // Set headers to tell the browser it's receiving an image
    const headers = new Headers();
    headers.set('Content-Type', 'image/png');

    // Wait for all background tasks to complete before finishing the request fully
    // This is important for serverless function lifecycle
    request.signal.addEventListener('abort', () => {
        Promise.all([uploadPromise, dbPromise]).catch(console.error);
    });

    return new Response(imageBlob, { status: 200, headers });

  } catch (error) {
    console.error("Full API Error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}