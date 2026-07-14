const stateOwnerRows = [
  ['Catalog text input', 'Catalog form draft', 'Role query and typing test'],
  ['Catalog filters', 'URL search params', 'Codec test and navigation smoke test'],
  ['Selected product', 'Selected product id', 'Entity selection assertion'],
  ['Orders request', 'Request reducer', 'Reducer transition test'],
  ['Settings validation', 'Settings form owner', 'Role and error message test'],
  ['Inventory count', 'External store boundary', 'Boundary review note'],
] as const

export function SellerHubStateArchitectureMap() {
  return (
    <article className="state-card state-card-wide">
      <p className="state-card-kicker">9.17 SellerHub review</p>
      <h3>SellerHub state architecture mapping</h3>
      <table className="state-table">
        <thead>
          <tr>
            <th scope="col">Scenario</th>
            <th scope="col">Owner</th>
            <th scope="col">Evidence</th>
          </tr>
        </thead>
        <tbody>
          {stateOwnerRows.map(([scenario, owner, evidence]) => (
            <tr key={scenario}>
              <th scope="row">{scenario}</th>
              <td>{owner}</td>
              <td>{evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
