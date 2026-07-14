import { classifyAbortableRequestError, createAbortError } from './abortable-fetch-model'

export function AbortControllerPanel() {
  const errorKind = classifyAbortableRequestError(createAbortError())

  return (
    <section className="data-fetching-card" aria-labelledby="abort-controller-title">
      <p className="data-fetching-card__eyebrow">9.7</p>
      <h2 id="abort-controller-title">AbortController and AbortSignal</h2>
      <p>
        AbortController gives the client a cancellation signal for fetch and body
        consumption. It does not prove that server-side work stopped after the server
        received the request.
      </p>
      <p>
        Classified demo error: <strong>{errorKind}</strong>.
      </p>
    </section>
  )
}
