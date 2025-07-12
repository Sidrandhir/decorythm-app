// File: app/(dashboard)/generate/page.tsx
'use client';

import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { ImageUploader } from '@/components/forms/ImageUploader';
import { StyleSelector } from '@/components/forms/StyleSelector';
import { CreativitySelector } from '@/components/forms/CreativitySelector';
import { GenerationResult } from '@/components/shared/GenerationResult';

export default function GeneratePage() {
  // --- STATE IS THE SINGLE SOURCE OF TRUTH ---
  const [generationId, setGenerationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);

  // State for all form inputs
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [style, setStyle] = useState('Modern');
  const [roomType, setRoomType] = useState('Living Room');
  const [creativityLevel, setCreativityLevel] = useState('balanced');
  // --- END OF STATE ---

  const handleImageSelected = (file: File | null, previewUrl: string | null) => {
    setSelectedFile(file);
    setOriginalImageUrl(previewUrl);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!selectedFile) {
      setError("Please select an image to transform.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      setLoadingMessage("Preparing your image...");
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(selectedFile, options);
      
      // --- BULLETPROOF FORM DATA CONSTRUCTION ---
      // We build the FormData object manually from our state variables.
      // This is guaranteed to be correct.
      const formData = new FormData();
      formData.append('image', compressedFile, compressedFile.name);
      formData.append('style', style);
      formData.append('roomType', roomType);
      formData.append('creativityLevel', creativityLevel);
      // --- END OF FIX ---
      
      setLoadingMessage("Generating your new space...");
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'An unknown API error occurred.');
      }
      
      setResultImageUrl(result.outputUrl);
      setGenerationId(result.generationId);

    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred.");
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold">Create Your New Space</h1>
        <p className="text-lg text-gray-600 mt-2">Upload an image, define your style, and choose your level of creativity.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-6">
          <ImageUploader onImageSelected={handleImageSelected} />
          {/* We now pass state and handlers down to the controlled components */}
          <StyleSelector 
            style={style} onStyleChange={setStyle}
            roomType={roomType} onRoomTypeChange={setRoomType}
          />
          <CreativitySelector 
            creativityLevel={creativityLevel} onCreativityChange={setCreativityLevel}
          />
          <button 
            type="submit"
            disabled={isLoading || !originalImageUrl}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? loadingMessage || 'Generating...' : 'Transform My Room'}
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 min-h-[400px]">
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