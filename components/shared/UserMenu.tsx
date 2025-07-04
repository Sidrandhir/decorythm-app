// FINAL - components/shared/UserMenu.tsx
'use client'; 
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function UserMenu({ userFirstName }: { userFirstName: string | null }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh(); 
  };

  return (
    <div className="flex items-center gap-4">
      <span className="hidden sm:inline text-sm text-text-color-subtle">
        Welcome, {userFirstName}!
      </span>
      <button 
        onClick={handleSignOut}
        className="font-semibold text-sm bg-warm-gray text-pure-white py-2 px-3 rounded-md hover:bg-red-500 transition-colors duration-fast"
      >
        Log Out
      </button>
    </div>
  );
}