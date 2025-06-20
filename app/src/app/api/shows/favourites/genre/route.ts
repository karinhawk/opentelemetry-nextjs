import client from "../../../../../lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const genre = params.get("genre");
  const showsCollection = client.db("nts-db").collection("shows");
  const shows = await showsCollection.find({ "genres.value": genre }).toArray();
  const genres = await showsCollection
    .find({}, { projection: { _id: 0, genres: 1 } })
    .toArray();
  return Response.json({ shows: shows, genres: genres });
}
