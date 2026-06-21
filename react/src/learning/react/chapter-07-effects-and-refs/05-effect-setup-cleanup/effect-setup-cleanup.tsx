import { useEffect, useState } from 'react'

export function EffectSetupCleanup() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    function handleOnline(): void {
      setIsOnline(true)
    }

    function handleOffline(): void {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <section className="practice-card">
      <p className="practice-label">Setup and cleanup</p>
      <h3>Subscribe to browser connectivity</h3>
      <p className={isOnline ? 'status-positive' : 'status-negative'}>
        Browser status: {isOnline ? 'Online' : 'Offline'}
      </p>
    </section>
  )
}
