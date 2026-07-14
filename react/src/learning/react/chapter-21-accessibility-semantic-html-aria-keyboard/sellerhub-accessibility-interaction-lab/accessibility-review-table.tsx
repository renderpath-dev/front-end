import { accessibilityReviewItems } from './sellerhub-accessibility-data'

export function AccessibilityReviewTable() {
  return (
    <section className="a11y-card a11y-card-wide" aria-labelledby="review-table-title">
      <h3 id="review-table-title">Accessibility review table</h3>
      <p>
        Review evidence should connect semantic output, keyboard behavior, focus behavior,
        and tests. Automated checks are useful but incomplete.
      </p>
      <div className="a11y-table-scroll">
        <table>
          <caption>SellerHub accessibility review evidence</caption>
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col">Requirement</th>
              <th scope="col">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {accessibilityReviewItems.map((item) => (
              <tr key={item.area}>
                <th scope="row">{item.area}</th>
                <td>{item.requirement}</td>
                <td>{item.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
