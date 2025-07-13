// File: app/api/chat/route.ts
import { NextResponse } from 'next/server';

// This is a placeholder for the future AI Chatbot API.
// It makes the file a valid module so the build doesn't fail.
export async function POST(request: Request) {
  // In the future, we will add logic here to talk to an LLM.
  console.log("Chat API endpoint was called.");

  // For now, we just return a simple success message.
  return NextResponse.json({ message: 'Chat endpoint is active' });
}