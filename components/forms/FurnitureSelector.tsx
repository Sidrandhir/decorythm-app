// File: components/forms/FurnitureSelector.tsx
'use client';

interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function FurnitureSelector({ value, onChange }: SelectorProps) {
  const options = ["Sleek & Minimal", "Comfortable & Plush", "Vintage & Eclectic", "Ornate & Traditional"];
  return (
    <div>
      <label htmlFor="furniture" className="block text-sm font-medium text-gray-700">Furniture Style</label>
      <select
        id="furniture"
        name="furniture" // The 'name' attribute is crucial
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}