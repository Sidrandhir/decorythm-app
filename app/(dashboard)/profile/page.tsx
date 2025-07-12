// File: app/(dashboard)/profile/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const [profileRes, generationsRes] = await Promise.all([
    supabase.from('profiles').select('credits').eq('id', user.id).single(),
    supabase.from('generations').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  ]);
  
  const profile = profileRes.data;
  const allGenerations = generationsRes.data;

  // --- THIS IS THE FIX ---
  // We filter the generations to only include ones with a valid, proper URL.
  // This prevents the page from crashing if bad data exists in the database.
  const validGenerations = allGenerations?.filter(gen => 
    gen.output_image_url && gen.output_image_url.startsWith('https://')
  ) || [];
  // --- END OF FIX ---

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white p-6 rounded-lg shadow-md border mb-12">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-600"><strong>Member Since:</strong> {format(new Date(user.created_at), "MMMM d, yyyy")}</p>
            <div className="mt-4 bg-blue-100 text-blue-800 font-bold text-lg p-4 rounded-md text-center">
              Remaining Tokens: {profile?.credits ?? 0}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">My Generation History</h2>
          {/* We now map over the CLEANED data */}
          {validGenerations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {validGenerations.map((gen) => (
                <div key={gen.id} className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl">
                  {/* The <Image> component will now only ever receive valid URLs */}
                  <Image
                    src={gen.output_image_url!}
                    alt={gen.prompt || 'AI generated image'}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <p className="text-xs text-gray-500 truncate" title={gen.prompt!}>
                      {gen.prompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-lg border">
                <p className="text-gray-500">You haven't created any images yet.</p>
                <Link href="/generate" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800">
                    Create Your First Design
                </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}