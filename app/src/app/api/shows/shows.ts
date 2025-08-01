import { livePayload } from "../../../utils/schemas/live";

// turn this into next api call babesss
export async function getLive(): Promise<Response> {
  const ntsLive = await fetch("https://www.nts.live/api/v2/live");
  const ntsLiveJson = await ntsLive.json();
  const parsedntsLive = ntsLiveJson.results.map((result: unknown) =>
    livePayload.parse(result)
  );

  return new Response(JSON.stringify(parsedntsLive), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
