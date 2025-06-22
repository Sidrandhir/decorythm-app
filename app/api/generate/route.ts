import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Replicate from "replicate";

// Initialize Replicate with your API token from .env.local
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // 1. Authenticate the user
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check user credits (optional but good for monetization)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', session.user.id)
    .single();

  if (profileError || !profile || profile.credits <= 0) {
    return NextResponse.json({ error: 'You have no credits left.' }, { status: 402 });
  }

  const formData = await request.formData();
  const imageFile = formData.get('image') as File;
  const style = formData.get('style') as string;
  const roomType = formData.get('roomType') as string;

  if (!imageFile || !style || !roomType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // 2. Upload the input image to Supabase Storage
    const fileExt = imageFile.name.split('.').pop();
    const filePath = `${session.user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('generations') // The bucket name we created
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      throw new Error('Failed to upload image.');
    }

    // Get the public URL of the uploaded image
    const { data: { publicUrl: inputImageUrl } } = supabase.storage
      .from('generations')
      .getPublicUrl(filePath);

    // 3. Call the Replicate API
    const prompt = `a photo of a ${style} ${roomType}, professional interior design, 8k, photorealistic, high quality`;
    const model = "jagilley/controlnet-canny:aff48af9c68d162388d230a2ab05f0545d1e298c7a65985f647414b8374d6139";
    
    const output = await replicate.run(model, {
      input: {
        image: inputImageUrl,
        prompt: prompt,
        num_samples: "1",
        image_resolution: "512", // Keep this reasonable for speed/cost
      },
    });

    const outputImageUrl = Array.isArray(output) ? output[0] : String(output);

    // 4. Save the result to our 'generations' database table
    await supabase.from('generations').insert({
      user_id: session.user.id,
      prompt: prompt,
      style: style,
      input_image_url: inputImageUrl,
      output_image_url: outputImageUrl,
    });
    
    // 5. Decrement user credits
    await supabase.rpc('decrement_credits', { user_id_param: session.user.id });

    // 6. Return the final image URL to the frontend
    return NextResponse.json({ outputUrl: outputImageUrl }, { status: 200 });

  } catch (error) {
    console.error("Full API Error: ", error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}