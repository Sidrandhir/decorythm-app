// FINAL, CORRECTED, AND UNIFIED - app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Replicate from "replicate";
import type { Prediction } from "replicate";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! });

// --- TYPE-SAFE, MULTI-MODEL CONFIGURATION ---
type ModelString = `${string}/${string}:${string}`;
const MODELS = {
  // The "Faithful" model for subtle, structured changes
  faithful: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b' as ModelString,
  // The "Creative" model for more artistic, layout-changing transformations
  creative: 'lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b' as ModelString,
};

// Helper function to wait for a prediction to finish.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function waitForPrediction(prediction: Prediction): Promise<Prediction> {
    let currentPrediction = prediction;
    while (currentPrediction.status !== "succeeded" && currentPrediction.status !== "failed") {
        await sleep(2500);
        currentPrediction = await replicate.predictions.get(currentPrediction.id);
        console.log(`Polling... Current status: ${currentPrediction.status}`);
    }
    return currentPrediction;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Setup and Validation
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
    const lighting = formData.get('lighting') as string;
    const materials = formData.get('materials') as string;
    const furniture = formData.get('furniture') as string;
    const creativityLevel = formData.get('creativityLevel') as string || 'balanced';

    if (!imageFile || !style || !roomType || !lighting || !materials || !furniture) {
        return NextResponse.json({ error: 'Missing design fields.' }, { status: 400 });
    }

    // 2. Upload User's Original Image
    const inputFilePath = `input/${user.id}/${Date.now()}.${imageFile.name.split('.').pop()}`;
    await supabase.storage.from('generations').upload(inputFilePath, imageFile);
    const { data: { publicUrl: inputImageUrl } } = supabase.storage.from('generations').getPublicUrl(inputFilePath);

    // 3. Assemble the Expert Prompt
    const prompt = `award-winning architectural photography of a ${style} ${roomType}, ${lighting} lighting, featuring ${furniture} made from ${materials}, extremely detailed, photorealistic, 8k, interior design, architectural digest`;
    
    // 4. Select Model and Parameters based on User's Choice
    const modelToUse = creativityLevel === 'creative' ? MODELS.creative : MODELS.faithful;
    const modelVersion = modelToUse.split(':')[1];
    let modelInput: object;

    if (creativityLevel === 'creative') {
        modelInput = { image: inputImageUrl, prompt };
        console.log(`Calling CREATIVE Model: ${modelToUse}`);
    } else {
        const imageStrengthMap = { 'subtle': 0.75, 'balanced': 0.6 };
        const strengthKey = creativityLevel as keyof typeof imageStrengthMap;
        const image_strength = imageStrengthMap[strengthKey] || 0.6;
        modelInput = { 
            image: inputImageUrl, 
            prompt, 
            image_strength: image_strength,
            negative_prompt: "ugly, deformed, blurry, low quality, cartoon, anime"
        };
        console.log(`Calling FAITHFUL Model: ${modelToUse} with strength ${image_strength}`);
    }

    // 5. Create and await the prediction using the robust polling method
    let prediction = await replicate.predictions.create({ version: modelVersion, input: modelInput });
    const finalPrediction = await waitForPrediction(prediction);
    
    if (finalPrediction.status === "failed") {
        throw new Error(`AI Prediction Failed: ${finalPrediction.error}`);
    }

    // 6. Robustly handle the output from ANY model
    const rawOutput = finalPrediction.output as any;
    let temporaryReplicateUrl: string | undefined;

    if (Array.isArray(rawOutput) && typeof rawOutput[0] === 'string') {
        temporaryReplicateUrl = rawOutput[0];
    } else if (typeof rawOutput === 'string') {
        temporaryReplicateUrl = rawOutput;
    }

    if (!temporaryReplicateUrl || !temporaryReplicateUrl.startsWith('https')) {
      throw new Error(`AI model returned an invalid result format. Raw output: ${JSON.stringify(rawOutput)}`);
    }

    // 7. Persist the Generated Image
    const imageResponse = await fetch(temporaryReplicateUrl);
    const imageBlob = await imageResponse.blob();
    const outputFilePath = `output/${user.id}/${Date.now()}.png`;
    await supabase.storage.from('generations').upload(outputFilePath, imageBlob);
    const { data: { publicUrl: permanentOutputUrl } } = supabase.storage.from('generations').getPublicUrl(outputFilePath);

    // 8. Save Record and Decrement Credits
    const { data: generationRecord } = await supabase.from('generations').insert({
      user_id: user.id, prompt, style, input_image_url: inputImageUrl, output_image_url: permanentOutputUrl,
    }).select().single();

    await supabase.rpc('decrement_credits', { user_id_param: user.id });

    // 9. Return the Permanent URL and ID
    return NextResponse.json({ outputUrl: permanentOutputUrl, generationId: generationRecord?.id }, { status: 200 });

  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("Full API Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}