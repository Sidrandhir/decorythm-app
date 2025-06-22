'use client'; // This component needs to be interactive

import { useState } from 'react';
import { ImageUploader } from '@/components/forms/ImageUploader';
import { StyleSelector } from '@/components/forms/StyleSelector';
import { GenerationResult } from '@/components/shared/GenerationResult';

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResultImageUrl(null);

    const formData = new FormData(event.currentTarget);
    // We'll add the API call logic here in the next step

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Generation failed. Please try again.');
      }

      const result = await response.json();
      setResultImageUrl(result.outputUrl);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Create Your New Space</h1>
      <p className="text-gray-600 mb-8">Upload an image and choose your style to begin.</p>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageUploader onImageUpload={setOriginalImageUrl} />
          <StyleSelector />
          <button 
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? 'Generating...' : 'Transform My Room'}
          </button>
        </div>
        <div>
          <GenerationResult 
            originalImage={originalImageUrl}
            generatedImage={resultImageUrl} 
            isLoading={isLoading} 
            error={error}
          />
        </div>
      </form>
    </div>
  );
}