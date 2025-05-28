import client from '../../../../lib/db'

export async function POST(req: Request) {
  const body = await req.json()
  client.db('nts-db').collection('shows').createIndex({ name: 1 }, { unique: true })
  client.db('nts-db').collection('shows').insertOne({ name: body.showName })

  return Response.json({
    message: `added ${body.showName} to favourite shows.`,
  })
}

export async function GET() {
  const shows = client.db('nts-db').collection('shows').find()
  const showList = []
  for await (const show of shows) {
    showList.push(show)
  }
  return Response.json({ shows: showList })
}

export async function DELETE(req: Request) {
  const body = await req.json()
  client.db('nts-db').collection('shows').deleteOne({name: body.showName})

  return Response.json({
    message: `removed ${body.showName} from favourite shows.`
  })
}