"use client"

import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (!isRunning && interval) {
      clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className={styles.main}>
      <div className={styles.timerContainer}>
        <h1 className={styles.timer}>{formatTime(time)}</h1>
        <div className={styles.controls}>
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => { setTime(0); setIsRunning(false) }}>Reset</button>
        </div>
      </div>
    </main>
  )
}

