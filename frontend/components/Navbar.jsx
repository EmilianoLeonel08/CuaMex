'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LogoutButton from '@/components/LogoutButton';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    function setMeFromApi() {
      fetch('/api/auth/me')
        .then(r => r.ok ? r.json() : null)
        .then(d => { if (mounted) setUser(d?.user ?? null); })
        .catch(() => { if (mounted) setUser(null); });
    }
    setMeFromApi();

    function onLogout() { if (mounted) setUser(null); }
    window.addEventListener('user-logout', onLogout);

    function onLogin(e) {
      const detail = e?.detail;
      if (mounted) setUser(detail ? { email: detail.email, role: detail.role } : null);
    }
    window.addEventListener('user-login', onLogin);

    return () => { mounted = false; window.removeEventListener('user-logout', onLogout); window.removeEventListener('user-login', onLogin); };
  }, []);

  return (
    <nav className="nav">
      <Link href="/">CuaMex</Link>
      <div className="spacer" />
      {user ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <span className="small">{user.email} ({user.role})</span>
          <div style={{width:8}} />
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login">Entrar</Link>
          <Link href="/register">Registro</Link>
        </>
      )}
    </nav>
  );
}
