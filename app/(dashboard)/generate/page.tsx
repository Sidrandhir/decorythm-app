'use client';
import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { createClient } from '@/lib/supabase'; // Import the client
import { ImageUploader } from '@/components/forms/ImageUploader';
import { StyleSelector } from '@/components/forms/StyleSelector';
import { GenerationResult } from '@/components/shared/GenerationResult';

const FormTextarea = ({ label, name, placeholder, isOptional = false }: { label: string, name: string, placeholder: string, isOptional?: boolean }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-color-light">{label} {isOptional && <span className="text-text-color-subtle">(Optional)</span>}</label>
        <textarea id={name} name={name} rows={2} className="input-style w-full" placeholder={placeholder} />
    </div>
);

export default function GeneratePage() {
    const supabase = createClient(); // Create the supabase client instance
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
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
        if (!fileRef.current) { setError("Please select an image first."); return; }
        setIsLoading(true);
        setError(null);
        if (resultBlobUrlRef.current) URL.revokeObjectURL(resultBlobUrlRef.current);

        try {
            setLoadingMessage('Optimizing your image...');
            const compressedFile = await imageCompression(fileRef.current, { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true });
            
            const formData = new FormData(formRef.current!);
            formData.set('image', compressedFile, compressedFile.name);

            setLoadingMessage('Sending to the design studio...');
            const response = await fetch('/api/generate', { method: 'POST', body: formData });
            
            setLoadingMessage('The AI is working its magic...');
            if (response.ok) {
                const imageBlob = await response.blob();
                if (imageBlob.size === 0) throw new Error("API returned an empty image.");
                const localUrl = URL.createObjectURL(imageBlob);
                resultBlobUrlRef.current = localUrl;
                setResultImageUrl(localUrl);
            } else {
                const errorResult = await response.json().catch(() => ({ error: `Server error: ${response.statusText}` }));
                throw new Error(errorResult.error);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    return (
        <div className="container mx-auto px-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-heading">The Design Studio</h1>
                    <p className="mt-2 text-lg text-text-color-light">Provide the details of your vision.</p>
                </div>
                <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-6 p-6 border rounded-lg bg-pure-white shadow-soft">
                        <h2 className="text-xl font-bold font-heading border-b pb-2">1. Your Space</h2>
                        <ImageUploader onImageSelected={handleImageSelected} />
                        <h2 className="text-xl font-bold font-heading border-b pb-2 mt-4">2. Your Vision</h2>
                        <StyleSelector />
                        <FormTextarea label="Other Requirements (Optional)" name="other" placeholder="e.g., add a large ficus plant..." isOptional={true} />
                        <button type="submit" disabled={isLoading || !originalImageUrl} className="button-primary py-3 text-base">
                            {isLoading ? loadingMessage || "Designing..." : 'Generate My Redesign'}
                        </button>
                    </div>
                    <div className="p-6 border rounded-lg bg-pure-white shadow-soft sticky top-28 min-h-[400px]">
                        <GenerationResult originalImage={originalImageUrl} generatedImage={resultImageUrl} isLoading={isLoading} error={error} />
                    </div>
                </form>
            </div>
        </div>
    );
}
