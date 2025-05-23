import Link from 'next/link'
import styles from './page.module.css'

export default async function Favourites() {
  const res = await fetch('http://localhost:3000/api/shows/favourites', {
    method: 'GET',
  })
  const shows = await res.json()
  console.log(shows)

  return (
    <main className={styles.main}>
      <Link href="/">
        <h1>NTS</h1>
      </Link>
    </main>
  )
}
