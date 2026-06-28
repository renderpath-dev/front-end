import { createContext, use, useState } from 'react'

type ThemeName = 'light' | 'contrast'

const ThemeContext = createContext<ThemeName>('light')

const promiseBoundaryRows = [
  {
    source: 'Framework-created cached Promise',
    behavior: 'use(promise) can suspend and let Suspense show its fallback.',
    currentProject: 'Mechanism model only',
  },
  {
    source: 'Promise created during client render',
    behavior: 'A new identity can suspend again on every render.',
    currentProject: 'Do not use',
  },
  {
    source: 'Context object',
    behavior: 'use(context) reads the nearest provider and may be conditional.',
    currentProject: 'Runnable below',
  },
]

export function UseApiResourceBoundary() {
  const [theme, setTheme] = useState<ThemeName>('light')
  const [showTheme, setShowTheme] = useState(true)

  return (
    <section className="chapter14-panel" aria-labelledby="use-api-title">
      <p className="chapter14-kicker">9.7 use API</p>
      <h2 id="use-api-title">Context reading and cached Promise boundary</h2>
      <ThemeContext value={theme}>
        <div className="chapter14-action-row">
          <button
            className="chapter14-button"
            onClick={() =>
              setTheme((currentTheme) =>
                currentTheme === 'light' ? 'contrast' : 'light',
              )
            }
            type="button"
          >
            Toggle theme
          </button>
          <button
            className="chapter14-button"
            onClick={() => setShowTheme((currentValue) => !currentValue)}
            type="button"
          >
            Toggle context read
          </button>
        </div>
        <ThemeReader shouldRead={showTheme} />
      </ThemeContext>
      <div className="chapter14-table" role="table" aria-label="use resource boundaries">
        {promiseBoundaryRows.map((row) => (
          <div className="chapter14-table-row" key={row.source} role="row">
            <strong role="cell">{row.source}</strong>
            <span role="cell">{row.behavior}</span>
            <span role="cell">{row.currentProject}</span>
          </div>
        ))}
      </div>
      <p className="chapter14-note">
        This Vite project does not pretend to provide a framework-cached Promise source.
      </p>
    </section>
  )
}

function ThemeReader({ shouldRead }: { shouldRead: boolean }) {
  if (!shouldRead) {
    return <p className="chapter14-result">Context reading is skipped in this branch.</p>
  }

  const theme = use(ThemeContext)
  return <p className="chapter14-result">Nearest theme context: {theme}</p>
}
