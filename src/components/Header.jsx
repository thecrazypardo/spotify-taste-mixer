'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout, isAuthenticated } from '../lib/auth';
import { LogOut } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(false);

  // useEffect solo se ejecuta en el cliente
  useEffect(() => {
    setAuthStatus(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setAuthStatus(false);
    router.push('/');
  };

  return (
    <nav className="flex items-center w-full h-20 space-x-6 px-8 bg-black shadow-xl sticky top-0 z-50">
      <Link href="/" className="text-lg font-medium tracking-wider text-white hover:text-green-400 transition">
        Home
      </Link>
      <Link href="/dashboard" className="text-lg font-medium text-white hover:text-green-400 transition">
        Dashboard
      </Link>
      
      <div className="ml-auto flex items-center">
        {authStatus ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold transition"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        ) : (
          <Link 
            href="/" 
            className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-full text-sm font-bold transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}