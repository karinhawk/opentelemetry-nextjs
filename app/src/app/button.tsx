'use client'

import type { Show } from '../utils/schemas/live'

export function FavouriteShowButton(
  props: Show,
) {
  const addShowToFavourites = async (show: Show) => {
    const res = await fetch('http://localhost:3000/api/shows/favourites', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...show }),
    })
    const content = await res.json()
    console.log(content)
  }

  return (
    <button
      type="button"
      onClick={() => addShowToFavourites(props)}
    >
      Add show to favourites
    </button>
  )
}

type UnFavouriteShowButtonProps = {
  broadcastName: string
}
export function UnFavouriteShowButton(
  props: UnFavouriteShowButtonProps,
) {
  const removeShowFromFavourites = async (broadcastName: string) => {
    const res = await fetch('http://localhost:3000/api/shows/favourites', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ broadcastName: broadcastName }),
    })
    const content = await res.json()
    console.log(content)
  }

  return (
    <button
      type="button"
      onClick={() => removeShowFromFavourites(props.broadcastName)}
    >
      remove show from favourites
    </button>
  )
}