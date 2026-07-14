const decisionRows = [
  ['Catalog query', 'URL search params', 'It must be shareable and bookmarkable.'],
  ['Settings draft', 'Settings form component', 'It is private until submit.'],
  ['Orders data', 'Remote source plus request state', 'The client only has a snapshot.'],
  ['Dashboard collapse flag', 'Widget component', 'No sibling needs the value.'],
  ['Inventory feed', 'External store boundary', 'Updates may arrive outside React events.'],
] as const

export function StateOwnerDecisionTable() {
  return (
    <section className="state-lab-card state-lab-card-wide" aria-labelledby="owner-table-title">
      <p className="state-card-kicker">Final lab part 7</p>
      <h3 id="owner-table-title">State owner decision table</h3>
      <table className="state-table">
        <thead>
          <tr>
            <th scope="col">Value</th>
            <th scope="col">Owner</th>
            <th scope="col">Reason</th>
          </tr>
        </thead>
        <tbody>
          {decisionRows.map(([value, owner, reason]) => (
            <tr key={value}>
              <th scope="row">{value}</th>
              <td>{owner}</td>
              <td>{reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
