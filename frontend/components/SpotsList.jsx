"use client";

import { useEffect, useState } from 'react';
import SpotCard from './SpotCard';

export default function SpotsList({ spots }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (mounted) setUser(d?.user ?? null); })
      .catch(() => { if (mounted) setUser(null); });
    function onLogin(e) { if (mounted) setUser(e?.detail ? { email: e.detail.email, role: e.detail.role } : null); }
    function onLogout() { if (mounted) setUser(null); }
    window.addEventListener('user-login', onLogin);
    window.addEventListener('user-logout', onLogout);
    return () => { mounted = false; window.removeEventListener('user-login', onLogin); window.removeEventListener('user-logout', onLogout); };
  }, []);

  return (
    <div className="grid">
      {spots.map((s, i) => (
        <SpotCard key={i} spot={s} user={user} />
      ))}
    </div>
  );
}
