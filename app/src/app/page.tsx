'use client'
import styles from "./page.module.css";
import {getLive, getSearchin} from "./api/hello/route.ts"
import React, {useState} from "react";



export default function Home() {
  const [message, setMessage] = useState({})

  const hiThere = async () => {
    const result = await getLive()
    const results = await result.json()
    setMessage(results.results)
    console.log(message)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button onClick={hiThere}>hi</button>
        {message &&
        <div><p>{message[0]["channel_name"]}</p></div>
        }
      </main>
    </div>
  );
}
