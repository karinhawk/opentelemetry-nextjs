"use client";
import { type SetStateAction, useState } from "react";

type Genre = {
  id: string;
  value: string;
};

export type GenreItem = {
  genres: Array<Genre>;
};

type GenreMap = {
  [key: number]: GenreItem;
};

export function GenreSelect(genres: GenreMap) {
  const [selectedGenreId, setSelectedGenreId] = useState("choose a genre");

  const handleSelectChange = async (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const genre = event.target.value;
    setSelectedGenreId(genre);
    const res = await fetch(
      `http://localhost:3000/api/shows/favourites/genre?genre=${genre}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
  };

  return (
    <select value={selectedGenreId} onChange={handleSelectChange}>
      filter by genre
      {Object.entries(genres).map(([key, genreItem]) => {
        return genreItem.genres.map((genre) => (
          <option key={genre.id} value={genre.value}>
            {genre.value}
          </option>
        ));
      })}
    </select>
  );
}
