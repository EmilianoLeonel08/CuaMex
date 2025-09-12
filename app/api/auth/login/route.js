import { NextResponse } from 'next/server';
import { usersCollection } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
    }

    const users = await usersCollection();
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const res = NextResponse.json({ ok: true, role: user.role });
    res.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // local dev
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
