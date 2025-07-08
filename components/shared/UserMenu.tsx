// FINAL, CORRECTED - File: components/shared/UserMenu.tsx
'use client'; 

import { createClient } from '@/lib/supabase';
// useRouter is no longer needed for the logout action
// import { useRouter } from 'next/navigation';

export default function UserMenu({ userFirstName }: { userFirstName: string | null }) {
  // const router = useRouter(); // No longer needed
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    
    // This is a more forceful and reliable way to handle logout.
    // It triggers a full page reload to the login page, which ensures
    // all cached user data is cleared and the middleware runs correctly.
    window.location.href = '/login';
  };

  return (
    <div className="flex items-center gap-4">
      {/* Display a welcome message on larger screens */}
      <span className="hidden sm:inline text-sm text-text-color-subtle">
        Welcome, {userFirstName || 'User'}!
      </span>
      
      {/* The Logout Button */}
      <button 
        onClick={handleSignOut}
        className="font-semibold text-sm bg-warm-gray text-pure-white py-2 px-3 rounded-md hover:bg-red-500 transition-colors duration-fast"
      >
        Log Out
      </button>
    </div>
  );
}