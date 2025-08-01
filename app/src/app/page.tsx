import type { Show } from "../utils/schemas/live.ts";
import { getLive } from "./api/shows/shows.ts";
import {
  FavouriteShowButton,
  ListenToShowButton,
} from "./components/button.tsx";
import { LiveShow } from "./components/live_show.tsx";
import styles from "./page.module.css";

export default async function Home() {
  const result = await getLive();
  const lives: Show[] = await result.json();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.lives}>
          {lives.map((live) => {
            return (
              <div key={live.broadcastName}>
                <LiveShow show={live} />
                <ListenToShowButton channelName={live.channelName} />
                <FavouriteShowButton {...live} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
