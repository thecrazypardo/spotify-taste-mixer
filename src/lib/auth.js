const isClient = typeof window !== 'undefined';

export function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getSpotifyAuthUrl() {
  if (!isClient) return '#';
  
  const state = generateRandomString(16);
  sessionStorage.setItem('spotify_auth_state', state);

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  
  if (!clientId) console.error("CRÍTICO: NEXT_PUBLIC_SPOTIFY_CLIENT_ID no está definido");

  const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private user-top-read';

  const params = new URLSearchParams({
    client_id: clientId,      
    response_type: 'code',    
    redirect_uri: redirectUri,
    state: state,             
    scope: scope,
    show_dialog: 'true'
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export function saveTokens(accessToken, refreshToken, expiresIn) {
  if (!isClient) return;
  const expirationTime = Date.now() + expiresIn * 1000;
  localStorage.setItem('spotify_access_token', accessToken);
  if (refreshToken) localStorage.setItem('spotify_refresh_token', refreshToken);
  localStorage.setItem('spotify_token_expiration', expirationTime.toString());
}

export function getAccessToken() {
  if (!isClient) return null;
  const token = localStorage.getItem('spotify_access_token');
  const expiration = localStorage.getItem('spotify_token_expiration');
  
  if (!token || !expiration) return null;
 
  if (Date.now() > parseInt(expiration) - 300000) return null;
  
  return token;
}


export function isAuthenticated() {
  if (!isClient) return false;
  const token = localStorage.getItem('spotify_access_token');
  const expiration = localStorage.getItem('spotify_token_expiration');
  return !!token && Date.now() < parseInt(expiration);
}

export function logout() {
  if (!isClient) return;
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = '/';
}