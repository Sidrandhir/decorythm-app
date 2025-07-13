// File: components/landing/BeforeAfterSlider.tsx
'use client';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { motion } from 'framer-motion';

export function BeforeAfterSlider() {
  return (
    <section id="showcase" className="py-20 sm:py-28 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900">
            See the Future of Your Home in Seconds.
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI doesn't just add furniture. It understands space, light, and harmony to create a truly elevated design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto" // Constrain the width for a better look
        >
          <div className="rounded-xl shadow-2xl overflow-hidden border-4 border-white">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage 
                  src="/images/before.jpg" // Your "before" image from the /public/images folder
                  alt="A user's room before AI design" 
                />
              }
              itemTwo={
                <ReactCompareSliderImage 
                  src="/images/after.png" // Your "after" image from the /public/images folder
                  alt="The same room transformed by Decorythm's AI" 
                />
              }
              style={{ height: '60vh', minHeight: '400px', maxHeight: '700px' }}
            />
          </div>
          <p className="text-center mt-4 text-gray-600">
            <span className="font-semibold">Drag the slider</span> to reveal the transformation.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}