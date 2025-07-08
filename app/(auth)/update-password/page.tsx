// FINAL - File: app/(auth)/update-password/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { PasswordStrengthMeter } from '@/components/forms/PasswordStrengthMeter';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    // This Supabase function uses the secure token from the URL 
    // to update the user's password.
    const { error } = await supabase.auth.updateUser({ password });

    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // Use the same robust redirect pattern
      const successMessage = "Your password has been updated successfully! Please log in with your new password.";
      router.push(`/login?message=${encodeURIComponent(successMessage)}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-pure-white rounded-lg shadow-elevated">
        <div className="text-center">
            <h1 className="text-2xl font-bold font-heading text-primary">Choose a New Password</h1>
        </div>
        
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div>
            <label htmlFor="password">New Password</label>
            <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            <PasswordStrengthMeter password={password} />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <PasswordInput id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={isLoading} className="button-primary">
            {isLoading ? 'Updating...' : 'Update Password and Log In'}
          </button>
        </form>

        {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        {message && <p className="text-center text-green-600 bg-green-50 p-3 rounded-md">{message}</p>}
      </div>
    </div>
  );
}