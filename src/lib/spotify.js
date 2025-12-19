// src/lib/spotify.js
import { getAccessToken } from './auth';

// URL base oficial de la API de Spotify
const BASE_URL = 'https://api.spotify.com/v1';

/**
 * Busca artistas o canciones (GET /search)
 */
export async function searchSpotify(query, type) {
  const token = getAccessToken();
  if (!token || !query) return [];

  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&type=${type}&limit=10`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    return data[type + 's']?.items || [];
  } catch (error) { return []; }
}

/**
 * Genera la mezcla basada en las preferencias (Estrategia Recomendada)
 */
export async function generatePlaylist(preferences) {
  const token = getAccessToken();
  if (!token) throw new Error('No hay token de acceso');

  const { genres, popularity, artists, tracks } = preferences;
  
  // Construcción de Query Robusta
  let queryParts = [];
  if (genres?.length > 0) queryParts.push(`genre:"${genres[0]}"`);
  if (artists?.length > 0) queryParts.push(`artist:"${artists[0].name}"`);
  if (tracks?.length > 0) queryParts.push(`track:"${tracks[0].name}"`);

  // Si no hay selecciones, buscamos éxitos del año actual para no devolver vacío
  const finalQuery = queryParts.length > 0 ? queryParts.join(' ') : 'year:2024';

  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(finalQuery)}&type=track&limit=30`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) throw new Error('Error en la comunicación con Spotify');
    const data = await res.json();

    if (!data.tracks || data.tracks.items.length === 0) {
      console.warn("Spotify no encontró resultados para:", finalQuery);
      return []; 
    }

    // Mapeo con URIs obligatorios para el guardado posterior
    return data.tracks.items.map(t => ({
        id: t.id,
        title: t.name,
        artist: t.artists[0].name,
        albumCover: t.album.images[0]?.url,
        uri: t.uri // Requisito para POST /playlists/{id}/tracks
      }));
  } catch (error) {
    console.error("Error en generatePlaylist:", error);
    throw error;
  }
}

/**
 * FLUJO DE GUARDADO OBLIGATORIO (Lo que faltaba exportar)
 * Pasos: 1. Obtener ID -> 2. Crear Playlist -> 3. Añadir Tracks
 */
export async function savePlaylistToSpotify(name, uris) {
  const token = getAccessToken();
  
  // 1. Obtener perfil del usuario (GET /me)
  const meRes = await fetch(`${BASE_URL}/me`, { 
    headers: { 'Authorization': `Bearer ${token}` } 
  });
  const me = await meRes.json();

  // 2. Crear la playlist vacía (POST /users/{user_id}/playlists)
  const playRes = await fetch(`${BASE_URL}/users/${me.id}/playlists`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ 
      name: name, 
      description: 'Generada con Taste Mixer', 
      public: false 
    })
  });
  const playlist = await playRes.json();

  // 3. Añadir canciones (POST /playlists/{playlist_id}/tracks)
  await fetch(`${BASE_URL}/playlists/${playlist.id}/tracks`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ uris: uris })
  });

  return playlist.external_urls.spotify;
}