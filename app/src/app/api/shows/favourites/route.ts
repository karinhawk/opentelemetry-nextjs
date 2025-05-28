import client from '../../../../lib/db'

export async function POST(req: Request) {
  const body = await req.json()
  client.db('nts-db').collection('shows').insertOne({ name: body.showName })
  //   shows.insertOne({ 'name': body.showName })
  const showList: never[] = []
  //   const faveShows = shows.find()
  //   for await (const show of faveShows) {
  //     showList.push(show)
  //   }
  return Response.json({
    data: showList,
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
