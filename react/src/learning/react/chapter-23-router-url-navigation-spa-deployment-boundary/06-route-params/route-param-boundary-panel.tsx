import { parseSellerHubEntityId } from './route-param-parser'

export function RouteParamBoundaryPanel() {
  const validProduct = parseSellerHubEntityId('product-201')
  const invalidProduct = parseSellerHubEntityId('lamp')
  const missingProduct = parseSellerHubEntityId(undefined)

  return (
    <section className="route-lab-card" aria-labelledby="route-param-title">
      <p className="route-card-kicker">Part 6</p>
      <h2 id="route-param-title">Route params and missing entity boundary</h2>
      <p>
        Route params identify entities, but they enter the component as strings. TypeScript can
        describe the parser result; runtime code must still validate the URL value.
      </p>
      <ul className="route-list">
        <li>
          Valid param result: <code className="route-code">{validProduct.status}</code>
        </li>
        <li>
          Invalid param result: <code className="route-code">{invalidProduct.status}</code>
        </li>
        <li>
          Missing param result: <code className="route-code">{missingProduct.status}</code>
        </li>
      </ul>
    </section>
  )
}
