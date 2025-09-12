'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => setUser(d?.user ?? null))
      .catch(() => {});
  }, []);

  return (
    <nav className="nav">
      <Link href="/">CuaMex</Link>
      <div className="spacer" />
      {user ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <span className="small">{user.email} ({user.role})</span>
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
