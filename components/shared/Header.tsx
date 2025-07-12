// File: components/shared/Header.tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getActiveUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    getActiveUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (isLoading) {
    // Render a simple placeholder while loading user state to prevent flicker
    return <header className="bg-white border-b h-16"></header>;
  }

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
          Decorythm
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/generate" className="text-gray-600 hover:text-gray-900">
                Generate
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  // The onAuthStateChange will handle the UI update
                }}
                className="py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Log In
              </Link>
              <Link href="/signup" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}