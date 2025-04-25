import Image from 'next/image'
import Link from 'next/link'
import type { z } from 'zod'
import type { livePayload } from '../utils/schemas/live.ts'
import { getLive } from './api/shows/shows.ts'
import FavouriteShowButton from './button.tsx'
import styles from './page.module.css'

function findTimeDifference(startDate: number, endDate: number): number {
  const millis = Math.abs(endDate - startDate)
  const diff = Math.floor(millis / (1000 * 60))

  return diff
}

function caclulateTimeFromString(time: string): string {
  return new Date(Date.parse(time)).toLocaleTimeString()
}

export default async function Home() {
  const result = await getLive()
  const lives: z.infer<typeof livePayload>[] = await result.json()

  const dateNow = new Date()
  const dateNowStr = dateNow.toDateString()
  const timeNowStr = dateNow.toLocaleTimeString()

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>NTS</h1>
        <h3>
          {dateNowStr} - {timeNowStr}
        </h3>
        <Link href="/favourites">
          <h3>FAVOURITES</h3>
        </Link>
        {lives.map(live => {
          const startTimeDate = caclulateTimeFromString(live.startTime)
          const endTimeDate = caclulateTimeFromString(live.endTime)

          return (
            <div key={live.broadcastName}>
              <h3>{live.broadcastName}</h3>
              <h4>Broadcasting from {live.location}</h4>
              <p>
                {startTimeDate} to {endTimeDate} (ends in{' '}
                {findTimeDifference(Date.now(), Date.parse(live.endTime))}{' '}
                minutes!)
              </p>
              <Image src={live.picture} width={270} height={180} alt="piccy" />
              <p>{live.description}</p>
              {live.genres.length > 0 && (
                <details>
                  <summary>genres</summary>
                  <ul>
                    {live.genres.map((genre: Record<string, string>) => {
                      return <li key={genre.id}>{genre.value}</li>
                    })}
                  </ul>
                </details>
              )}
              <h4>social media</h4>
              <ul>
                {live.links.map((link: string) => {
                  return (
                    <a key={link} href={link}>
                      <li key={link}>{link}</li>
                    </a>
                  )
                })}
              </ul>
              <FavouriteShowButton {...live} />
            </div>
          )
        })}
      </main>
    </div>
  )
}
