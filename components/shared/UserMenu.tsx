// File: components/shared/UserMenu.tsx
'use client'; // This component needs interactivity, so it's a client component.

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Define the props it will receive from the Navbar
interface UserMenuProps {
  userFirstName: string | null;
}

export default function UserMenu({ userFirstName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // After signing out, force a redirect and refresh to update the entire app state
    router.push('/login');
    router.refresh(); 
  };

  return (
    <div className="relative">
      {/* The button that the user clicks to open the menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm sm:text-base font-semibold hover:text-accent transition-colors duration-fast"
      >
        <span>Welcome, {userFirstName || 'User'}</span>
        {/* A simple chevron icon that rotates when open */}
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {/* The Dropdown Menu - only shown if 'isOpen' is true */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border"
          onMouseLeave={() => setIsOpen(false)} // Close menu when mouse leaves
        >
          <div className="px-4 py-2 border-b">
            <p className="text-sm text-gray-900">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">{userFirstName}</p>
          </div>
          <div className="py-1">
            <Link href="/generate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Generate Design
            </Link>
            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile & History
            </Link>
          </div>
          <div className="border-t py-1">
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}