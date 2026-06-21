import { useEffect, useState } from 'react'

export function StaleClosureInterval() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1)
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="practice-card">
      <p className="practice-label">Closure boundary</p>
      <h3>Read previous state in the updater</h3>
      <p>Mounted for {elapsedSeconds} seconds.</p>
      <button onClick={() => setElapsedSeconds(0)}>Reset visible counter</button>
    </section>
  )
}
