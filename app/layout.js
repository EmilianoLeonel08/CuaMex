import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'CuaMex',
  description: 'Recomendaciones culinarias en CDMX',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
