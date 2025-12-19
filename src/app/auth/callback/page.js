// src/app/auth/callback/page.js
'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveTokens } from '../../../lib/auth';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const savedState = sessionStorage.getItem('spotify_auth_state');

    // DEPURACIÓN SEGÚN GUÍA
    console.log('State recibido:', state);
    console.log('State guardado:', savedState);

    if (!state || state !== savedState) {
      console.error('CSRF Validation Failed');
      return; // Aquí puedes redirigir a una página de error específica
    }

    async function getToken() {
      try {
        const response = await fetch('/api/spotify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });

        const data = await response.json();
        if (data.access_token) {
          saveTokens(data.access_token, data.refresh_token, data.expires_in);
          sessionStorage.removeItem('spotify_auth_state');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error exchanging token:', error);
      }
    }

    if (code) getToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <p>Validando sesión...</p>
    </div>
  );
}