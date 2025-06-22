// File: components/shared/GenerationResult.tsx
'use client';

interface GenerationResultProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

export function GenerationResult({ originalImage, generatedImage, isLoading, error }: GenerationResultProps) {
  if (isLoading) {
    return (
      <div className="w-full aspect-square border-2 border-dashed rounded-md flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Generating your new space...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full aspect-square border-2 border-dashed rounded-md flex flex-col justify-center items-center bg-red-50 text-red-700">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!originalImage) {
     return (
      <div className="w-full aspect-square border-2 border-dashed rounded-md flex justify-center items-center bg-gray-50">
        <p className="text-gray-500">Your transformation will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Result</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Original</p>
          <img src={originalImage} alt="Original room" className="rounded-lg object-cover w-full" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Transformed</p>
          <img src={generatedImage || originalImage} alt="Generated room" className={`rounded-lg object-cover w-full ${!generatedImage ? 'opacity-50' : ''}`} />
        </div>
      </div>
      {generatedImage && (
         <a 
            href={generatedImage} 
            download="transformed-room.png"
            className="inline-block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700"
          >
            Download Transformation
          </a>
      )}
    </div>
  );
}