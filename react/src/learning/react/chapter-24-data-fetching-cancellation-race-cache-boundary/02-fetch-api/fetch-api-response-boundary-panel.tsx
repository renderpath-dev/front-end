import { classifyHttpResponseStatus } from './http-response-model'

export function FetchApiResponseBoundaryPanel() {
  const response = new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
  const result = classifyHttpResponseStatus(response, { ok: true })

  return (
    <section className="data-fetching-card" aria-labelledby="fetch-api-boundary-title">
      <p className="data-fetching-card__eyebrow">9.2</p>
      <h2 id="fetch-api-boundary-title">Fetch API and Response boundary</h2>
      <p>
        Fetch separates network failure from HTTP status. A response with status 404
        still resolves, so the UI must inspect response.ok before trusting the body.
      </p>
      <p>
        Demo response model: <strong>{result.type}</strong> with status{' '}
        <strong>{result.status}</strong>.
      </p>
    </section>
  )
}
