// FINAL & CORRECT - components/shared/Navbar.tsx
'use client'; // This component now uses client-side logic for the menu

import Link from 'next/link';
import type { User } from '@supabase/supabase-js'; // Import the User type
import UserMenu from './UserMenu';

// The Navbar now accepts the 'user' object as a prop
interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  // The first name can be derived from the user object's metadata
  const firstName = user?.user_metadata?.first_name || user?.email;

  return (
    <header className="bg-primary text-light-text-on-dark shadow-elevated sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold text-accent hover:text-pure-white transition-colors duration-fast">
          Decorythm
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            // It passes the first name down to the UserMenu
            <UserMenu userFirstName={firstName} />
          ) : (
            // The logged-out view remains the same
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