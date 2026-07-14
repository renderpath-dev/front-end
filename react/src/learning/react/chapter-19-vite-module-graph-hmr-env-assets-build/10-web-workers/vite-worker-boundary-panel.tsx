import { useRef, useState } from 'react'
import SellerHubMetricWorker from './sellerhub-metric.worker?worker'
import type { WorkerMetricResponse } from './sellerhub-metric.worker'

export function ViteWorkerBoundaryPanel() {
  const workerRef = useRef<Worker | null>(null)
  const [metric, setMetric] = useState<WorkerMetricResponse | null>(null)
  const [status, setStatus] = useState('Worker not started')

  function runWorkerMetric() {
    workerRef.current?.terminate()

    const worker = new SellerHubMetricWorker()
    workerRef.current = worker
    worker.onmessage = (event: MessageEvent<WorkerMetricResponse>) => {
      setMetric(event.data)
      setStatus('Worker returned a metric result')
      worker.terminate()
      workerRef.current = null
    }
    worker.onerror = () => {
      setStatus('Worker failed in this runtime')
      worker.terminate()
      workerRef.current = null
    }
    worker.postMessage({ values: [12, 18, 30, 36] })
    setStatus('Worker computation requested')
  }

  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.10 worker</p>
      <h3>Web Worker and ?worker import</h3>
      <p>
        The worker module runs outside React state. React sends structured data through
        postMessage and receives a result through a message event.
      </p>
      <button className="vite-boundary-button" type="button" onClick={runWorkerMetric}>
        Run worker metric
      </button>
      <p aria-live="polite">{status}</p>
      {metric ? (
        <p className="vite-boundary-success">
          Worker total {metric.total}, average {metric.average}
        </p>
      ) : null}
    </article>
  )
}
