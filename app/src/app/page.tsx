'use client'
import styles from "./page.module.css";
import {getLive, getSearchin} from "./api/hello/route.ts"
import React, {useState} from "react";



export default function Home() {
  const [message, setMessage] = useState(null)

  const hiThere = async () => {
    const result = await getLive()
    const results = await result.json()
    console.log(results)
    setMessage(results)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>NTS Logger</h1>
        <button onClick={hiThere}>hi</button>
        {message && 
        <div>
          
          </div>}
      </main>
    </div>
  );
}
