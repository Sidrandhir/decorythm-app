// File: components/forms/LightingSelector.tsx
'use client';

interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LightingSelector({ value, onChange }: SelectorProps) {
  const options = ["Natural Daylight", "Cinematic Lighting", "Bright & Airy", "Moody & Dramatic"];
  return (
    <div>
      <label htmlFor="lighting" className="block text-sm font-medium text-gray-700">Lighting Style</label>
      <select
        id="lighting"
        name="lighting" // The 'name' attribute is crucial for FormData
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}