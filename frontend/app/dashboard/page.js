import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const token = cookies().get('token')?.value;
  if (!token) redirect('/login');

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect('/login');
  }

  return (
    <section>
      <h1 className="h1">Dashboard</h1>
      <div className="card">
        <p>Hola <strong>{payload.email}</strong>. Rol: <strong>{payload.role}</strong>.</p>
        {payload.role === 'admin' ? (
          <>
            <p className="small">Panel admin (ejemplo): pronto podrás cargar nuevos spots.</p>
          </>
        ) : (
          <>
            <p className="small">Tu cuenta de usuario: guarda tus favoritos próximamente.</p>
          </>
        )}
      </div>
    </section>
  );
}
