import Image from "next/image";
import type { Show } from "../utils/schemas/live";
import { caclulateTimeFromString, findTimeDifference } from "../utils/time";

type LiveShowProps = {
  show: Show;
  isFavourite?: boolean;
};

export function LiveShow(props: LiveShowProps) {
  const { show, isFavourite = false } = props;
  const startTimeDate = caclulateTimeFromString(show.startTime);
  const endTimeDate = caclulateTimeFromString(show.endTime);

  return (
    <div key={show.broadcastName}>
      <h3>{show.broadcastName}</h3>
      <h4>Broadcasting from {show.location}</h4>
      {!isFavourite && (
        <p>
          {startTimeDate} to {endTimeDate} (ends in{" "}
          {findTimeDifference(Date.now(), Date.parse(show.endTime))} minutes!)
        </p>
      )}
      <Image src={show.picture} width={270} height={180} alt="piccy" />
      <p>{show.description}</p>
      {show.genres.length > 0 && (
        <details>
          <summary>genres</summary>
          <ul>
            {show.genres.map((genre: Record<string, string>) => {
              return <li key={genre.id}>{genre.value}</li>;
            })}
          </ul>
        </details>
      )}
      {show.links.length > 0 && (
        <div>
          <h4>social media</h4>
          <ul>
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
