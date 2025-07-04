// FINAL, SYNTAX-CORRECTED - File: app/(dashboard)/generate/page.tsx
'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { ImageUploader } from '@/components/forms/ImageUploader';
import { StyleSelector } from '@/components/forms/StyleSelector';
import { GenerationResult } from '@/components/shared/GenerationResult';

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  
  const fileRef = useRef<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultBlobUrlRef = useRef<string | null>(null);

  const handleImageSelected = (file: File | null, previewUrl: string | null) => {
    if (resultBlobUrlRef.current) URL.revokeObjectURL(resultBlobUrlRef.current);
    fileRef.current = file;
    setOriginalImageUrl(previewUrl);
    setResultImageUrl(null);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fileRef.current) {
      setError("Please select an image first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    if (resultBlobUrlRef.current) URL.revokeObjectURL(resultBlobUrlRef.current);

    try {
      console.log(`Original image size: ${(fileRef.current.size / 1024 / 1024).toFixed(2)} MB`);
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(fileRef.current, options);
      console.log(`Compressed image size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
      
      const formData = new FormData();
      formData.append('image', compressedFile, compressedFile.name);
      formData.append('style', (formRef.current?.elements.namedItem('style') as HTMLSelectElement).value);
      formData.append('roomType', (formRef.current?.elements.namedItem('roomType') as HTMLSelectElement).value);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageBlob = await response.blob();
        const localUrl = URL.createObjectURL(imageBlob);
        resultBlobUrlRef.current = localUrl;
        setResultImageUrl(localUrl);
      } else {
        const errorResult = await response.json();
        throw new Error(errorResult.error || `API Error: ${response.statusText}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }; // <--- THE MISSING SEMICOLON WAS HERE. IT IS NOW FIXED.

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">Create Your New Space</h1>
        <p className="text-gray-600 mb-8 text-center">Upload an image and choose a style to begin.</p>
        
        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-6 p-6 border rounded-lg bg-pure-white shadow-sm">
            <ImageUploader onImageSelected={handleImageSelected} />
            <StyleSelector />
            <button 
              type="submit"
              disabled={isLoading || !originalImageUrl}
              className="w-full bg-primary text-pure-white py-3 rounded-md font-semibold hover:bg-warm-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Generating..." : 'Transform My Room'}
            </button>
          </div>
          <div className="p-6 border rounded-lg bg-pure-white shadow-sm min-h-[400px]">
            <GenerationResult 
              originalImage={originalImageUrl}
              generatedImage={resultImageUrl} 
              isLoading={isLoading} 
              error={error}
            />
          </div>
        </form>
      </div>
    </div>
  );
}