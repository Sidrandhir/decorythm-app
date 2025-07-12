// File: components/forms/CreativitySelector.tsx
'use client';

interface CreativitySelectorProps {
    creativityLevel: string;
    onCreativityChange: (value: string) => void;
}

export function CreativitySelector({ creativityLevel, onCreativityChange }: CreativitySelectorProps) {
  return (
    <div>
      <label htmlFor="creativityLevel" className="block text-sm font-medium text-gray-700">
        Creativity Level
      </label>
      <select
        id="creativityLevel"
        name="creativityLevel"
        className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md"
        value={creativityLevel} // Controlled by parent state
        onChange={(e) => onCreativityChange(e.target.value)} // Reports changes to parent
      >
        <option value="subtle">Subtle Touch (More Faithful)</option>
        <option value="balanced">Balanced Transformation</option>
        <option value="creative">Imaginative Flair (More Creative)</option>
      </select>
      <p className="mt-2 text-xs text-gray-500">
        Choose how much the AI should transform your original image's layout and style.
      </p>
    </div>
  );
}