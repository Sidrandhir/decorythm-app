// FINAL, CORRECT - File: app/(auth)/verify-otp/page.tsx
'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email not found. Please go back to signup.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setMessage('');

    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'signup', // This specifies we are verifying a signup code
    });

    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Verification successful! You can now log in.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-soft-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-pure-white rounded-lg shadow-elevated">
        <div className="text-center">
            <h1 className="text-2xl font-bold font-heading text-primary">Verify Your Email</h1>
            <p className="mt-2 text-text-color-light">
                We've sent a 6-digit code to <strong>{email || 'your email'}</strong>.
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
              className="input-style w-full text-center text-2xl tracking-[0.5em] font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !!message}
            className="button-primary"
          >
            {isLoading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>
        {error && <p className="text-center text-red-600">{error}</p>}
        {message && <p className="text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}