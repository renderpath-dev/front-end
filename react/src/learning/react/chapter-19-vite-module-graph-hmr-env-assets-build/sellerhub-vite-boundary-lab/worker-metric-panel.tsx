import { useEffect, useRef, useState } from 'react'
import SellerHubMetricWorker from '../10-web-workers/sellerhub-metric.worker?worker'
import type { WorkerMetricResponse } from '../10-web-workers/sellerhub-metric.worker'

export function WorkerMetricPanel() {
  const workerRef = useRef<Worker | null>(null)
  const [metric, setMetric] = useState<WorkerMetricResponse | null>(null)
  const [status, setStatus] = useState('Worker boundary ready')

  useEffect(() => {
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  function calculateMetrics() {
    workerRef.current?.terminate()

    const worker = new SellerHubMetricWorker()
    workerRef.current = worker
    worker.onmessage = (event: MessageEvent<WorkerMetricResponse>) => {
      setMetric(event.data)
      setStatus('Worker metric complete')
      worker.terminate()
      workerRef.current = null
    }
    worker.onerror = () => {
      setStatus('Worker metric failed in this runtime')
      worker.terminate()
      workerRef.current = null
    }
    worker.postMessage({ values: [42, 58, 63, 81] })
    setStatus('Worker metric requested')
  }

  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">Final lab</p>
      <h3>Worker metric panel</h3>
      <p>
        Worker computation crosses a message boundary. React state receives only the
        finished result.
      </p>
      <button className="vite-boundary-button" type="button" onClick={calculateMetrics}>
        Calculate worker metric
      </button>
      <p aria-live="polite">{status}</p>
      {metric ? (
        <p className="vite-boundary-success">
          Total {metric.total}; average {metric.average}
        </p>
      ) : null}
    </article>
  )
}
