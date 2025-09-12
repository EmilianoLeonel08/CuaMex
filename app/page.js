export default function Home() {
  const spots = [
    { name: 'Taquería El Fogón', barrio:'Roma', tipo:'Tacos al pastor', nota:'Salsa de piña buenísima' },
    { name: 'Pozolería Doña Mari', barrio:'Portales', tipo:'Pozole verde', nota:'Jueves de 2x1' },
    { name: 'Chilaquilazo', barrio:'Condesa', tipo:'Torta de chilaquil', nota:'Nivel de picor ajustable' },
  ];

  return (
    <section>
      <h1 className="h1">CuaMex — Recomendaciones culinarias de CDMX</h1>
      <p className="small">Sitio simple de pruebas. Próximamente: más spots y filtros por colonia.</p>
      <div style={{height: '1rem'}} />
      <div className="grid">
        {spots.map((s, i) => (
          <article key={i} className="card">
            <h3 style={{margin:'0 0 .4rem'}}>{s.name}</h3>
            <p className="small">{s.barrio} · {s.tipo}</p>
            <p style={{marginTop:'.5rem'}}>{s.nota}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
