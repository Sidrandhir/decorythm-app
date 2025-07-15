// File: app/checkout/page.tsx
import { Suspense } from 'react';
import CheckoutPageClient from './CheckoutPageClient';

export default function CheckoutPage() {
  return (
    // Providing the required Suspense boundary
    <Suspense fallback={<div>Loading Checkout...</div>}>
      <CheckoutPageClient />
    </Suspense>
  );
}