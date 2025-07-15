// File: app/(auth)/verify-otp/page.tsx
import { Suspense } from 'react';
import VerifyOtpPageClient from './VerifyOtpPageClient';

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpPageClient />
    </Suspense>
  );
}