// File: app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Replicate from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

// --- MODEL CONFIGURATION AS PER YOUR INSTRUCTION ---
// 1. LLM for generating a rich, detailed prompt.
const LLM_PROMPT_GENERATOR_MODEL = "meta/meta-llama-3-8b-instruct";
// 2. The specific ControlNet model you requested for image generation.
const IMAGE_GENERATION_MODEL = "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b";


export async function POST(request: NextRequest) {
  try {
    // Stage 1: Verification, Setup, and Image Upload
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
    const style = formData.get('designStyle') as string;
    const roomType = formData.get('roomType') as string;
    const otherDetails = formData.get('other') as string;
    if (!imageFile || !style || !roomType) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const filePath = `${user.id}/input/${Date.now()}.${imageFile.name.split('.').pop()}`;
    await supabase.storage.from('generations').upload(filePath, imageFile);
    const { data: { publicUrl: inputImageUrl } } = supabase.storage.from('generations').getPublicUrl(filePath);

    // --- STAGE 2: ADVANCED TWO-STEP AI GENERATION ---

    // 2a. Create the "Meta Prompt" for the LLM
    const metaPrompt = `You are a world-class interior design prompt engineer. Your task is to synthesize the user's request into a single, cohesive, comma-separated paragraph for an SDXL ControlNet model. The goal is a photorealistic, high-end image that respects the original image layout.

    User's Request:
    - Transform the provided room into a ${style} ${roomType}.
    - Additional details: ${otherDetails || 'none'}.

    INSTRUCTIONS:
    1. Begin the prompt with "A photorealistic redesign of this exact room layout...".
    2. Weave the style, room type, and additional details into a flowing paragraph.
    3. Inject luxury-oriented keywords like 'opulent', 'bespoke', 'sumptuous', 'cinematic lighting', 'architectural digest', '8k', 'high detail'.
    4. Do NOT add any extra text, explanations, or formatting. Output only the final prompt paragraph.
    `;

    // 2b. Call the LLM to generate the detailed image prompt
    console.log("Calling Llama 3 to generate detailed prompt...");
    const llmOutput = await replicate.run(LLM_PROMPT_GENERATOR_MODEL, {
        input: { prompt: metaPrompt }
    }) as string[];
    const generatedImagePrompt = llmOutput.join("").trim();
    if (!generatedImagePrompt) throw new Error("LLM failed to generate a creative prompt.");
    console.log(`Generated Prompt: ${generatedImagePrompt}`);

    // 2c. Call the specified ControlNet model with the generated prompt and original image
    console.log(`Calling ControlNet Model: ${IMAGE_GENERATION_MODEL}`);
    const imageGenOutput = await replicate.run(
      IMAGE_GENERATION_MODEL,
      {
        input: {
          image: inputImageUrl,
          prompt: generatedImagePrompt,
          // This model may not use image_strength, but we add a negative prompt for quality
          negative_prompt: "blurry, distorted, cartoon, low quality, watermark, low-res, messy, deformed, cheap, generic, ugly, plastic, drawing, painting, unrealistic, bad anatomy",
        }
      }
    );
    
    // --- STAGE 3: FINALIZATION ---
    
    // This model returns a single URL string directly, not an array.
    const outputImageUrl = imageGenOutput as string;
    if (!outputImageUrl || typeof outputImageUrl !== 'string') {
        console.error("Replicate output was not in the expected format (a single URL string):", imageGenOutput);
        throw new Error("AI model returned an unexpected data format.");
    }
    console.log(`Successfully generated image URL: ${outputImageUrl}`);
    
    await supabase.from('generations').insert({ user_id: user.id, prompt: generatedImagePrompt, style, input_image_url: inputImageUrl, output_image_url: outputImageUrl });
    await supabase.rpc('decrement_credits', { user_id_param: user.id });
    
    return NextResponse.json({ outputUrl: outputImageUrl }, { status: 200 });

  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}