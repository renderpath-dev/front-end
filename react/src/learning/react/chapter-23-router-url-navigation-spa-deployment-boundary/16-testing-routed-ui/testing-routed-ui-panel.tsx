export function TestingRoutedUiPanel() {
  return (
    <section className="route-lab-card" aria-labelledby="testing-routed-ui-title">
      <p className="route-card-kicker">Part 16</p>
      <h2 id="testing-routed-ui-title">Testing routed UI with MemoryRouter</h2>
      <p>
        Routed UI tests should render the route tree with controlled initial entries and assert
        visible headings, links, redirects, and recovery UI rather than implementation objects.
      </p>
      <ul className="route-list">
        <li>Use MemoryRouter for isolated route history in tests.</li>
        <li>Use userEvent to click links and observe visible page changes.</li>
        <li>Use role and heading assertions instead of class name assertions.</li>
      </ul>
    </section>
  )
}
