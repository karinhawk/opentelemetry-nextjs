import styles from "./page.module.css";
import {getLive} from "./api/hello/route.ts"
import { livePayload } from "../utils/schemas/live.ts";
import { z } from "zod";
import Image from 'next/image'

const findTimeDifference = (startDate: number, endDate: number): number => {
  const millis =Math.abs(endDate - startDate)
  const diff = Math.floor(millis / (1000 * 60)); 

  return diff
}

export default async function Home() {
  const result = await getLive()
  const lives: z.infer<typeof livePayload>[] = await result.json()
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>NTS Logger</h1>
        {lives.map((live) => {
          return (<div>
            <h3>{live.broadcastName}</h3>
            <Image
              src={live.picture}
              width={270}
              height={180}
              alt="piccy"
            />
            <p>{live.description}</p>
            <p>social media</p>
            <ul>
              {live.links.map((link: string, i: string) => {
                return <li id={i}>{link}</li>
              })}
            </ul>
            <p>started at: {live.startTime}</p>
            <p>ends at: {live.endTime} (in {findTimeDifference(Date.now(), Date.parse(live.endTime))} minutes!)</p>
            <button>Save Show</button>
          </div>
        )})}
      </main>
    </div>
  );
}
