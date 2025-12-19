import { getAccessToken } from './auth';


const BASE_URL = 'https://api.spotify.com/v1';


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


export async function generatePlaylist(preferences) {
  const token = getAccessToken();
  if (!token) throw new Error('No hay token de acceso');

  const { genres, popularity, artists, tracks } = preferences;
  
  
  let queryParts = [];
  if (genres?.length > 0) queryParts.push(`genre:"${genres[0]}"`);
  if (artists?.length > 0) queryParts.push(`artist:"${artists[0].name}"`);
  if (tracks?.length > 0) queryParts.push(`track:"${tracks[0].name}"`);


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


    return data.tracks.items.map(t => ({
        id: t.id,
        title: t.name,
        artist: t.artists[0].name,
        albumCover: t.album.images[0]?.url,
        uri: t.uri
      }));
  } catch (error) {
    console.error("Error en generatePlaylist:", error);
    throw error;
  }
}


export async function savePlaylistToSpotify(name, uris) {
  const token = getAccessToken();
  

  const meRes = await fetch(`${BASE_URL}/me`, { 
    headers: { 'Authorization': `Bearer ${token}` } 
  });
  const me = await meRes.json();

 
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