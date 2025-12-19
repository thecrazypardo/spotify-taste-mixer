'use client';
import { useState, useEffect } from 'react';
import { Search, X, Music, Loader2 } from 'lucide-react';
import { searchSpotify } from '../../lib/spotify';

export default function TrackWidget({ selectedItems = [], onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const data = await searchSpotify(query, 'track');
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const toggleTrack = (track) => {
    const exists = selectedItems.find(item => item.id === track.id);
    if (exists) {
      onSelect(selectedItems.filter(item => item.id !== track.id));
    } else {
      onSelect([...selectedItems, { id: track.id, name: track.name, artist: track.artists[0].name }]);
    }
    setQuery('');
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
      <h3 className="text-sm font-bold text-zinc-400 uppercase mb-3 flex items-center gap-2">
        <Music size={16} /> Canciones Semilla
      </h3>
      
      <div className="relative mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar canción..."
          className="w-full bg-zinc-800 rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
        {loading && <Loader2 className="absolute right-3 top-2.5 animate-spin text-green-500" size={18} />}
      </div>

      {results.length > 0 && (
        <div className="max-h-40 overflow-y-auto bg-zinc-800 rounded-lg mb-4">
          {results.map(track => (
            <div key={track.id} onClick={() => toggleTrack(track)} className="p-2 hover:bg-zinc-700 cursor-pointer flex items-center gap-2 border-b border-zinc-700 last:border-0 text-xs">
              <img src={track.album.images[2]?.url} className="w-6 h-6 rounded" />
              <div className="truncate">
                <p className="font-bold truncate">{track.name}</p>
                <p className="text-zinc-500 text-[10px]">{track.artists[0].name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        {selectedItems.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-zinc-800 p-2 rounded text-[11px]">
            <span className="truncate pr-2 font-medium">{item.name} • <span className="text-zinc-500">{item.artist}</span></span>
            <X size={14} className="text-zinc-500 hover:text-red-500 cursor-pointer shrink-0" onClick={() => toggleTrack(item)} />
          </div>
        ))}
      </div>
    </div>
  );
}