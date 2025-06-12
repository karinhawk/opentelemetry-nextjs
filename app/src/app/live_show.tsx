import Image from 'next/image'
import type { Show } from '../utils/schemas/live'
import { caclulateTimeFromString, findTimeDifference } from '../utils/time'

export function LiveShow(props: Show) {
  const startTimeDate = caclulateTimeFromString(props.startTime)
  const endTimeDate = caclulateTimeFromString(props.endTime)

  return (
    <div key={props.broadcastName}>
      <h3>{props.broadcastName}</h3>
      <h4>Broadcasting from {props.location}</h4>
      <p>
        {startTimeDate} to {endTimeDate} (ends in{' '}
        {findTimeDifference(Date.now(), Date.parse(props.endTime))} minutes!)
      </p>
      <Image src={props.picture} width={270} height={180} alt="piccy" />
      <p>{props.description}</p>
      {props.genres.length > 0 && (
        <details>
          <summary>genres</summary>
          <ul>
            {props.genres.map((genre: Record<string, string>) => {
              return <li key={genre.id}>{genre.value}</li>
            })}
          </ul>
        </details>
      )}
      {props.links.length > 0 && (
        <div>
          <h4>social media</h4>
          <ul>
            {props.links.map((link: string) => {
              return (
                <a key={link} href={link} target="blank">
                  <li key={link}>{link}</li>
                </a>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
