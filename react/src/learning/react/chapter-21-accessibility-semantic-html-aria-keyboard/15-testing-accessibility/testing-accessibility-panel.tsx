export function TestingAccessibilityPanel() {
  return (
    <section className="a11y-card" aria-labelledby="testing-accessibility-title">
      <p className="a11y-card-kicker">9.15</p>
      <h3 id="testing-accessibility-title">Testing accessibility</h3>
      <p>
        Tests should use user-facing roles, accessible names, keyboard interaction, focus,
        and ARIA state. They should not assert implementation class names or fake screen
        reader output.
      </p>
      <article className="a11y-code-card">
        <h4>Test evidence shape</h4>
        <code>screen.getByRole(&apos;button&apos;, &#123; name: /open/i &#125;)</code>
        <code>await user.keyboard(&apos;&#123;Escape&#125;&apos;)</code>
        <code>expect(closeButton).toHaveFocus()</code>
      </article>
    </section>
  )
}
