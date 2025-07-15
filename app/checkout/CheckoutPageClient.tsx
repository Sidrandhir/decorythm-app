// File: app/checkout/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const generationId = searchParams.get('generationId');

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold">Checkout</h1>
      <p className="mt-4 text-lg">You are purchasing the high-resolution version of image generation ID: <strong>{generationId}</strong></p>
      <div className="mt-8 p-8 border rounded-lg max-w-md mx-auto">
        <p className="text-gray-600">The token amount and checkout progress form will be built here.</p>
        <p className="mt-2 text-sm text-gray-500">(Stripe Integration coming soon)</p>
      </div>
    </div>
  );
}