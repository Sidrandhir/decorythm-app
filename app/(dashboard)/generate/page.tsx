// FINAL, DEFINITIVE, & CORRECTED GENERATE PAGE - app/(dashboard)/generate/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Wand2, Star } from 'lucide-react';
import { ImageUploader } from '@/components/forms/ImageUploader'; // Correctly imported
import { GenerationResult } from '@/components/shared/GenerationResult';
import { VisualSelector } from '@/components/forms/VisualSelector';

// --- Data for our visual selectors ---
const styleOptions = [ { value: 'Modern', label: 'Modern', imageUrl: '/images/styles/modern.jpg' }, { value: 'Minimalist', label: 'Minimalist', imageUrl: '/images/styles/minimalist.jpg' }, { value: 'Industrial', label: 'Industrial', imageUrl: '/images/styles/industrial.jpg' }, { value: 'Bohemian', label: 'Bohemian', imageUrl: '/images/styles/bohemian.jpg' }, { value: 'Scandinavian', label: 'Scandinavian', imageUrl: '/images/styles/scandinavian.jpg' }, { value: 'Coastal', label: 'Coastal', imageUrl: '/images/styles/coastal.jpg' }];
const roomTypeOptions = [ { value: 'Living Room', label: 'Living Room', imageUrl: '/images/rooms/livingroom.jpg' }, { value: 'Bedroom', label: 'Bedroom', imageUrl: '/images/rooms/bedroom.jpg' }, { value: 'Kitchen', label: 'Kitchen', imageUrl: '/images/rooms/kitchen.jpg' }, { value: 'Bathroom', label: 'Bathroom', imageUrl: '/images/rooms/bathroom.jpg' }];
const furnitureOptions = [ { value: 'Sleek & Minimal', label: 'Sleek & Minimal', imageUrl: '/images/furniture/minimal.jpg' }, { value: 'Comfortable & Plush', label: 'Comfortable & Plush', imageUrl: '/images/furniture/plush.jpg' }, { value: 'Vintage & Eclectic', label: 'Vintage & Eclectic', imageUrl: '/images/furniture/vintage.jpg' }];
const lightingOptions = [ { value: 'Natural Daylight', label: 'Natural Daylight', imageUrl: '/images/lighting/daylight.jpg' }, { value: 'Moody & Dramatic', label: 'Moody & Dramatic', imageUrl: '/images/lighting/moody.jpg' }, { value: 'Bright & Airy', label: 'Bright & Airy', imageUrl: '/images/lighting/airy.jpg' }];

const CreativityCardSelector = ({ selected, onSelect }: { selected: string, onSelect: (value: string) => void }) => {
    const options = [ { value: 'subtle', icon: Star, title: 'Refined', description: 'Faithful to your layout, enhanced with luxury details.'}, { value: 'balanced', icon: Sparkles, title: 'Balanced', description: 'A harmonious blend of your space and our AI’s vision.'}, { value: 'creative', icon: Wand2, title: 'Imaginative', description: 'A bold, artistic reinterpretation of your room.'}];
    return ( <div> <h3 className="text-lg font-semibold text-gray-800 mb-4">Transformation Style</h3> <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{options.map(opt => (<div key={opt.value} onClick={() => onSelect(opt.value)} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selected === opt.value ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-gray-400'}`}><opt.icon className={`w-6 h-6 mb-2 ${selected === opt.value ? 'text-accent' : 'text-gray-500'}`} /><h4 className="font-semibold text-gray-900">{opt.title}</h4><p className="text-xs text-gray-500 mt-1">{opt.description}</p></div>))}</div></div>)
}

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [style, setStyle] = useState('Modern');
  const [roomType, setRoomType] = useState('Living Room');
  const [lighting, setLighting] = useState('Natural Daylight');
  const [materials, setMaterials] = useState('Wood & Natural Tones');
  const [furniture, setFurniture] = useState('Sleek & Minimal');
  const [creativityLevel, setCreativityLevel] = useState('balanced');
  const [userExpectations, setUserExpectations] = useState('');

  const handleImageSelected = (file: File | null, previewUrl: string | null) => {
    setSelectedFile(file);
    setOriginalImageUrl(previewUrl);
  };

  const handleSubmit = async () => {
    if (!selectedFile) { setError("Please upload an image to begin."); return; }
    setIsLoading(true);
    setError(null);
    setResultImageUrl(null);
    setGenerationId(null);
    try {
      const compressedFile = await imageCompression(selectedFile, { maxSizeMB: 1.5, maxWidthOrHeight: 1024 });
      const formData = new FormData();
      formData.append('image', compressedFile, compressedFile.name);
      formData.append('style', style);
      formData.append('roomType', roomType);
      formData.append('lighting', lighting);
      formData.append('materials', materials);
      formData.append('furniture', furniture);
      formData.append('creativityLevel', creativityLevel);
      formData.append('expectations', userExpectations);
      const response = await fetch('/api/generate', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok) {
        if (result.error?.includes('You have no credits left')) router.push('/pricing');
        else throw new Error(result.error || 'API error');
      } else {
        setResultImageUrl(result.outputUrl);
        setGenerationId(result.generationId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const formSteps = [
    <div key={1}><h2 className="text-2xl font-bold font-display text-primary mb-4">Step 1: Upload Your Canvas</h2><ImageUploader onImageSelected={handleImageSelected} /><button onClick={() => setStep(2)} disabled={!selectedFile} className="mt-6 w-full button-primary flex items-center justify-center gap-2">Next Step <ArrowRight size={16}/></button></div>,
    <div key={2}><h2 className="text-2xl font-bold font-display text-primary mb-4">Step 2: Define Your Aesthetic</h2><div className="space-y-6"><VisualSelector title="Room Type" options={roomTypeOptions} selectedValue={roomType} onSelect={setRoomType} /><VisualSelector title="Design Style" options={styleOptions} selectedValue={style} onSelect={setStyle} /><VisualSelector title="Furniture Style" options={furnitureOptions} selectedValue={furniture} onSelect={setFurniture} /></div><div className="flex gap-4 mt-6"><button type="button" onClick={() => setStep(1)} className="w-full button-secondary">Back</button><button type="button" onClick={() => setStep(3)} className="w-full button-primary">Next Step</button></div></div>,
    <div key={3}><h2 className="text-2xl font-bold font-display text-primary mb-4">Step 3: Refine Your Vision</h2><div className="space-y-6"><VisualSelector title="Lighting Style" options={lightingOptions} selectedValue={lighting} onSelect={setLighting} /><CreativityCardSelector selected={creativityLevel} onSelect={setCreativityLevel} /><div><label htmlFor="materials" className="block text-lg font-semibold text-gray-800 mb-2">Key Materials</label><input id="materials" name="materials" type="text" className="input-style w-full" placeholder="e.g., Wood & Natural Tones" value={materials} onChange={(e) => setMaterials(e.target.value)} /></div><div><label htmlFor="expectations" className="block text-lg font-semibold text-gray-800 mb-2">Your Expectations (Optional)</label><textarea id="expectations" name="expectations" rows={3} className="input-style w-full" placeholder="e.g., 'I want a cozy reading corner...'" value={userExpectations} onChange={(e) => setUserExpectations(e.target.value)} /></div></div><div className="flex gap-4 mt-6"><button type="button" onClick={() => setStep(2)} className="w-full button-secondary">Back</button><button type="button" onClick={handleSubmit} disabled={isLoading} className="w-full button-primary flex items-center justify-center gap-2"><Sparkles className="w-5 h-5" /> {isLoading ? 'Generating...' : 'Generate Masterpiece'}</button></div></div>
  ];

  return (
    <div className="container mx-auto p-4 sm:p-8 grid md:grid-cols-2 gap-8 items-start min-h-[calc(100vh-5rem)]">
      <div className="bg-white p-6 rounded-2xl shadow-lg border h-full"><form onSubmit={(e) => e.preventDefault()}><AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>{formSteps[step - 1]}</motion.div></AnimatePresence></form></div>
      <div className="bg-white p-6 rounded-2xl shadow-lg border min-h-[600px] sticky top-24"><GenerationResult originalImage={originalImageUrl} generatedImage={resultImageUrl} generationId={generationId} isLoading={isLoading} error={error}/></div>
    </div>
  );
}