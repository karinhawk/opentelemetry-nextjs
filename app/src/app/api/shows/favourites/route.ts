import client from "../../../../lib/db";
import type { Show } from "../../../../utils/schemas/live";

export type FavouriteShow = Show & { _id: string };

export async function POST(req: Request) {
  const body: Show = await req.json();

  client
    .db("nts-db")
    .collection("shows")
    .createIndex({ broadcastName: 1 }, { unique: true });
  client
    .db("nts-db")
    .collection("shows")
    .insertOne({ ...body });

  return Response.json({
    message: `added ${body.broadcastName} to favourite shows.`,
  });
}

export async function GET() {
  const showsCollection = client.db("nts-db").collection("shows");
  const shows = await showsCollection.find().toArray();
  const genres = await showsCollection
    .find({}, { projection: { _id: 0, genres: 1 } })
    .toArray();
  return Response.json({ shows: shows, genres: genres });
}

export async function DELETE(req: Request) {
  const body: Show = await req.json();
  client
    .db("nts-db")
    .collection("shows")
    .deleteOne({ broadcastName: body.broadcastName });

  return Response.json({
    message: `removed ${body.broadcastName} from favourite shows.`,
  });
}
