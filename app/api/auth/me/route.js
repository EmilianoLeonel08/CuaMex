import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({
      authenticated: true,
      user: { email: payload.email, role: payload.role }
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
