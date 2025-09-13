"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onLogout() {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        // notify other components (Navbar) that logout happened
        try { window.dispatchEvent(new CustomEvent('user-logout')); } catch (e) {}
        router.push('/login');
      } else {
        setLoading(false);
        console.error('Logout failed');
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <button className="btn" onClick={onLogout} disabled={loading}>
      {loading ? 'Saliendo...' : 'Cerrar sesión'}
    </button>
  );
}
