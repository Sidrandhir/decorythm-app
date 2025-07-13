// File: components/landing/TestimonialsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

// We define our testimonial data here. This makes it easy to update later.
const testimonials = [
  {
    quote: "I was absolutely stunned. I uploaded a picture of my drab living room, and Decorythm presented a vision that felt both aspirational and completely 'me'. The ease was incredible!",
    name: "Santosh Patil",
    title: "Home Renovator, Pune",
    image: "/images/client-1.webp", // From /public/images
    delay: 0.1
  },
  {
    quote: "I didn't expect this level of taste from AI. It wasn't just about placing furniture; it was about creating a mood. My bedroom is now a sanctuary, thanks to Decorythm.",
    name: "Ken Joseph",
    title: "IT Professional, Pune",
    image: "/images/client-2.webp", // From /public/images
    delay: 0.3
  },
  {
    quote: "The transformation was instant and the result was pure luxury. Seeing my kitchen reimagined gave me the confidence to finally start the remodel.",
    name: "Priya Khandelkar",
    title: "Design Enthusiast, Pune",
    image: "/images/client-3.webp", // From /public/images
    delay: 0.5
  }
];

// A small component for the star ratings
const StarRating = () => (
    <div className="flex gap-0.5 text-yellow-500">
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
    </div>
);

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900">
            Don’t Just Decorate — Transform
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See what happens when technology meets taste, from users just like you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: testimonial.delay }}
              className="bg-gray-50/80 p-8 rounded-2xl border border-gray-200 flex flex-col"
            >
              <div className="flex-grow">
                <StarRating />
                <p className="mt-4 text-gray-800 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center mt-6 pt-6 border-t border-gray-200">
                <Image 
                  src={testimonial.image}
                  alt={`Photo of ${testimonial.name}`}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}