// FINAL - File: components/forms/StyleSelector.tsx
'use client';

const FormSelect = ({ label, name, options }: { label: string; name: string; options: string[] }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-text-color-light">{label}</label>
    <select
      id={name}
      name={name}
      className="input-style w-full"
      defaultValue={options[0]}
    >
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

export function StyleSelector() {
  const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Dining Room", "Hallway"];
  const designStyles = ["Modern", "Minimalist", "Industrial", "Bohemian", "Scandinavian", "Coastal", "Art Deco"];
  const spaceTypes = ["Apartment", "Villa", "Studio", "Cafe", "Hotel Lobby", "Office Space"];
  const lightingEffects = ["Natural Daylight", "Warm & Cozy", "Bright & Airy", "Cinematic & Moody"];
  const furniturePreferences = ["Sleek & Minimal", "Comfortable & Plush", "Vintage & Eclectic", "Ornate & Traditional"];
  const materialPreferences = ["Wood & Natural Tones", "Metal & Glass", "Concrete & Industrial", "Rich Fabrics & Textures"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormSelect label="Room Type" name="roomType" options={roomTypes} />
      <FormSelect label="Design Style" name="designStyle" options={designStyles} />
      <FormSelect label="Space Type" name="spaceType" options={spaceTypes} />
      <FormSelect label="Lighting Effect" name="lightingEffect" options={lightingEffects} />
      <FormSelect label="Furniture Preference" name="furniture" options={furniturePreferences} />
      <FormSelect label="Material Preference" name="materials" options={materialPreferences} />
    </div>
  );
}