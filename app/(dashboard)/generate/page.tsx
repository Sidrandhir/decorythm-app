// File: app/(dashboard)/generate/page.tsx
'use client';

import { useState, useRef } from 'react';
import { ImageUploader } from '@/components/forms/ImageUploader';
import { StyleSelector } from '@/components/forms/StyleSelector';
import { GenerationResult } from '@/components/shared/GenerationResult';

const FormTextarea = ({ label, name, placeholder, isOptional = false }: { label: string, name: string, placeholder: string, isOptional?: boolean }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-text-color-light">{label} {isOptional && <span className="text-text-color-subtle">(Optional)</span>}</label>
        <textarea id={name} name={name} rows={2} className="input-style w-full" placeholder={placeholder} />
    </div>
);

// --- NEW COMPONENT: THE MODEL SWITCH ---
const ModelSelector = ({ selected, setSelected }: { selected: string, setSelected: (model: string) => void }) => (
    <div className="flex items-center justify-center p-1 bg-gray-200 rounded-lg">
        <button
            type="button"
            onClick={() => setSelected('creative')}
            className={`w-1/2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${selected === 'creative' ? 'bg-white shadow' : 'text-gray-600'}`}
        >
            Creative
        </button>
        <button
            type="button"
            onClick={() => setSelected('realistic')}
            className={`w-1/2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${selected === 'realistic' ? 'bg-white shadow' : 'text-gray-600'}`}
        >
            Realistic
        </button>
    </div>
);

export default function GeneratePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState('creative'); // <-- NEW STATE FOR THE MODEL
    const fileRef = useRef<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleImageSelected = (file: File | null, previewUrl: string | null) => {
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

        try {
            const formData = new FormData(formRef.current!);
            formData.set('image', fileRef.current);
            formData.append('selectedModel', selectedModel); // <-- SEND THE CHOSEN MODEL TO THE API

            const response = await fetch('/api/generate', { method: 'POST', body: formData });
            
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || `Server error: ${response.statusText}`);

            setResultImageUrl(result.outputUrl);

        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
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
                        <h2 className="text-xl font-bold font-heading border-b pb-2">1. Render Engine</h2>
                        {/* --- ADD THE MODEL SWITCH HERE --- */}
                        <ModelSelector selected={selectedModel} setSelected={setSelectedModel} />
                        <h2 className="text-xl font-bold font-heading border-b pb-2 mt-4">2. Your Space</h2>
                        <ImageUploader onImageSelected={handleImageSelected} />
                        <h2 className="text-xl font-bold font-heading border-b pb-2 mt-4">3. Your Vision</h2>
                        <StyleSelector />
                        <FormTextarea label="Other Details" name="other" placeholder="e.g., add a large ficus plant in the corner..." isOptional={true} />
                        <button type="submit" disabled={isLoading || !originalImageUrl} className="button-primary py-3 text-base">
                            {isLoading ? "Designing..." : `Generate (${selectedModel === 'creative' ? 'Creative' : 'Realistic'})`}
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