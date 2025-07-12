// File: components/forms/MaterialSelector.tsx
'use client';

interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MaterialSelector({ value, onChange }: SelectorProps) {
  const options = ["Wood & Natural Tones", "Metal & Glass", "Rich Fabrics & Textures", "Marble & Stone"];
  return (
    <div>
      <label htmlFor="materials" className="block text-sm font-medium text-gray-700">Key Materials</label>
      <select
        id="materials"
        name="materials" // The 'name' attribute is crucial
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}