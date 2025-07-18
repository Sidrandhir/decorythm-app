// FINAL & CORRECT - app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer"; // Import the Footer

// This must be a Server Component to fetch data, so no 'use client' here.

const inter = Inter({ subsets: ["latin"], display: 'swap', variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], display: 'swap', variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Decorythm - AI Interior Design",
  description: "Transform your space with the power of AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-body bg-soft-white text-text-color`}>
        <Navbar />
        {/* The main content now has no special padding */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}