// FINAL, LUXURY LOGIN PAGE - app/(auth)/login/LoginPageClient.tsx
'use client';


import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import { PasswordInput } from '@/components/forms/PasswordInput';

export default function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const successMessage = searchParams.get('message');
    if (successMessage) {
      setMessage(successMessage);
    }
  }, [searchParams]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/generate');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column: The Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link href="/" className="inline-block">
                <h1 className="text-4xl font-bold font-display text-primary">Decorythm</h1>
            </Link>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-600">
              Sign in to continue your design journey.
            </p>
          </div>

          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
              <span className="font-medium">Success!</span> {message}
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Error:</span> {error}
            </motion.div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-style" // Use your global input style
                placeholder="Email address"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label htmlFor="password"  className="sr-only">Password</label>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-style"
                placeholder="Password"
              />
            </motion.div>

            <div className="text-sm text-right">
              <Link href="/forgot-password" className="font-medium text-accent hover:underline">
                Forgot your password?
              </Link>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <button
                type="submit"
                disabled={isLoading}
                className="group button-primary w-full flex justify-center items-center gap-2"
              >
                <LogIn className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </motion.div>
          </form>
          
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-accent hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column: The Visual */}
      <div className="hidden lg:block relative">
        <Image
          src="/images/login-visual.jpg" // A beautiful, high-quality image
          alt="Abstract interior design visual"
          layout="fill"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-10 left-10 text-white"
        >
            <p className="text-3xl font-display italic">"The essence of interior design</p>
            <p className="text-3xl font-display italic">will always be about people and</p>
            <p className="text-3xl font-display italic">how they live."</p>
            <p className="mt-2 text-lg font-semibold">- Albert Hadley</p>
        </motion.div>
      </div>
    </div>
  );
}