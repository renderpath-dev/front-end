import { renderingStrategies } from './rendering-strategy-matrix'

export function RenderingStrategyPanel() {
  return (
    <section className="chapter13-panel" aria-labelledby="rendering-strategy-title">
      <p className="chapter13-kicker">Rendering strategies</p>
      <h2 id="rendering-strategy-title">SSR, SSG, ISR, dynamic rendering, and CSR own different moments</h2>
      <div className="chapter13-table" role="table" aria-label="Rendering strategies">
        <div role="row" className="chapter13-table-row chapter13-table-head">
          <span role="columnheader">Strategy</span>
          <span role="columnheader">First output</span>
          <span role="columnheader">SellerHub fit</span>
        </div>
        {renderingStrategies.map((strategy) => (
          <div role="row" className="chapter13-table-row" key={strategy.name}>
            <span role="cell">{strategy.name}</span>
            <span role="cell">{strategy.firstOutputOwner}</span>
            <span role="cell">{strategy.sellerHubFit}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
