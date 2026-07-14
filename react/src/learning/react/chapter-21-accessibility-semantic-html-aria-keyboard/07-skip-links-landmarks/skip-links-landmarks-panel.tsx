export function SkipLinksLandmarksPanel() {
  return (
    <section className="a11y-card" aria-labelledby="skip-links-title">
      <p className="a11y-card-kicker">9.7</p>
      <h3 id="skip-links-title">Skip links and landmarks</h3>
      <p>
        Skip links and landmark elements give keyboard and assistive technology users a
        faster route to the page region they need.
      </p>
      <a className="a11y-skip-link-demo" href="#chapter-21-demo-main">
        Skip to demo main content
      </a>
      <header className="a11y-landmark-demo">Header region</header>
      <nav className="a11y-landmark-demo" aria-label="Demo navigation">
        Navigation region
      </nav>
      <main className="a11y-landmark-demo" id="chapter-21-demo-main" tabIndex={-1}>
        Main landmark target
      </main>
      <aside className="a11y-landmark-demo">Related controls</aside>
    </section>
  )
}
