export function SemanticHtmlFirstPanel() {
  return (
    <section className="a11y-card" aria-labelledby="semantic-html-title">
      <p className="a11y-card-kicker">9.2</p>
      <h3 id="semantic-html-title">Semantic HTML first</h3>
      <p>
        Native elements carry role, name calculation, keyboard behavior, form submission,
        and table or list relationships before ARIA is considered.
      </p>
      <div className="a11y-example-pair">
        <article className="a11y-example-card">
          <h4>Correct action</h4>
          <button type="button">Archive selected orders</button>
        </article>
        <article className="a11y-example-card">
          <h4>Correct navigation</h4>
          <a href="/react/chapter-21">Open accessibility chapter</a>
        </article>
      </div>
      <ul>
        <li>Catalog</li>
        <li>Orders</li>
        <li>Dashboard</li>
      </ul>
      <table>
        <caption>Small semantic table example</caption>
        <tbody>
          <tr>
            <th scope="row">Ready orders</th>
            <td>18</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
