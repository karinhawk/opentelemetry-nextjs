'use client'

import type { z } from 'zod'
import type { livePayload } from '../utils/schemas/live'

export default function FavouriteShowButton(
  props: z.infer<typeof livePayload>,
) {
  const addShowToFavourites = async (showName: string) => {
    const res = await fetch('http://localhost:3000/api/shows/favourites', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ showName: showName }),
    })
    const content = await res.json()
    console.log(content)
  }

  return (
    <button
      type="button"
      onClick={() => addShowToFavourites(props.broadcastName)}
    >
      Add show to favourites
    </button>
  )
}
