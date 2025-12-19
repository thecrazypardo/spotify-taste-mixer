'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '../../lib/auth';
import { generatePlaylist } from '../../lib/spotify';


import ArtistWidget from '../../components/widgets/ArtistWidget';
import TrackWidget from '../../components/widgets/TrackWidget';
import GenreWidget from '../../components/widgets/GenreWidget';
import DecadeWidget from '../../components/widgets/DecadeWidget';
import MoodWidget from '../../components/widgets/MoodWidget';
import PlaylistDisplay from '../../components/PlaylistDisplay';

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);


  const [prefs, setPrefs] = useState({
    artists: [],
    tracks: [],
    genres: [],
    decades: [],
    mood: { energy: 50, valence: 50 } 
  });

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) router.push('/');
  }, [router]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      console.log("Enviando preferencias a Spotify:", prefs);
      const result = await generatePlaylist(prefs);
      
      console.log("Resultados obtenidos:", result);
      
      if (result.length === 0) {
        alert("No se encontraron canciones. Intenta ajustar los filtros (especialmente popularidad).");
      }
      
      setPlaylist(result); 
    } catch (e) {
      console.error("Error en la generación:", e);
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black text-[#1DB954]">TASTE MIXER</h1>
        <button onClick={logout} className="text-sm hover:underline">Cerrar Sesión</button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <aside className="space-y-6">
          <ArtistWidget 
            selectedItems={prefs.artists} 
            onSelect={(v) => setPrefs({...prefs, artists: v})} 
          />
          <TrackWidget 
            selectedItems={prefs.tracks} 
            onSelect={(v) => setPrefs({...prefs, tracks: v})} 
          />
          <GenreWidget 
            selectedItems={prefs.genres} 
            onSelect={(v) => setPrefs({...prefs, genres: v})} 
          />
          <DecadeWidget 
            selectedItems={prefs.decades} 
            onSelect={(v) => setPrefs({...prefs, decades: v})} 
          />
          <MoodWidget 
            selectedItems={prefs.mood} 
            onSelect={(v) => setPrefs({...prefs, mood: v})} 
          />
          
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full py-4 bg-[#1DB954] text-black font-black rounded-full hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'GENERANDO...' : 'GENERAR MEZCLA'}
          </button>
        </aside>

       
        <main className="lg:col-span-3">
          <PlaylistDisplay 
            initialPlaylist={playlist} 
            onRefresh={handleGenerate} 
          />
        </main>
      </div>
    </div>
  );
}