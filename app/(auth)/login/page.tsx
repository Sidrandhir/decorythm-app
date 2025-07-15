import { Suspense } from 'react';
import LoginPageClient from './LoginPageClient';

export default function LoginPage() {
  // This wrapper provides the Suspense boundary needed by the client component.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageClient />
    </Suspense>
  );
}