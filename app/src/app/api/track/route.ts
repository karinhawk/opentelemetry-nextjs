export async function getLiveTrack(live: string): Promise<Response> {
  const currentTime = Date.now().toString()
  const streamNumber = live === '2' ? '2' : ''

  // need a playback component
  const currentTrack = await fetch(
    `https://stream-relay-geo.ntslive.net/stream${streamNumber}?client=NTSWebApp&device=Missing&t=${currentTime}`,
  )
  return new Response(JSON.stringify(currentTrack), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
