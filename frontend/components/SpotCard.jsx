"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SpotCard({ spot, user }) {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState(5);

  async function submitReview() {
    setStatus('sending');
    try {
    const res = await fetch('/api/reviews', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ spotName: spot.name, text, rating }) });
      if (res.ok) { setStatus('ok'); setText(''); setShowForm(false); }
      else { setStatus('error'); }
    } catch (e) { setStatus('error'); }
  }

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    let mounted = true;
    fetch(`/api/reviews?spot=${encodeURIComponent(spot.name)}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (mounted && d?.ok) setReviews(d.reviews); })
      .catch(()=>{});
    return () => { mounted = false; };
  }, [spot.name]);

  return (
    <article className="card">
      {spot.image && (
        <div style={{ width: '100%', height: 160, position: 'relative', marginBottom: '.6rem' }}>
          <Image src={spot.image} alt={spot.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', borderRadius: 8 }} />
        </div>
      )}
      <h3 style={{ margin: '0 0 .4rem' }}>{spot.name}</h3>
      <p className="small">{spot.barrio} · {spot.tipo}</p>
      <p style={{ marginTop: '.5rem' }}>{spot.nota}</p>

      {user ? (
        <div style={{ marginTop: '.8rem' }}>
          {!showForm ? (
            <button className="btn btn-accent" onClick={()=>setShowForm(true)}>Escribir reseña</button>
          ) : (
            <div>
              <div style={{display:'flex', gap:6, alignItems:'center', marginBottom:8}}>
                <div style={{display:'flex', gap:6}}>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} className={"btn"} onClick={()=>setRating(s)} style={{padding:6, width:34, height:34, borderRadius:6}} aria-label={`Puntuar ${s} estrellas`}>
                      {s <= rating ? '★' : '☆'}
                    </button>
                  ))}
                </div>
                <div className="small">{rating} / 5</div>
              </div>
              <textarea className="input" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Tu reseña..." />
              <div style={{height:'.5rem'}} />
              <button className="btn btn-accent" onClick={async ()=>{
                await submitReview();
                // append optimistic review including rating
                setReviews(prev=>[{ id: Date.now().toString(), spotName: spot.name, text, rating, userEmail: user.email, createdAt: new Date() }, ...prev]);
              }}>Enviar</button>
              <button className="btn" onClick={()=>{setShowForm(false); setText('');}} style={{marginLeft:8}}>Cancelar</button>
              {status === 'sending' && <p className="small">Enviando...</p>}
              {status === 'ok' && <p className="small" style={{color:'#14b8a6'}}>Reseña enviada</p>}
              {status === 'error' && <p className="small" style={{color:'#ff6b6b'}}>Error enviando reseña</p>}
            </div>
          )}
        </div>
      ) : (
        <p className="small" style={{marginTop:'.8rem'}}>Inicia sesión para escribir reseñas.</p>
      )}
      {reviews.length > 0 && (
        <div style={{marginTop:'.8rem'}}>
          <h4 style={{margin:'0 0 .4rem'}}>Reseñas</h4>
          {reviews.map(r=> (
            <div key={r.id} className="review" style={{borderTop:'1px solid #222', paddingTop:'.5rem', marginTop:'.5rem'}}>
              <p className="small"><strong>{r.userEmail}</strong> · <span className="small">{new Date(r.createdAt).toLocaleString()}</span></p>
              <div style={{marginTop:'.25rem'}}>{Array.from({length:5}).map((_,i)=> <span key={i} style={{color: i < (r.rating||0) ? 'gold' : '#444'}}>{i < (r.rating||0) ? '★' : '☆'}</span>)}</div>
              <p style={{margin:'.3rem 0 0'}}>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
