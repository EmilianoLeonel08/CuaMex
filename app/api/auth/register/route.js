import { NextResponse } from 'next/server';
import { usersCollection } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
    }

    const users = await usersCollection();
    const exists = await users.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 });
    }

    const count = await users.countDocuments();
    const role = count === 0 ? 'admin' : 'user';
    const passwordHash = await hashPassword(password);

    const { insertedId } = await users.insertOne({
      email,
      passwordHash,
      role,
      createdAt: new Date()
    });

    return NextResponse.json({ ok: true, userId: insertedId.toString(), role });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
