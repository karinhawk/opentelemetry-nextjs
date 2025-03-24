'use client'
import styles from "./page.module.css";
import {GET} from "./api/hello/route.ts"
import React, {useState} from "react";



export default function Home() {
  const [message, setMessage] = useState(null)

  const hiThere = async () => {
    const hi = await GET()
    setMessage(await hi.json())
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button onClick={hiThere}>hi</button>
        {message &&
        <div>{message}</div>
        }
      </main>
    </div>
  );
}
