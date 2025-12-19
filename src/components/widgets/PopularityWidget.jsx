'use client';
import { Zap } from 'lucide-react';

export default function PopularityWidget({ value, onChange }) {
  const presets = [
    { label: 'Nicho', range: [0, 30] },
    { label: 'Equilibrado', range: [31, 70] },
    { label: 'Hits', range: [71, 100] }
  ];

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
      <h3 className="text-xs font-bold text-zinc-500 uppercase mb-4 flex items-center gap-2">
        <Zap size={14} /> Popularidad
      </h3>
      
      <div className="flex gap-2 mb-4">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => onChange(p.range)}
            className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition ${
              value[0] === p.range[0] ? 'bg-green-500 text-black' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value[1]}
        onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
        className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500"
      />
      <div className="flex justify-between mt-2 text-[9px] text-zinc-600 font-bold uppercase">
        <span>Min: {value[0]}</span>
        <span>Max: {value[1]}</span>
      </div>
    </div>
  );
}