'use client'
import { type SetStateAction, useState } from 'react'

type Genre = {
  id: string
  value: string
}

export type GenreItem = {
  genres: Array<Genre>
}

type GenreMap = {
  [key: number]: GenreItem
}

export function GenreSelect(genres: GenreMap) {
  const [selectedGenreId, setSelectedGenreId] = useState('choose a genre')

  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedGenreId(event.target.value)
  }

  return (
    <select value={selectedGenreId} onChange={handleSelectChange}>
      filter by genre
      {Object.entries(genres).map(([key, genreItem]) => {
        return genreItem.genres.map(genre => (
          <option key={genre.id} value={genre.value}>
            {genre.value}
          </option>
        ))
      })}
    </select>
  )
}
