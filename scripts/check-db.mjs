
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Falta MONGODB_URI en .env.local');

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

async function main() {
  try {
    await client.connect();
    const admin = client.db().admin();
    const ping = await admin.ping();
    console.log('✅ Ping:', ping);

    const db = client.db(); // tu DB 'cuamex'
    const collections = await db.listCollections().toArray();
    console.log('📂 Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
  } finally {
    await client.close();
  }
}

main();
