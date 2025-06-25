import { env } from "node:process";
import express from "express";
import cors from "cors";
import * as z from "zod";

const { RAPID_API_KEY: rapidApiKey } = z
  .object({
    RAPID_API_KEY: z.string().min(1).default(""),
  })
  .parse(env);

const app = express();

app.use(cors());

app.get("/identify/:url", async function (req, res) {
  const url: string = req.params.url;

  try {
    const response = await fetch(
      `https://shazam-song-recognition-api.p.rapidapi.com/recognize/url?url=${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-rapidapi-host": "shazam-song-recognition-api.p.rapidapi.com",
          "x-rapidapi-key": rapidApiKey,
        },
      }
    );
    const data = await response.json();
    res.send({ data: data });
  } catch (e: any) {
    throw Error(e);
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
