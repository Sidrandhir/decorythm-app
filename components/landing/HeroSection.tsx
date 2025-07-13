// FINAL, PROFESSIONAL - components/landing/HeroSection.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    // The section itself is set to the full height of the screen (h-screen)
    <section className="relative h-screen w-full flex items-center justify-center text-center text-white">
      {/* Video Background Container - This is the key to the fix */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          playsInline
          autoPlay
          muted
          loop
          // These classes ensure the video covers the entire area without being stretched
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/videos/herosection.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Darkening Overlay for text contrast */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight"
        >
          Your Space.
          <br />
          <span className="bg-gradient-to-r from-gray-200 to-white text-transparent bg-clip-text">
            Reimagined Instantly.
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200"
        >
          Upload a photo of any room and let our AI generate breathtaking new designs in seconds. Your vision is one click away.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex items-center justify-center"
        >
          <Link
            href="/generate"
            className="group inline-flex items-center justify-center gap-x-2 bg-white text-black font-semibold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Start Your Free Design
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}