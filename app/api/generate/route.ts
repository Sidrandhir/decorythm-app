// File: app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Replicate from "replicate";
import type { Prediction } from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

<<<<<<< HEAD
type ModelString = `${string}/${string}:${string}`;
const MODELS = {
  llm: 'meta/meta-llama-3-8b-instruct:63af54052e43033858c44b9437de5e59b3a358823a078e72bb3a151044453556' as ModelString,
  faithful: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b' as ModelString,
  creative: 'lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b' as ModelString,
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function waitForPrediction(prediction: Prediction): Promise<Prediction> {
    // ... (polling logic is the same)
    let currentPrediction = prediction;
    while (currentPrediction.status !== "succeeded" && currentPrediction.status !== "failed") {
        await sleep(2500);
        currentPrediction = await replicate.predictions.get(currentPrediction.id);
        console.log(`Polling... Current status: ${currentPrediction.status}`);
    }
    return currentPrediction;
}

=======
// --- TYPE-SAFE MODEL CONFIGURATION ---
// By defining the type here, we ensure TypeScript is happy everywhere we use these.
type ModelString = `${string}/${string}:${string}`;

// This is the most stable and reliable model configuration we have established.
const MODELS = {
  // Model for generating the detailed image prompt
  llm: 'meta/meta-llama-3-8b-instruct:63af54052e43033858c44b9437de5e59b3a358823a078e72bb3a151044453556' as ModelString,
  // Model for generating the final image using the original image as a guide.
  image: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b' as ModelString,
};

// Helper function to wait for a prediction to finish.
async function waitForPrediction(prediction: Prediction): Promise<Prediction> {
  if (prediction.status === "succeeded" || prediction.status === "failed") {
    return prediction;
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  const updatedPrediction = await replicate.predictions.get(prediction.id);
  console.log(`Polling... Current status: ${updatedPrediction.status}`);
  return waitForPrediction(updatedPrediction);
}


>>>>>>> b38716f (fix: Resolve build errors from ESLint and TypeScript types)
export async function POST(request: NextRequest) {
  // 1. Verification and Setup
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single();
    if (!profile || profile.credits <= 0) return NextResponse.json({ error: 'You have no credits left.' }, { status: 402 });

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const style = formData.get('style') as string;
    const roomType = formData.get('roomType') as string;
<<<<<<< HEAD
    const creativityLevel = formData.get('creativityLevel') as string || 'balanced';

    if (!imageFile || !style || !roomType) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

=======
    const creativityLevel = formData.get('creativityLevel') as string || 'balanced'; // Default to 'balanced'

    if (!imageFile || !style || !roomType) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    // 2. Image Preparation
>>>>>>> b38716f (fix: Resolve build errors from ESLint and TypeScript types)
    const filePath = `${user.id}/${Date.now()}.${imageFile.name.split('.').pop()}`;
    await supabase.storage.from('generations').upload(filePath, imageFile);
    const { data: { publicUrl: inputImageUrl } } = supabase.storage.from('generations').getPublicUrl(filePath);
    
    // Using a direct prompt for stability
    const prompt = `A photorealistic, high-end, ${style} ${roomType}, architectural digest, 8k, cinematic lighting.`;
    
    let modelToUse: ModelString;
    let modelInput: object;

<<<<<<< HEAD
    if (creativityLevel === 'creative') {
        modelToUse = MODELS.creative;
        modelInput = { image: inputImageUrl, prompt };
    } else {
        modelToUse = MODELS.faithful;
        
        // --- THIS IS THE FIX ---
        const imageStrengthMap = {
          subtle: 0.75,
          balanced: 0.6,
        };
        // We ensure `creativityLevel` is one of the valid keys before using it.
        const strengthKey = creativityLevel as keyof typeof imageStrengthMap;
        const image_strength = imageStrengthMap[strengthKey] || 0.6; // Default to 0.6 if key is invalid
        // --- END OF FIX ---

        modelInput = { 
            image: inputImageUrl, 
            prompt, 
            image_strength: image_strength,
            negative_prompt: "ugly, deformed, blurry, low quality"
        };
    }
    
    console.log(`Creating prediction job with model: ${modelToUse}`);
    let prediction = await replicate.predictions.create({
      version: modelToUse.split(':')[1],
      input: modelInput,
    });

    const finalPrediction = await waitForPrediction(prediction);
    
    if (finalPrediction.status === "failed") {
      throw new Error(`AI Prediction Failed: ${finalPrediction.error}`);
    }

    const outputArray = finalPrediction.output as any;
    let outputImageUrl: string | undefined;

    if (Array.isArray(outputArray) && typeof outputArray[0] === 'string') {
        outputImageUrl = outputArray[0];
    } else if (typeof outputArray === 'string') {
        outputImageUrl = outputArray;
    }
    
    if (!outputImageUrl || !outputImageUrl.startsWith('https')) {
      throw new Error(`AI model returned an invalid result format.`);
    }
    
    await supabase.from('generations').insert({ user_id: user.id, prompt: prompt, style, input_image_url: inputImageUrl, output_image_url: outputImageUrl });
=======
    // 3. Expert Prompting Logic
    const metaPrompt = `You are a world-class interior design prompt engineer. Create a single, descriptive paragraph for an AI image generator. Goal: a photorealistic, high-end image. The user wants a ${style} ${roomType}. Inject keywords like 'opulent', 'bespoke', 'cinematic lighting', 'architectural digest', '8k'. Output only the prompt paragraph.`;
    
    console.log("Calling LLM to generate detailed prompt...");
    const llmOutput = await replicate.run(MODELS.llm, { input: { prompt: metaPrompt } }) as string[];
    const generatedImagePrompt = llmOutput.join("").trim();
    if (!generatedImagePrompt) throw new Error("LLM failed to generate a creative prompt.");
    console.log(`Generated Prompt: ${generatedImagePrompt}`);

    // 4. Image Generation with Tuned Parameters
    // Map creativity level to image_strength
    const imageStrengthMap: { [key: string]: number } = {
      'subtle': 0.75,   // More faithful to original
      'balanced': 0.6, // Good balance
      'creative': 0.45, // More transformative
    };
    const image_strength = imageStrengthMap[creativityLevel];

    console.log(`Calling Image Model: ${MODELS.image} with strength ${image_strength}`);
    const imageGenPrediction = await replicate.predictions.create({
        version: MODELS.image.split(':')[1],
        input: {
          image: inputImageUrl,
          prompt: generatedImagePrompt,
          image_strength: image_strength,
          negative_prompt: "cartoon, anime, drawing, painting, ugly, deformed, blurry, low quality",
        }
      });

    const finalPrediction = await waitForPrediction(imageGenPrediction);
    
    if (finalPrediction.status === "failed") {
        throw new Error(`AI Prediction Failed: ${finalPrediction.error}`);
    }

    const outputImageUrl = (finalPrediction.output as string[])[0];
    if (!outputImageUrl) throw new Error("The AI model returned an empty result.");
    console.log(`Successfully generated image URL: ${outputImageUrl}`);

    // 5. Finalization
    await supabase.from('generations').insert({ user_id: user.id, prompt: generatedImagePrompt, style, input_image_url: inputImageUrl, output_image_url: outputImageUrl });
>>>>>>> b38716f (fix: Resolve build errors from ESLint and TypeScript types)
    await supabase.rpc('decrement_credits', { user_id_param: user.id });

    return NextResponse.json({ outputUrl: outputImageUrl }, { status: 200 });

  } catch (error) {
    console.error("Full API Error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}