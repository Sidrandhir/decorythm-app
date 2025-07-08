// FINAL - File: app/(auth)/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    // This tells Supabase to send the password reset email.
    // The `redirectTo` URL is where the user will land after clicking the link.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage('If an account exists for this email, a password reset link has been sent.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-pure-white rounded-lg shadow-elevated">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-heading text-primary">Reset Your Password</h1>
          <p className="mt-2 text-text-color-light">Enter your email and we'll send you a link to get back into your account.</p>
        </div>
        
        {message && (
          <div className="p-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-color-light">Email Address</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="input-style"
            />
          </div>
          <button type="submit" disabled={isLoading || !!message} className="button-primary">
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

        <p className="text-sm text-center text-gray-600 mt-4">
            Remembered your password?{' '}
            <Link href="/login" className="font-medium text-accent hover:underline">Back to Log In</Link>
        </p>
      </div>
    </div>
  );
}