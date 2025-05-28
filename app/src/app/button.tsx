'use client'

import type { z } from 'zod'
import type { livePayload } from '../utils/schemas/live'

export function FavouriteShowButton(
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

type UnFavouriteShowButtonProps = {
  show: string
}
export function UnFavouriteShowButton(
  props: UnFavouriteShowButtonProps,
) {
  const removeShowFromFavourites = async (show: string) => {
    const res = await fetch('http://localhost:3000/api/shows/favourites', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ showName: show }),
    })
    const content = await res.json()
    console.log(content)
  }

  return (
    <button
      type="button"
      onClick={() => removeShowFromFavourites(props.show)}
    >
      remove show from favourites
    </button>
  )
}