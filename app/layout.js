import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'CuaMex',
  description: 'El arte de amar la comida',
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
