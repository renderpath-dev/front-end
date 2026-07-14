export function ServerStreamingBoundaryPanel() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.8 streaming server APIs</p>
      <h3>Node stream and Web stream rendering boundary</h3>
      <p>
        Streaming server APIs require response ownership, stream backpressure handling, and
        hydration scripts. A browser-only Vite page should show a boundary map, not a fake
        server stream.
      </p>
      <div className="dom-boundary-two-column">
        <div>
          <strong>Node stream</strong>
          <span>renderToPipeableStream and resumeToPipeableStream</span>
        </div>
        <div>
          <strong>Web stream</strong>
          <span>renderToReadableStream and resume</span>
        </div>
      </div>
    </article>
  )
}
