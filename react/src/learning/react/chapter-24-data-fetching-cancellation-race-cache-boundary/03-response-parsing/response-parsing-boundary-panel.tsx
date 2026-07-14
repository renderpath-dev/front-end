import { parseOrdersPayload } from './order-payload-parser'

export function ResponseParsingBoundaryPanel() {
  const parseResult = parseOrdersPayload({
    rows: [{ customer: 'Northwind Studio', id: 'order-501', status: 'paid', total: 248 }],
  })

  return (
    <section className="data-fetching-card" aria-labelledby="response-parsing-title">
      <p className="data-fetching-card__eyebrow">9.3</p>
      <h2 id="response-parsing-title">Runtime response parsing boundary</h2>
      <p>
        JSON arrives as unknown runtime data. TypeScript can describe the desired shape,
        but a parser must check missing fields, wrong types, and domain values.
      </p>
      <p>
        Parser result: <strong>{parseResult.type}</strong>.
      </p>
    </section>
  )
}
