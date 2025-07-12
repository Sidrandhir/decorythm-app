// File: components/forms/StyleSelector.tsx
'use client';

interface StyleSelectorProps {
  style: string;
  onStyleChange: (value: string) => void;
  roomType: string;
  onRoomTypeChange: (value: string) => void;
}

export function StyleSelector({ style, onStyleChange, roomType, onRoomTypeChange }: StyleSelectorProps) {
  const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Dining Room"];
  const styles = ["Modern", "Minimalist", "Industrial", "Bohemian", "Scandinavian", "Coastal"];

  return (
    <div className="space-y-4 mt-6">
      <div>
        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
        <select
          id="roomType"
          name="roomType"
          className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md"
          value={roomType} // Controlled by parent state
          onChange={(e) => onRoomTypeChange(e.target.value)} // Reports changes to parent
        >
          {roomTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="style" className="block text-sm font-medium text-gray-700">Design Style</label>
        <select
          id="style"
          name="style"
          className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md"
          value={style} // Controlled by parent state
          onChange={(e) => onStyleChange(e.target.value)} // Reports changes to parent
        >
          {styles.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
}