import { useEffect, useState } from 'react'

function InventoryPollingProcess() {
  const [pollCount, setPollCount] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPollCount((currentCount) => currentCount + 1)
    }, 1500)

    return () => window.clearInterval(intervalId)
  }, [])

  return <p>Completed polling cycles: {pollCount}</p>
}

export function TimerCleanup() {
  const [isPollingVisible, setIsPollingVisible] = useState(true)

  return (
    <section className="practice-card">
      <p className="practice-label">Timer cleanup</p>
      <h3>Stop a process when its owner leaves</h3>
      <button onClick={() => setIsPollingVisible((currentValue) => !currentValue)}>
        {isPollingVisible ? 'Unmount polling process' : 'Mount polling process'}
      </button>
      {isPollingVisible ? <InventoryPollingProcess /> : <p>Polling process is unmounted.</p>}
    </section>
  )
}
