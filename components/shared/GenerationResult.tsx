// File: components/shared/GenerationResult.tsx
'use client';
import Link from 'next/link'; // Import the Link component

// --- This is YOUR working code. It is correct. ---
interface GenerationResultProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  // We add the generationId here.
  generationId?: number | null; 
}

const ImageBox = ({ title, imageUrl }: { title: string; imageUrl: string }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  </div>
);

export function GenerationResult({ originalImage, generatedImage, isLoading, error, generationId }: GenerationResultProps) {
  
  // This is the direct download function. It is correct.
  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `decorythm_design_${generationId || 'download'}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(generatedImage, '_blank');
    }
  };

  // Case 1: Loading
  if (isLoading) {
    return (
      <div className="w-full aspect-square border-2 border-dashed rounded-md flex flex-col justify-center items-center bg-gray-50 text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        <p className="mt-4 font-semibold">Generating your new space...</p>
        <p className="text-sm text-gray-400">(This can take up to a minute)</p>
      </div>
    );
  }

  // Case 2: Error
  if (error) {
    return (
      <div className="w-full aspect-square border-2 border-dashed rounded-md flex flex-col justify-center items-center bg-red-50 text-red-700 p-4">
        <p className="font-bold">An Error Occurred</p>
        <p className="text-center mt-2">{error}</p>
      </div>
    );
  }

  // Case 3: Success - Both images are available
  if (originalImage && generatedImage) {
    return (
      <div className="space-y-4">
        {/* We can show both images or just the final one */}
        {/* <ImageBox title="Original" imageUrl={originalImage} /> */}
        <ImageBox title="Transformed" imageUrl={generatedImage} />
        
        {/* --- THIS IS THE ONLY CHANGE: THE NEW BUTTON LAYOUT --- */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Link
            href={`/checkout?generationId=${generationId}`}
            className="w-full text-center bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Confirm & Purchase
          </Link>
          <button
            type="button"
            onClick={handleDownload}
            className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Download
          </button>
        </div>
        {/* --- END OF CHANGE --- */}
      </div>
    );
  }
  
  // Case 4: Initial State - Only original is visible
  if (originalImage) {
    return <ImageBox title="Original Preview" imageUrl={originalImage} />;
  }

  // Case 5: Default placeholder
  return (
    <div className="w-full aspect-square border-2 border-dashed rounded-md flex justify-center items-center bg-gray-50">
      <p className="text-gray-500">Your transformation will appear here</p>
    </div>
  );
}