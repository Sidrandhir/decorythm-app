// Corrected File: components/landing/AiEdgeSection.tsx
'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Palette, Gem, Crown } from 'lucide-react';
import Image from 'next/image';

const features = [
    {
        icon: BrainCircuit,
        title: "Taste, Not Just Tech",
        description: "Our AI is trained on principles of luxury design, not just millions of random images."
    },
    {
        icon: Palette,
        title: "Understands Harmony",
        description: "It knows the difference between elegant minimalism and cold emptiness."
    },
    {
        icon: Gem,
        title: "Ultra-Realistic Detail",
        description: "From the texture of velvet to the glint of metal, every render feels real."
    },
    {
        icon: Crown,
        title: "Bespoke for You",
        description: "Every design is unique, reflecting your personal style and the soul of your space."
    }
];

export function AiEdgeSection() {
    return (
        <section id="ai-edge" className="py-20 sm:py-28 bg-gray-900 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-display">
                            More Than Smart — It’s Tasteful.
                        </h2>
                        <p className="mt-4 text-lg text-gray-300">
                            Generic AI gives you generic results. Decorythm's design engine is built on a foundation of luxury aesthetics to provide you with truly aspirational interiors.
                        </p>
                        <div className="mt-8 space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                                        <feature.icon className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                                        <p className="text-gray-400 mt-1">{feature.description}</p>
                                    </div>
                                </div> // <-- THIS IS THE CORRECTED CLOSING TAG
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full min-h-[400px] w-full"
                    >
                        <Image
                            src="/images/ai-edge.jpg" // From /public/images
                            alt="Abstract visualization of AI creativity"
                            width={800}
                            height={1000}
                            className="w-full h-full object-cover rounded-2xl shadow-2xl"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}