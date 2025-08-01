import type { FavouriteShow } from "../api/shows/favourites/route";
import { UnFavouriteShowButton } from "../button";
import { LiveShow } from "../live_show";
import { type GenreItem, GenreSelect } from "../select";
import styles from "./page.module.css";
import { SearchBar } from "../search";

export default async function Favourites({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { genre, search } = await searchParams;
  let urlPathSuffix: string;

  if (typeof genre === "string") {
    urlPathSuffix = `/genre?genre=${genre}`;
  } else if (typeof search === "string") {
    urlPathSuffix = `/search?search=${search}`;
  } else {
    urlPathSuffix = "";
  }

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
      <div className={styles.content}>
        <h2>Favourite Shows</h2>
        <div className={styles.inputs}>
          <SearchBar />
          {genres && <GenreSelect {...genres} />}
        </div>
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
      </div>
    </main>
  );
}
