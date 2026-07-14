export function TestingFailureUiPanel() {
  return (
    <section className="recovery-card" aria-labelledby="testing-failure-ui-title">
      <p className="recovery-card-kicker">9.12</p>
      <h3 id="testing-failure-ui-title">Testing failure UI</h3>
      <p>
        Tests should trigger user-visible failure and recovery behavior, then assert by
        role, button name, and visible text instead of implementation class names.
      </p>
      <ol className="recovery-list">
        <li>Render a child that throws during render inside the boundary.</li>
        <li>Suppress expected React console noise only inside that test scope.</li>
        <li>Assert the fallback with role alert and recover with userEvent.</li>
        <li>Restore console spies before the test exits.</li>
      </ol>
      <article className="recovery-code-card">
        <h4>Assertion shape</h4>
        <code>screen.getByRole(&apos;alert&apos;)</code>
        <code>await user.click(screen.getByRole(&apos;button&apos;, name))</code>
      </article>
    </section>
  )
}
