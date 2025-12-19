'use client';
import { Smile } from 'lucide-react';

export default function MoodWidget({ selectedItems, onSelect }) {

  
  const handleChange = (key, value) => {
    onSelect({ ...selectedItems, [key]: parseInt(value) });
  };

  const sliders = [
    { key: 'energy', label: 'Energía', description: 'Intensidad y actividad' },
    { key: 'danceability', label: 'Bailabilidad', description: 'Ritmo y estabilidad' },
    { key: 'valence', label: 'Positividad', description: 'Triste vs Feliz' },
  ];

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
      <h3 className="text-sm font-bold text-zinc-400 uppercase mb-4 flex items-center gap-2">
        <Smile size={16} /> Mood & Energía
      </h3>
      
      <div className="space-y-5">
        {sliders.map((s) => (
          <div key={s.key} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-300 font-medium">{s.label}</span>
              <span className="text-green-500 font-bold">{selectedItems[s.key] || 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={selectedItems[s.key] || 50}
              onChange={(e) => handleChange(s.key, e.target.value)}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <p className="text-[10px] text-zinc-500">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}