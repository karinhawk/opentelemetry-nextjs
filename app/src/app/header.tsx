import Link from "next/link";
import styles from "./page.module.css";

export default async function Header() {
  const dateNow = new Date();
  const dateNowStr = dateNow.toDateString();
  const timeNowStr = dateNow
    .toLocaleTimeString("en-GB")
    .split(":")
    .slice(0, -1)
    .join(":");

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>NTS</h1>
      </Link>
      <h3>
        {dateNowStr} - {timeNowStr}
      </h3>
      <Link className={styles.favourites} href="/favourites">
        <h3>❤️ FAVOURITES ❤️</h3>
      </Link>
    </div>
  );
}
