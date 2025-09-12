'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      router.push('/dashboard');
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data?.error ?? 'Error al iniciar sesión');
    }
  }

  return (
    <section>
      <h1 className="h1">Entrar</h1>
      <form onSubmit={onSubmit} className="card" style={{maxWidth:420}}>
        <label className="label">Email</label>
        <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="tú@correo.com" />

        <div style={{height:'.8rem'}} />
        <label className="label">Contraseña</label>
        <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />

        <div style={{height:'1rem'}} />
        <button className="btn" type="submit">Entrar</button>
        {err && <p style={{color:'#ff6b6b', marginTop:'.8rem'}}>{err}</p>}
      </form>
    </section>
  );
}
