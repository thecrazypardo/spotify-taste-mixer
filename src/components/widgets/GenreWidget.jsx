'use client';
import { useState } from 'react';
import { Music, Search, X } from 'lucide-react';

const ALL_GENRES = ['acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music'];

export default function GenreWidget({ selectedItems = [], onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  const toggleGenre = (genre) => {
    if (selectedItems.includes(genre)) {
      onSelect(selectedItems.filter(g => g !== genre));
    } else if (selectedItems.length < 5) {
      onSelect([...selectedItems, genre]);
    }
  };

  const filteredGenres = ALL_GENRES.filter(g => 
    g.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 12);

  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
      <h3 className="text-xs font-bold text-zinc-500 uppercase mb-3 flex items-center gap-2">
        <Music size={14} /> Géneros (Máx 5)
      </h3>

      <div className="relative mb-3">
        <Search className="absolute left-2.5 top-2.5 text-zinc-600" size={14} />
        <input
          type="text"
          placeholder="Filtrar géneros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-800 border-none rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {filteredGenres.map(genre => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`text-[10px] py-1.5 px-2 rounded text-left truncate transition ${
              selectedItems.includes(genre) 
                ? 'bg-green-500 text-black font-bold' 
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 border-t border-zinc-800 pt-3">
        {selectedItems.map(g => (
          <span key={g} className="bg-green-500/10 text-green-500 px-2 py-1 rounded-md text-[9px] font-bold flex items-center gap-1">
            {g} <X size={10} className="cursor-pointer" onClick={() => toggleGenre(g)} />
          </span>
        ))}
      </div>
    </div>
  );
}