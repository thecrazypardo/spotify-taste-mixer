// components/widgets/DecadeWidget.js
import { Calendar } from 'lucide-react';

const DECADES = ['70s', '80s', '90s', '00s', '10s', '20s'];

export default function DecadeWidget({ selectedItems, onSelect }) {
  const toggleDecade = (decade) => {
    const next = selectedItems.includes(decade)
      ? selectedItems.filter(d => d !== decade)
      : [...selectedItems, decade];
    onSelect(next);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
      <h3 className="text-sm font-bold text-zinc-400 uppercase mb-3 flex items-center gap-2">
        <Calendar size={16} /> Épocas
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {DECADES.map((decade) => (
          <button
            key={decade}
            onClick={() => toggleDecade(decade)}
            className={`py-2 rounded-lg text-xs transition-all ${
              selectedItems.includes(decade)
                ? 'bg-white text-black font-bold'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {decade}
          </button>
        ))}
      </div>
    </div>
  );
}