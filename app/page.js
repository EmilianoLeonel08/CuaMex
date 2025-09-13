import SpotsList from '@/components/SpotsList';

export default function Home() {
  const spots = [
    { name: 'Don Chava ', barrio: 'Coapa', tipo: 'Mariscos frescos', nota: 'Salsa de piña buenísima', image: '/images/spots/chava.jpg' },
    { name: 'Sakura sushi', barrio: 'San Antonio', tipo: 'Gastronomía Japonesa', nota: 'Jueves de 2x1', image: '/images/spots/sakura.jpg' },
    { name: 'Berry Cafe', barrio: 'Santa Cruz Xohitepec', tipo: 'Cafetería', nota: 'Chapatas y café deliciosos al mejor precio', image: '/images/spots/berry.jpg' },
    { name: 'OCHO20', barrio: 'Miravalle', tipo: 'Gastronomía Italiana', nota: 'Pet Friendly', image: '/images/spots/ocho.jpg' },
    { name: 'Café San Pablo', barrio: 'Portales Nte', tipo: 'Cafetería', nota: 'Una clásica torta bien preparada', image: '/images/spots/Pablo.jpg' },
    { name: 'Mitsu Café', barrio: 'Centro Historico', tipo: 'Cafetería de gatos', nota: 'EL lugar perfecto para los amantes de michis y comida', image: '/images/spots/Mitsu.jpg' },
  ];

  return (
    <section>
      <h1 className="h1">CuaMex — El arte de amar la comida</h1>
      <p className="small">El mejor lugar para encontrar la mejor comida.</p>
      <div style={{ height: '1rem' }} />
      <SpotsList spots={spots} />
    </section>
  );
}
