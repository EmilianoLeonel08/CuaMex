'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(''); setOk(false);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json().catch(()=>({}));
    if (res.ok) {
      setOk(true);
      setTimeout(()=>router.push('/login'), 1200);
    } else {
      setErr(data?.error ?? 'Error al registrar');
    }
  }

  return (
    <section>
      <h1 className="h1">Registro</h1>
      <form onSubmit={onSubmit} className="card" style={{maxWidth:420}}>
        <label className="label">Email</label>
        <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="tú@correo.com" />
        <div style={{height:'.8rem'}} />
        <label className="label">Contraseña</label>
        <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
        <div style={{height:'1rem'}} />
        <button className="btn" type="submit">Crear cuenta</button>
        {ok && <p style={{color:'#14b8a6', marginTop:'.8rem'}}>¡Listo! Ahora entra.</p>}
        {err && <p style={{color:'#ff6b6b', marginTop:'.8rem'}}>{err}</p>}
      </form>
    </section>
  );
}
