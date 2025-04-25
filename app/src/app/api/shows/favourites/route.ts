import client from '../../../../db/db'

export async function POST(req: Request) {
  const body = await req.json()
  await client.connect()
  const db = client.db('nts-db')
  const shows = db.collection('shows')
  await shows.insertOne({ name: body })
  client.close()
  return Response.json({ faves: body })
}

export async function GET() {
  await client.connect()
  const db = client.db('nts-db')
  const shows = db.collection('shows')
  const cursor = shows.find({}).next()
  // const faves = await cursor.hasNext() ? cursor.next() : null
  return Response.json({ shows: cursor })
}
