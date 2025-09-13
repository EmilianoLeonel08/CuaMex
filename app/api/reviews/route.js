import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDb } from '@/lib/db';

export async function POST(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    let payload;
    try { payload = jwt.verify(token, process.env.JWT_SECRET); } catch { return NextResponse.json({ error: 'No autorizado' }, { status: 401 }); }

  const { spotName, text, rating } = await req.json();
  if (!spotName || !text) return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  const r = typeof rating === 'number' ? Math.floor(rating) : null;
  if (r !== null && (r < 1 || r > 5)) return NextResponse.json({ error: 'Rating inválido' }, { status: 400 });

    const db = await getDb();
    const reviews = db.collection('reviews');
  const doc = { spotName, text, userId: payload.sub, userEmail: payload.email, createdAt: new Date() };
  if (r !== null) doc.rating = r;
  const { insertedId } = await reviews.insertOne(doc);

  return NextResponse.json({ ok: true, reviewId: insertedId.toString(), rating: doc.rating ?? null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const spot = searchParams.get('spot');
    if (!spot) return NextResponse.json({ error: 'Missing spot' }, { status: 400 });

    const db = await getDb();
    const reviews = db.collection('reviews');
  const rows = await reviews.find({ spotName: spot }).sort({ createdAt: -1 }).limit(50).toArray();
  return NextResponse.json({ ok: true, reviews: rows.map(r=>({ id: r._id.toString(), spotName: r.spotName, text: r.text, rating: r.rating ?? null, userEmail: r.userEmail, createdAt: r.createdAt })) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
