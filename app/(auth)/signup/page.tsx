// FINAL, CORRECT, SECURE - File: app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { PasswordStrengthMeter } from '@/components/forms/PasswordStrengthMeter';
import { PasswordInput } from '@/components/forms/PasswordInput';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    // This is the correct function. It creates a user and sends the
    // "Confirm signup" email template you configured.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phone,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // A successful call here means the OTP email has been sent.
    // We now send the user to the OTP verification page.
    if (data.user) {
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-soft-white py-12 px-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-pure-white rounded-lg shadow-elevated">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-heading text-primary">Create Your Account</h1>
          <p className="mt-2 text-text-color-light">Begin your journey with Decorythm.</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text-color-light">First Name</label>
              <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="input-style"/>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-text-color-light">Last Name</label>
              <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="input-style"/>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-color-light">Email Address</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-style"/>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-color-light">Phone Number (Optional)</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-style"/>
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-text-color-light">Password</label>
            <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            <PasswordStrengthMeter password={password} />
          </div>
          <div>
            <label htmlFor="confirmPassword"  className="block text-sm font-medium text-text-color-light">Confirm Password</label>
            <PasswordInput id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <button type="submit" disabled={isLoading} className="button-primary">
            {isLoading ? 'Sending Verification...' : 'Create Account'}
          </button>
        </form>
        {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-accent hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}