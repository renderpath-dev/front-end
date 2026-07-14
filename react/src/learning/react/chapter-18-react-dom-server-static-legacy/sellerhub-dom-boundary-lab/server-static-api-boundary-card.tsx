import { serverStaticCards } from './sellerhub-dom-boundary-data'

export function ServerStaticApiBoundaryCard() {
  return (
    <section className="dom-boundary-card" aria-labelledby="server-static-boundary-title">
      <p className="dom-boundary-kicker">Server/static boundary</p>
      <h3 id="server-static-boundary-title">Server and static API boundary</h3>
      <p>
        This client lab does not run react-dom/server streaming, configure static prerender,
        or create a real SSR server.
      </p>
      <ul className="dom-boundary-list">
        {serverStaticCards.map((card) => (
          <li key={card.api}>
            <strong>{card.api}</strong>
            <span>{card.note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
