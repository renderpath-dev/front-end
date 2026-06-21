import { useMemo, useState } from 'react'
import { performanceOrders, performanceProducts } from './sellerhub-performance-data'

function calculateDashboardMetric(sampleSize: number) {
  let checksum = 0

  for (let index = 0; index < sampleSize * 20_000; index += 1) {
    checksum = (checksum + index + performanceOrders.length) % 4_009
  }

  const revenue = performanceOrders
    .slice(0, sampleSize)
    .reduce((total, order) => total + order.total, 0)
  const lowInventory = performanceProducts.filter((product) => product.inventory < 10).length

  return { checksum, lowInventory, revenue }
}

export default function DashboardPerformancePage() {
  const [sampleSize, setSampleSize] = useState(12)
  const [noteDraft, setNoteDraft] = useState('')
  const metric = useMemo(() => calculateDashboardMetric(sampleSize), [sampleSize])

  return (
    <section>
      <div className="sellerhub-performance-heading">
        <div>
          <p>Lazy route page</p>
          <h3>Dashboard metric calculation</h3>
        </div>
        <code>checksum {metric.checksum}</code>
      </div>
      <label className="performance-field">
        <span>Order sample size: {sampleSize}</span>
        <input
          max="30"
          min="4"
          onChange={(event) => setSampleSize(Number(event.currentTarget.value))}
          type="range"
          value={sampleSize}
        />
      </label>
      <label className="performance-field">
        <span>Unrelated dashboard note</span>
        <input onChange={(event) => setNoteDraft(event.currentTarget.value)} value={noteDraft} />
      </label>
      <div className="sellerhub-metric-grid">
        <article>
          <span>Sample revenue</span>
          <strong>${metric.revenue}</strong>
        </article>
        <article>
          <span>Low inventory products</span>
          <strong>{metric.lowInventory}</strong>
        </article>
      </div>
    </section>
  )
}
