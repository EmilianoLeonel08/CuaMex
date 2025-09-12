import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Falta MONGODB_URI');

let clientPromise;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, {});
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db(); // usa la DB por defecto que pusiste en la URI
}

export async function usersCollection() {
  const db = await getDb();
  return db.collection('users');
}
