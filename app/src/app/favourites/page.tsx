import Link from 'next/link'
import styles from './page.module.css'
import { UnFavouriteShowButton } from '../button'

type FavouriteShow = {
  _id: string,
  name: string
}

export default async function Favourites() {
  const res = await fetch('http://localhost:3000/api/shows/favourites', {
    method: 'GET',
  })
  const data = await res.json()
  console.log(data.shows)

  return (
    <main className={styles.main}>
      <Link href="/">
        <h1>NTS</h1>
        <h2>Favourite Shows</h2>
        {data.shows.map((show: FavouriteShow) => {
          return (
            <div>
            <h4>{show.name}</h4>
              <UnFavouriteShowButton show={show.name} />
            </div>
          )
        }) }
      </Link>
    </main>
  )
}
