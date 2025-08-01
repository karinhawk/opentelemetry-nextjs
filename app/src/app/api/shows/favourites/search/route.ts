import { NextRequest } from "next/server";
import client from "../../../../../lib/db";

function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const encodedSearchInput = params.get("search");
  const searchInput = decodeURIComponent(encodedSearchInput!);

  const showsCollection = client.db("nts-db").collection("shows");
  const shows = await showsCollection
    .find({
      broadcastName: {
        $regex: new RegExp(escapeRegex(`${searchInput}`)),
        $options: "i",
      },
    })
    .toArray();
  const genres = await showsCollection
    .find({}, { projection: { _id: 0, genres: 1 } })
    .toArray();
  return Response.json({ shows: shows, genres: genres });
}
