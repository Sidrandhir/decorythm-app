// File: components/forms/CreativitySelector.tsx
'use client';

interface CreativitySelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function CreativitySelector({ value, onChange }: CreativitySelectorProps) {
  return (
    <div>
      <label htmlFor="creativityLevel" className="block text-sm font-medium text-gray-700">
        Creativity Level
      </label>
      <select
        id="creativityLevel"
        name="creativityLevel"
        className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="balanced">Balanced Transformation</option>
        <option value="subtle">Subtle Touch (More Faithful)</option>
        <option value="creative">Imaginative Flair (More Creative)</option>
      </select>
      <p className="mt-2 text-xs text-gray-500">
        "Faithful" respects the original layout. "Creative" takes more artistic liberty.
      </p>
    </div>
  );
}