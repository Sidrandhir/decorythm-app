// FINAL & CORRECT - components/shared/Navbar.tsx
import Link from 'next/link';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import UserMenu from './UserMenu';

export default async function Navbar() {
  const cookieStore = await cookies();

  // --- THIS IS THE CORRECT, FULL CONFIGURATION ---
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // The server-side client needs a way to set cookies
          // but we will not be setting cookies in this read-only component.
          // We can leave this empty for now.
        },
        remove(name: string, options: CookieOptions) {
          // Same as above, not needed for this component.
        },
      },
    }
  );
  // --- END OF FIX ---
  
  const { data: { user } } = await supabase.auth.getUser();

  let firstName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', user.id)
      .single();
    // Use the first name if it exists, otherwise fallback to the user's email
    firstName = profile?.first_name || user.email;
  }

  return (
    <header className="bg-primary text-light-text-on-dark shadow-elevated sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold text-accent hover:text-pure-white transition-colors duration-fast">
          Decorythm
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu userFirstName={firstName} />
          ) : (
            <>
              <Link href="/login" className="text-sm sm:text-base font-semibold hover:text-accent transition-colors duration-fast">
                Log In
              </Link>
              <Link href="/signup" className="bg-accent text-primary text-sm sm:text-base font-bold py-2 px-4 rounded-md hover:shadow-gold-glow transition-all duration-fast">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}