import { livePayload } from "../../../utils/schemas/live";

export async function getLive(): Promise<Response> {
    const ntsLive = await fetch('https://www.nts.live/api/v2/live')
    const ntsLiveJson = await ntsLive.json()
    console.log(ntsLiveJson)
    const parsedntsLive = ntsLiveJson.results.map((result: unknown) => livePayload.parse(result))
    console.log(parsedntsLive)

    return new Response(JSON.stringify(parsedntsLive), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}

export async function getSearchin() {
    const ntsLiveCurrent = await fetch('https://www.nts.live/api/v2/search/episodes')
    const hi = await ntsLiveCurrent.json()
    // console.log(hi)


    return new Response(JSON.stringify(ntsLiveCurrent), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}

// TODO!
// idea = saving nts shows and seeing them later on another page!
// mongoDB database helm chart
// CRUD operations on that db

// https://www.nts.live/api/v2/live - gets current live show

// one page to show what is currently playing on nts with a button to save show to favourite shows
// another page where you can view and delete favourite shows (with index of favourite in order that you can update!)


// /getMyScheduleEurope
// https://stream-relay-geo.ntslive.net/stream?client=NTSWebApp&device=Missing&t=1742979442725 - get time now