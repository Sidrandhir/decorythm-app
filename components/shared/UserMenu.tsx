// File: components/shared/UserMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase'; // Use the simple client-side client
import { useRouter } from 'next/navigation';

// This interface defines the props the component expects
interface UserMenuProps {
  userFirstName: string | null;
}

export default function UserMenu({ userFirstName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // After signing out, push the user to the login page to refresh the state
    router.push('/login');
    router.refresh(); // Force a refresh to update server components
  };

  return (
    <div className="relative">
      {/* The button that shows the user's name */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm sm:text-base font-semibold hover:text-accent transition-colors duration-fast"
      >
        <span>Welcome, {userFirstName || 'User'}</span>
        {/* Simple chevron icon */}
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-188' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
          <Link href="/generate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Generate
          </Link>
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Profile & History
          </Link>
          <div className="border-t my-1"></div> {/* Separator */}
          <button
            onClick={handleLogout}
            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}