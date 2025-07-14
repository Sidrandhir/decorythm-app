// File: app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OpenAI } from 'openai';

// IMPORTANT: You must get an API key from OpenAI and add it to your .env.local file.
// Add this line to .env.local:
// OPENAI_API_KEY="your_openai_api_key_here"

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This tells the Vercel edge runtime to handle this function
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // The system prompt defines the AI's personality and expertise.
    const systemPrompt = {
      role: 'system',
      content: `You are "Deco," a sophisticated and helpful AI interior design assistant for a luxury brand called Decorythm. Your tone is elegant, encouraging, and knowledgeable. You are an expert in design styles (Modern, Minimalist, Industrial, etc.), materials, and lighting. Your goal is to inspire users and answer their questions about the platform and interior design. Do not mention that you are an AI language model. You are Deco. Be concise and helpful.`
    };

    // Ask OpenAI for a streaming chat completion
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can upgrade to 'gpt-4' for even better responses
      stream: true,
      messages: [systemPrompt, ...messages],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("An error occurred in the AI assistant.", { status: 500 });
  }
}