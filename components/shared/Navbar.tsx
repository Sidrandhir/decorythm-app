// File: components/shared/Navbar.tsx
import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import UserMenu from './UserMenu';

export default async function Navbar() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { get: (name: string) => cookieStore.get(name)?.value },
    }
  );
  
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-display text-primary hover:text-accent transition-colors">
          Decorythm
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu userEmail={user.email} />
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-black">
                Log In
              </Link>
              <Link href="/signup" className="bg-black text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}