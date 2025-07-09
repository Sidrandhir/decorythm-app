// File: app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Replicate from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

// --- DEFINE OUR TWO DISTINCT RENDER ENGINES ---
const MODELS = {
  creative: {
    // This is your proven, working model for artistic transformations.
    name: "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b",
    llm: "meta/meta-llama-3-8b-instruct",
  },
  realistic: {
    // This is the powerful but memory-intensive model.
    name: "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
  }
};

export async function POST(request: NextRequest) {
  try {
    // Stage 1: Verification, Setup, Image Upload
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
    const selectedModel = formData.get('selectedModel') as 'creative' | 'realistic';
    if (!imageFile || !style || !roomType || !selectedModel) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const filePath = `${user.id}/input/${Date.now()}.${imageFile.name.split('.').pop()}`;
    await supabase.storage.from('generations').upload(filePath, imageFile);
    const { data: { publicUrl: inputImageUrl } } = supabase.storage.from('generations').getPublicUrl(filePath);

    // --- STAGE 2: DYNAMIC AI LOGIC BASED ON USER'S CHOICE ---
    let prompt: string;
    let imageGenOutput: unknown;
    const modelToUse = selectedModel === 'creative' ? MODELS.creative.name : MODELS.realistic.name;

    if (selectedModel === 'creative') {
      console.log("Using Creative Engine (LLM + lucataco)...");
      const metaPrompt = `You are a world-class interior design prompt engineer. Create a single, descriptive paragraph for an AI image generator. Goal: a photorealistic, high-end image that respects the original layout but with a creative flair. The user wants a ${style} ${roomType}. Additional details: ${otherDetails || 'none'}. Inject keywords like 'opulent', 'cinematic lighting', 'imaginative', '8k'. Output only the prompt paragraph.`;
      
      const llmOutput = await replicate.run(MODELS.creative.llm!, { input: { prompt: metaPrompt } }) as string[];
      prompt = llmOutput.join("").trim();
      
      imageGenOutput = await replicate.run(modelToUse, {
        input: { image: inputImageUrl, prompt }
      });

    } else { // 'realistic' model
      console.log("Using Realistic Engine (Direct prompt + stability-ai)...");
      prompt = `A professional photograph of a ${style} ${roomType}, ${otherDetails || ''}, architectural digest, cinematic lighting, 8k, high detail, photorealistic`;
      
      imageGenOutput = await replicate.run(modelToUse, {
        input: {
          image: inputImageUrl,
          prompt: prompt,
          image_strength: 0.65,
          negative_prompt: "cartoon, anime, drawing, painting, ugly, deformed, blurry, low quality",
          // --- THE FIX ---
          // Explicitly request a more memory-efficient output size to prevent CUDA errors.
          width: 768,
          height: 768,
        }
      });
    }

    console.log(`Final Prompt Used: ${prompt}`);

    // --- STAGE 3: FINALIZATION ---
    let outputImageUrl: string | undefined;
    if (selectedModel === 'creative' && typeof imageGenOutput === 'string') {
        outputImageUrl = imageGenOutput;
    } else if (selectedModel === 'realistic' && Array.isArray(imageGenOutput) && imageGenOutput.length > 0) {
        outputImageUrl = imageGenOutput[0];
    }
    
    if (!outputImageUrl) {
      console.error("Replicate output was not in the expected format:", imageGenOutput);
      throw new Error("AI model returned an empty result.");
    }
    
    console.log(`Successfully generated image URL: ${outputImageUrl}`);
    
    await supabase.from('generations').insert({ user_id: user.id, prompt, style, input_image_url: inputImageUrl, output_image_url: outputImageUrl });
    await supabase.rpc('decrement_credits', { user_id_param: user.id });
    
    return NextResponse.json({ outputUrl: outputImageUrl }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    // Catch the specific CUDA error and provide a user-friendly message.
    if (errorMessage.includes("CUDA out of memory")) {
        return NextResponse.json({ 
            error: "The Realistic Engine is currently busy. This can happen with very large images. Please try again in a moment or use the Creative Engine." 
        }, { status: 503 });
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}