// FINAL CORRECTED - File: components/forms/ImageUploader.tsx
'use client';
import { useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (file: File | null, previewUrl: string | null) => void;
}

export function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelected(file, result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onImageSelected(null, null);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">Upload Your Room Image</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {preview ? (
            <img src={preview} alt="Image preview" className="mx-auto h-48 w-auto rounded-md" />
          ) : (
            // --- THIS SVG ICON WAS MISSING - IT IS NOW FIXED ---
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <div className="flex text-sm text-gray-600 justify-center">
            <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
              <span>Upload a file</span>
              <input id="image-upload" name="image" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
        </div>
      </div>
    </div>
  );
}