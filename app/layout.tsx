// FINAL & CORRECT - app/layout.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar"; // Your Navbar component

// Font setup (your code is correct)
const inter = Inter({ subsets: ["latin"], display: 'swap', variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], display: 'swap', variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Decorythm - AI Interior Design",
  description: "Transform your space with the power of AI.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // --- THIS IS THE FIX ---
  // We perform the server-side data fetching here, in a Server Component where it's allowed.
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  // --- END OF FIX ---

  return (
    <html lang="en">
      {/* We pass the user object as a prop to the Navbar */}
      <body className={`${inter.variable} ${playfair.variable} font-body bg-soft-white text-text-color`}>
        <Navbar user={user} />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}