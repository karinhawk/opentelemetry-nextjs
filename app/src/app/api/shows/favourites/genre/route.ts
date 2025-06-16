import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../../lib/db";

export async function GET(req: NextApiRequest) {
  const { genre } = req.query;
  const showsCollection = client.db("nts-db").collection("shows");
  const shows = await showsCollection.find({ genre: genre }).toArray();
  return Response.json({ shows: shows });
}
