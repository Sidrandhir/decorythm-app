// File: components/forms/VisualSelector.tsx
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Option { value: string; label: string; imageUrl: string; }
interface VisualSelectorProps { options: Option[]; selectedValue: string; onSelect: (value: string) => void; title: string; }

export function VisualSelector({ options, selectedValue, onSelect, title }: VisualSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {options.map((option) => (
          <motion.div
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${selectedValue === option.value ? 'border-accent shadow-lg' : 'border-transparent hover:border-gray-300'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={option.imageUrl} alt={option.label} width={200} height={200} className="w-full h-24 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <p className="absolute bottom-2 left-3 text-white font-semibold text-sm">{option.label}</p>
            {selectedValue === option.value && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full border-2 border-white flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}