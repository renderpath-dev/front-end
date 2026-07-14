import { Link } from 'react-router'
import { sudokuEntry, tutorialEntries } from '../data/learning-manifest'
import { usePageTitle } from '../hooks/use-page-title'
import { useViewportReveal } from '../hooks/use-viewport-reveal'

export function TutorialPage() {
  usePageTitle('Tutorial')
  const tutorialRevealRef = useViewportReveal<HTMLOListElement>()

  return (
    <div className="tutorial-page page-container">
      <header className="page-hero page-hero-compact">
        <h1>Tutorial</h1>
        <p>
          Open any chapter&apos;s runnable practice to inspect the mechanism, change the TSX,
          and observe the result in the browser.
        </p>
      </header>

      <section aria-labelledby="chapter-grid-title">
        <div className="section-heading section-heading-split">
          <div>
            <h2 id="chapter-grid-title">Sixteen structured chapters</h2>
            <p>The order follows the shared typed curriculum manifest.</p>
          </div>
          <Link className="text-link" to="/docs">
            Read chapter docs
          </Link>
        </div>
        <ol className="tutorial-grid" ref={tutorialRevealRef}>
          {tutorialEntries.map((entry, index) => (
            <li
              className="tutorial-card"
              data-reveal
              data-testid="tutorial-card"
              key={entry.id}
            >
              <a aria-describedby={`${entry.id}-description`} href={entry.href}>
                <span className="tutorial-card-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="tutorial-card-label">{entry.label}</span>
                <h3>{entry.title}</h3>
                <p id={`${entry.id}-description`}>{entry.description}</p>
                <strong>
                  Open practice
                  <OpenIcon />
                </strong>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="sudoku-entry" aria-labelledby="sudoku-entry-title">
        <SudokuMark />
        <div>
          <p>Separate application practice</p>
          <h2 id="sudoku-entry-title">{sudokuEntry.title}</h2>
          <span>{sudokuEntry.description}</span>
        </div>
        <a className="button button-secondary" href={sudokuEntry.href}>
          Play Daily Sudoku
          <OpenIcon />
        </a>
      </section>
    </div>
  )
}

function OpenIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7 4H4.5A1.5 1.5 0 0 0 3 5.5v10A1.5 1.5 0 0 0 4.5 17h10a1.5 1.5 0 0 0 1.5-1.5V13M11 3h6v6m0-6-8 8" />
    </svg>
  )
}

function SudokuMark() {
  return (
    <svg className="sudoku-mark" viewBox="0 0 64 64" aria-hidden="true">
      <rect height="54" rx="7" width="54" x="5" y="5" />
      <path d="M23 5v54M41 5v54M5 23h54M5 41h54" />
      <path d="M14 18v-8m-3 0h6M29 13h6l-6 6h6M47 10h5l-5 9h5" />
    </svg>
  )
}
