import Link from "next/link";
import type { FavouriteShow } from "../api/shows/favourites/route";
import { UnFavouriteShowButton } from "../button";
import { LiveShow } from "../live_show";
import { type GenreItem, GenreSelect } from "../select";
import styles from "./page.module.css";

export default async function Favourites({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { genre = undefined } = await searchParams;
  const urlPathSuffix = genre ? `/genre?genre=${genre}` : "";

  const res = await fetch(
    `http://localhost:3000/api/shows/favourites${urlPathSuffix}`,
    {
      method: "GET",
    }
  );
  const {
    shows,
    genres,
  }: { shows: Array<FavouriteShow>; genres: Array<GenreItem> } =
    await res.json();

  const allGenresItem: GenreItem = {
    genres: [{ id: "all", value: "all genres" }],
  };
  genres.unshift(allGenresItem);

  return (
    <main className={styles.main}>
      <h2>Favourite Shows</h2>
      {genres && <GenreSelect {...genres} />}
      <div className={styles.shows}>
        {shows.map((show: FavouriteShow) => {
          return (
            <div key={show._id}>
              <LiveShow show={show} isFavourite={true} />
              <UnFavouriteShowButton broadcastName={show.broadcastName} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
