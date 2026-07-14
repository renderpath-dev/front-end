export type WorkerMetricRequest = {
  values: number[]
}

export type WorkerMetricResponse = {
  average: number
  total: number
}

self.onmessage = (event: MessageEvent<WorkerMetricRequest>) => {
  const values = event.data.values
  const total = values.reduce((sum, value) => sum + value, 0)
  const average = values.length === 0 ? 0 : total / values.length

  self.postMessage({ average, total } satisfies WorkerMetricResponse)
}

export {}
