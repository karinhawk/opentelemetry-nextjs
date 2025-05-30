import Link from "next/link";
import type { FavouriteShow } from "../api/shows/favourites/route";
import { UnFavouriteShowButton } from "../button";
import styles from "./page.module.css";
import { LiveShow } from "../live_show";

export default async function Favourites() {
  const res = await fetch("http://localhost:3000/api/shows/favourites", {
    method: "GET",
  });
  const data = await res.json();
  console.log(data.shows);

  return (
    <main className={styles.main}>
      <Link href="/">
        <h1>NTS</h1>
      </Link>
      <h2>Favourite Shows</h2>
      {data.shows.map((show: FavouriteShow) => {
        return (
          <div key={show._id}>
            <LiveShow {...show} />
            <UnFavouriteShowButton broadcastName={show.broadcastName} />
          </div>
        );
      })}
    </main>
  );
}
