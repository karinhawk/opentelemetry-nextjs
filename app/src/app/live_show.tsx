import Image from "next/image";
import type { Show } from "../utils/schemas/live";
import { caclulateTimeFromString, findTimeDifference } from "../utils/time";
import styles from "./live_show.module.css";

type LiveShowProps = {
  show: Show;
  isFavourite?: boolean;
};

export function LiveShow(props: LiveShowProps) {
  const { show, isFavourite = false } = props;
  const startTimeDate = caclulateTimeFromString(show.startTime);
  const endTimeDate = caclulateTimeFromString(show.endTime);

  return (
    <div className={styles.show} key={show.broadcastName}>
      <h3 className={styles.channel_name}>{show.broadcastName}</h3>
      <h4 className={styles.location}>Broadcasting from {show.location}</h4>
      {!isFavourite && (
        <p className={styles.time}>
          {startTimeDate} to {endTimeDate} (ends in{" "}
          {findTimeDifference(Date.now(), Date.parse(show.endTime))} minutes!)
        </p>
      )}
      <Image
        className={styles.pic}
        src={show.picture}
        width={270}
        height={180}
        alt="piccy"
      />
      <p className={styles.desc}>{show.description}</p>
      {show.genres.length > 0 && (
        <details>
          <summary className={styles.list_heading}>genres</summary>
          <ul className={styles.list}>
            {show.genres.map((genre: Record<string, string>) => {
              return <li key={genre.id}>{genre.value}</li>;
            })}
          </ul>
        </details>
      )}
      {show.links.length > 0 && (
        <div>
          <br />
          <h4 className={styles.list_heading}>social media</h4>
          <ul className={styles.list}>
            {show.links.map((link: string) => {
              return (
                <a key={link} href={link} target="blank">
                  <li key={link}>{link}</li>
                </a>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
