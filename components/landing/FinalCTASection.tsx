// File: components/landing/FinalCTASection.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section id="final-cta" className="py-20 sm:py-28 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold font-display text-gray-900"
        >
          Ready to See Your Space Like Never Before?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Your dream interior is just a photo away. Upload your space, define your vision, and let our AI handle the rest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10"
        >
          <Link
            href="/generate"
            className="group inline-flex items-center justify-center gap-x-2 bg-black text-white font-semibold py-4 px-10 rounded-full text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Generate My Space Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}