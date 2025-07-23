// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // --- CHANGE: Destructure the new 'phone' field ---
    const { fullName, email, phone, subject, message } = body;

    // 1. Validate the required fields
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Full name, email, subject, and message are required.' }, { status: 400 });
    }

    // 2. Insert the data into the Supabase table
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        { 
          full_name: fullName, 
          email: email, 
          // --- CHANGE: Add the new mobile_number field to the insert query ---
          mobile_number: phone, // The 'phone' from the form body maps to the 'mobile_number' column
          subject: subject, 
          message: message 
        },
      ])
      .select()
      .single();

    // 3. Handle any database errors
    if (error) {
      console.error('Supabase Insert Error:', error);
      throw new Error(error.message);
    }

    // 4. Return a success response
    return NextResponse.json({ 
      message: 'Message saved successfully!',
      submissionId: data.id 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong.' }, { status: 500 });
  }
}