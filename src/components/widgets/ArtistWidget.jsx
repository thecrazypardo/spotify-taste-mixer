'use client';
import { useState, useEffect } from 'react';
import { Search, X, User, Loader2 } from 'lucide-react';
import { searchSpotify } from '../../lib/spotify';

export default function ArtistWidget({ selectedItems = [], onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const data = await searchSpotify(query, 'artist');
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const toggleArtist = (artist) => {
    const exists = selectedItems.find(item => item.id === artist.id);
    if (exists) {
      onSelect(selectedItems.filter(item => item.id !== artist.id));
    } else if (selectedItems.length < 5) {
      onSelect([...selectedItems, { id: artist.id, name: artist.name, image: artist.images[2]?.url }]);
    }
    setQuery('');
    setResults([]);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
      <h3 className="text-sm font-bold text-zinc-400 uppercase mb-3 flex items-center gap-2">
        <User size={16} /> Artistas (Máx. 5)
      </h3>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 text-zinc-500" size={16} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artista..."
          className="w-full bg-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
        {loading && <Loader2 className="absolute right-3 top-3 animate-spin text-green-500" size={16} />}
      </div>

      
      {results.length > 0 && (
        <div className="mt-2 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
          {results.map(artist => (
            <button
              key={artist.id}
              onClick={() => toggleArtist(artist)}
              className="w-full flex items-center gap-3 p-2 hover:bg-zinc-700 text-left text-xs transition"
            >
              <img src={artist.images[2]?.url || '/placeholder.png'} className="w-8 h-8 rounded-full object-cover" />
              <span className="font-medium">{artist.name}</span>
            </button>
          ))}
        </div>
      )}

      
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedItems.map((item) => (
          <span key={item.id} className="flex items-center gap-1 bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-1 rounded-full text-[10px] font-bold">
            {item.name}
            <X size={12} className="cursor-pointer hover:text-white" onClick={() => toggleArtist(item)} />
          </span>
        ))}
      </div>
    </div>
  );
}