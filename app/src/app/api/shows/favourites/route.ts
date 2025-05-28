import client from '../../../../lib/db'
import { Show } from '../../../../utils/schemas/live'

export type FavouriteShow = Show & { _id: string }

export async function POST(req: Request) {
  const body: Show = await req.json()

  client.db('nts-db').collection('shows').createIndex({ broadcastName: 1 }, { unique: true })
  client.db('nts-db').collection('shows').insertOne({ ...body })

  return Response.json({
    message: `added ${body.broadcastName} to favourite shows.`,
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
  const body: Show = await req.json()
  client.db('nts-db').collection('shows').deleteOne({broadcastName: body.broadcastName})

  return Response.json({
    message: `removed ${body.broadcastName} from favourite shows.`
  })
}