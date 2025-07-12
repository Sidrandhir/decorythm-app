// File: app/(dashboard)/generate/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';

import { ImageUploader } from '@/components/forms/ImageUploader';
import { StyleSelector } from '@/components/forms/StyleSelector';
import { LightingSelector } from '@/components/forms/LightingSelector';
import { MaterialSelector } from '@/components/forms/MaterialSelector';
import { FurnitureSelector } from '@/components/forms/FurnitureSelector';
import { CreativitySelector } from '@/components/forms/CreativitySelector';
import { GenerationResult } from '@/components/shared/GenerationResult';

export default function GeneratePage() {
  const router = useRouter();

  // --- STATE IS THE SINGLE SOURCE OF TRUTH ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<number | null>(null);

  // State for all our form inputs
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [style, setStyle] = useState('Modern');
  const [roomType, setRoomType] = useState('Living Room');
  const [lighting, setLighting] = useState('Natural Daylight');
  const [materials, setMaterials] = useState('Wood & Natural Tones');
  const [furniture, setFurniture] = useState('Sleek & Minimal');
  const [creativityLevel, setCreativityLevel] = useState('balanced');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }
    
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
      
      const response = await fetch('/api/generate', { method: 'POST', body: formData });
      const result = await response.json();

      if (!response.ok) {
        if (result.error?.includes('You have no credits left')) {
            router.push('/pricing');
        } else {
            throw new Error(result.error || 'An API error occurred.');
        }
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

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold">Craft Your Vision</h1>
        <p className="text-lg text-gray-600 mt-2">Combine elements to create the perfect interior design.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-lg shadow-md border space-y-6">
          <ImageUploader onImageSelected={(file, url) => { setSelectedFile(file); setOriginalImageUrl(url); }} />
          <StyleSelector style={style} onStyleChange={setStyle} roomType={roomType} onRoomTypeChange={setRoomType} />
          <LightingSelector value={lighting} onChange={setLighting} />
          <MaterialSelector value={materials} onChange={setMaterials} />
          <FurnitureSelector value={furniture} onChange={setFurniture} />
          <CreativitySelector value={creativityLevel} onChange={setCreativityLevel} />
          <button 
            type="submit"
            disabled={isLoading || !originalImageUrl}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? "Generating..." : 'Transform My Room'}
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border min-h-[400px]">
          <GenerationResult 
            originalImage={originalImageUrl}
            generatedImage={resultImageUrl}
            generationId={generationId} 
            isLoading={isLoading} 
            error={error}
          />
        </div>
      </form>
    </div>
  );
}