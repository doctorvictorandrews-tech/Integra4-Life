// components/DimensionFilters.tsx
// NOVO ARQUIVO - CRIAR

"use client";
import { useState } from "react";

interface FilterProps {
  onFilterChange: (dimension: string | null) => void;
}

export default function DimensionFilters({ onFilterChange }: FilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const dimensions = [
    { key: 'fisica', name: 'Física', color: '#4CAF50', icon: '💪' },
    { key: 'mental', name: 'Mental', color: '#2196F3', icon: '🧠' },
    { key: 'emocional', name: 'Emocional', color: '#E91E63', icon: '❤️' },
    { key: 'energetica', name: 'Energética', color: '#9C27B0', icon: '✨' }
  ];

  const handleClick = (key: string) => {
    if (active === key) {
      setActive(null);
      onFilterChange(null);
    } else {
      setActive(key);
      onFilterChange(key);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      <button
        onClick={() => {
          setActive(null);
          onFilterChange(null);
        }}
        className={`px-6 py-3 rounded-full transition-all ${
          active === null 
            ? 'bg-[#2D1B4E] text-white shadow-lg scale-105' 
            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-[#2D1B4E] hover:scale-105'
        }`}
      >
        Todas
      </button>
      
      {dimensions.map((dim) => (
        <button
          key={dim.key}
          onClick={() => handleClick(dim.key)}
          className={`px-6 py-3 rounded-full transition-all font-semibold ${
            active === dim.key 
              ? 'text-white shadow-lg scale-105' 
              : 'bg-white border-2 hover:scale-105'
          }`}
          style={{
            backgroundColor: active === dim.key ? dim.color : 'white',
            borderColor: active === dim.key ? dim.color : '#d1d5db',
            color: active === dim.key ? 'white' : '#374151'
          }}
        >
          <span className="mr-2">{dim.icon}</span>
          {dim.name}
        </button>
      ))}
    </div>
  );
}