// File: components/landing/HowItWorksSection.tsx
'use client';

import { motion } from 'framer-motion';
import { UploadCloud, PenTool, BrainCircuit, Download } from 'lucide-react';

const steps = [
    { icon: UploadCloud, title: "1. Upload Your Space", description: "Start with a photo of any room from any angle.", delay: 0.1 },
    { icon: PenTool, title: "2. Define Your Vision", description: "Select your desired style, materials, and mood.", delay: 0.3 },
    { icon: BrainCircuit, title: "3. Witness the Magic", description: "Our AI generates a bespoke, high-quality design.", delay: 0.5 },
    { icon: Download, title: "4. Save & Share", description: "Download your new space or generate variations.", delay: 0.7 }
];

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-24 sm:py-32 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900">From Photo to Reality</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Our process is designed to be as intuitive as your own creativity.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {steps.map((step) => (
                        <motion.div 
                            key={step.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: step.delay }}
                            className="text-center"
                        >
                            <div className="flex items-center justify-center h-16 w-16 bg-gray-100 rounded-2xl mx-auto mb-6">
                                <step.icon className="w-8 h-8 text-gray-700" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                            <p className="mt-2 text-gray-500">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}