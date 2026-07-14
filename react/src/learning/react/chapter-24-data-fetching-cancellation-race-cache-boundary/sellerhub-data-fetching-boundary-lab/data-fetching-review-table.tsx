const reviewRows = [
  ['Request owner', 'Criteria, request id, and abort controller are explicit'],
  ['Response parser', 'Unknown payload is checked before domain rendering'],
  ['Race guard', 'Only latest request can commit visible data'],
  ['Cache key', 'Resource identity includes seller, query, filter, sort, and cursor'],
  ['Server authority', 'Optimistic values stay pending until confirmation'],
]

export function DataFetchingReviewTable() {
  return (
    <section className="data-fetching-card" aria-labelledby="review-table-title">
      <h3 id="review-table-title">Data fetching review table</h3>
      <table>
        <thead>
          <tr>
            <th>Review point</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {reviewRows.map(([point, evidence]) => (
            <tr key={point}>
              <td>{point}</td>
              <td>{evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
