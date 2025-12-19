'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '../lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-4">
      <div className="text-center">
        <h1 className="text-5xl font-black mb-6 text-white tracking-tighter">
          🎵 Spotify Taste Mixer
        </h1>
        <p className="text-gray-400 mb-10 text-lg max-w-md">
          Genera playlists personalizadas basándote en tus gustos musicales reales.
        </p>
        
        <button 
          onClick={handleLogin}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105"
        >
          CONECTAR CON SPOTIFY
        </button>
      </div>
    </main>
  );
}