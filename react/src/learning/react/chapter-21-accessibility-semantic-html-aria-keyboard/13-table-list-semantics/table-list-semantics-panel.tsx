export function TableListSemanticsPanel() {
  return (
    <section className="a11y-card" aria-labelledby="table-list-title">
      <p className="a11y-card-kicker">9.13</p>
      <h3 id="table-list-title">Data table and list semantics</h3>
      <p>
        Lists expose item groups. Tables expose row and column relationships. Do not
        replace static tabular data with div grids unless you need a real grid widget.
      </p>
      <ul>
        <li>Catalog filters</li>
        <li>Orders table</li>
        <li>Dashboard status</li>
      </ul>
      <div className="a11y-table-scroll">
        <table>
          <caption>Order count by status</caption>
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">
                <button type="button">Sort by count</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Ready</th>
              <td>18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
