// src/components/PlaylistDisplay.jsx
'use client';
import { useState, useEffect } from 'react';
import { Star, Trash2, Save } from 'lucide-react';
import { savePlaylistToSpotify } from '../lib/spotify';

export default function PlaylistDisplay({ initialPlaylist, onRefresh }) {
  const [tracks, setTracks] = useState([]);

  // Sincronizar tracks cuando llega una nueva mezcla generada
  useEffect(() => {
    if (initialPlaylist && initialPlaylist.length > 0) {
      setTracks(initialPlaylist);
    }
  }, [initialPlaylist]);

  const handleSave = async () => {
    // IMPORTANTE: Usar 'tracks' (el estado actual), no 'initialPlaylist'
    if (tracks.length === 0) {
      alert("No hay canciones para guardar");
      return;
    }

    const uris = tracks.map(t => t.uri);
    try {
      const url = await savePlaylistToSpotify("Mi Mix de Taste Mixer", uris);
      alert("¡Playlist guardada con éxito!");
      window.open(url, '_blank');
    } catch (e) { 
      alert("Error al guardar: " + e.message);
    }
  };

  return (
    <div className="bg-[#121212] p-6 rounded-lg border border-white/10">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Tu Playlist ({tracks.length})</h2>
        <div className="flex gap-2">
          <button onClick={onRefresh} className="bg-white/10 px-4 py-2 rounded-full">Refrescar</button>
          <button 
            onClick={handleSave} 
            className="bg-[#1DB954] text-black px-4 py-2 rounded-full font-bold flex items-center gap-2"
          >
            <Save size={18}/> Guardar en Spotify
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {tracks.map(track => (
          <div key={track.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded group">
            <div className="flex items-center gap-3">
              <img src={track.albumCover} className="w-12 h-12 rounded" alt="cover" />
              <div>
                <p className="font-medium text-white">{track.title}</p>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
            </div>
            <button 
              onClick={() => setTracks(tracks.filter(t => t.id !== track.id))} 
              className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {tracks.length === 0 && (
          <p className="text-gray-500 italic text-center py-10">Haz clic en "Generar Mezcla" para ver canciones aquí.</p>
        )}
      </div>
    </div>
  );
}