// FINAL, CORRECTED - File: app/(auth)/verify-otp/page.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email not found in URL. Please go back to the signup page and try again.");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'signup',
    });

    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // On success, redirect to the login page and pass a success message
      // so the user knows what to do next.
      const successMessage = "Email verified successfully! Please log in to continue.";
      router.push(`/login?message=${encodeURIComponent(successMessage)}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
            <p className="mt-2 text-gray-600">
                We've sent a 6-digit code to <strong>{email || 'your email address'}</strong>.
            </p>
        </div>
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label htmlFor="otp" className="sr-only">Verification Code</label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              placeholder="123456"
              className="w-full px-3 py-2 text-center text-2xl tracking-[0.5em] font-mono border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
          >
            {isLoading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>
        {error && <p className="text-center text-red-600">{error}</p>}
      </div>
    </div>
  );
}