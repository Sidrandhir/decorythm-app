// FINAL - File: app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase'; // Correct named import

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient(); // Correct usage
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/generate');
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-pure-white rounded-lg shadow-elevated">
        <h1 className="text-2xl font-bold text-center font-heading text-primary">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-color-light">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-border-soft rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"/>
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-text-color-light">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-border-soft rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"/>
          </div>
          <div className="text-sm text-center">
            <a href="/forgot-password" className="font-medium text-accent hover:underline">Forgot your password?</a>
          </div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-primary bg-accent hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-gray-400">
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        {error && <p className="text-center text-red-600">{error}</p>}
        <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-accent hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}