// File: components/shared/UserMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User, ChevronsUpDown } from 'lucide-react';

interface UserMenuProps {
  userEmail: string | undefined;
}

export default function UserMenu({ userEmail }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // Redirect to login after logout
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors duration-fast"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
        </div>
        <ChevronsUpDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border origin-top-right">
          <div className="px-4 py-3 border-b">
            <p className="text-sm text-gray-800">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
          </div>
          <div className="py-1">
            <Link href="/generate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Generate New Design
            </Link>
            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile & History
            </Link>
            <Link href="/pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Upgrade Plan
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