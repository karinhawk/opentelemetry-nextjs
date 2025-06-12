import Link from 'next/link'
import type { Show } from '../utils/schemas/live.ts'
import { getLive } from './api/shows/shows.ts'
import { FavouriteShowButton, ListenToShowButton } from './button.tsx'
import { LiveShow } from './live_show.tsx'
import styles from './page.module.css'

export default async function Home() {
  const result = await getLive()
  const lives: Show[] = await result.json()

  const dateNow = new Date()
  const dateNowStr = dateNow.toDateString()
  const timeNowStr = dateNow
    .toLocaleTimeString('en-GB')
    .split(':')
    .slice(0, -1)
    .join(':')

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
          return (
            <div key={live.broadcastName}>
              <LiveShow {...live} />
              <ListenToShowButton channelName={live.channelName} />
              <FavouriteShowButton {...live} />
            </div>
          )
        })}
      </main>
    </div>
  )
}
