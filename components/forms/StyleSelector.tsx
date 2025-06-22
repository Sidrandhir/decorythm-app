// File: components/forms/StyleSelector.tsx
'use client';

export function StyleSelector() {
  const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Dining Room"];
  const styles = ["Modern", "Minimalist", "Industrial", "Bohemian", "Scandinavian", "Coastal"];

  return (
    <div className="space-y-4 mt-6">
      <div>
        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
        <select
          id="roomType"
          name="roomType"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={roomTypes[0]}
        >
          {roomTypes.map(type => <option key={type}>{type}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="style" className="block text-sm font-medium text-gray-700">Design Style</label>
        <select
          id="style"
          name="style"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={styles[0]}
        >
          {styles.map(style => <option key={style}>{style}</option>)}
        </select>
      </div>
    </div>
  );
}