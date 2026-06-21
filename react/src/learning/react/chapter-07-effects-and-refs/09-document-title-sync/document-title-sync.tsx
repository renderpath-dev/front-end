import { useEffect, useState } from 'react'

export function DocumentTitleSync() {
  const [openOrderCount, setOpenOrderCount] = useState(3)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `Orders (${openOrderCount})`

    return () => {
      document.title = previousTitle
    }
  }, [openOrderCount])

  return (
    <section className="practice-card">
      <p className="practice-label">Document synchronization</p>
      <h3>Keep the browser tab title current</h3>
      <p>Open orders: {openOrderCount}</p>
      <div className="button-row">
        <button onClick={() => setOpenOrderCount((currentCount) => currentCount + 1)}>
          Add order
        </button>
        <button onClick={() => setOpenOrderCount((currentCount) => Math.max(0, currentCount - 1))}>
          Resolve order
        </button>
      </div>
    </section>
  )
}
