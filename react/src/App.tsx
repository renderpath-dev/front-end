import { lazy, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router'
import type { LearningEntry } from './site/data/learning-manifest'
import {
  practiceEntries,
} from './site/data/learning-manifest'
import { ProductShell } from './site/components/ProductShell'
import { LandingPage } from './site/pages/LandingPage'
import { NotFoundPage } from './site/pages/NotFoundPage'
import './site/styles/site.css'

const GettingStartedPage = lazy(() =>
  import('./site/pages/GettingStartedPage').then((module) => ({
    default: module.GettingStartedPage,
  })),
)
const TutorialPage = lazy(() =>
  import('./site/pages/TutorialPage').then((module) => ({
    default: module.TutorialPage,
  })),
)
const DocsPage = lazy(() =>
  import('./site/pages/DocsPage').then((module) => ({
    default: module.DocsPage,
  })),
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProductShell />}>
          <Route index element={<LandingPage />} />
          <Route
            element={
              <RouteLoadingBoundary label="Getting Started">
                <GettingStartedPage />
              </RouteLoadingBoundary>
            }
            path="getting-started"
          />
          <Route
            element={
              <RouteLoadingBoundary label="Tutorial">
                <TutorialPage />
              </RouteLoadingBoundary>
            }
            path="tutorial"
          />
          <Route
            element={
              <RouteLoadingBoundary label="Docs">
                <DocsPage />
              </RouteLoadingBoundary>
            }
            path="docs"
          />
          <Route
            element={
              <RouteLoadingBoundary label="Chapter documentation">
                <DocsPage />
              </RouteLoadingBoundary>
            }
            path="docs/:chapterSlug"
          />
          <Route element={<NotFoundPage />} path="*" />
        </Route>

        {practiceEntries.flatMap((entry) =>
          entry.routePaths.map((routePath) => (
            <Route
              element={<PracticeApplication entry={entry} />}
              key={`${entry.id}:${routePath}`}
              path={routePath}
            />
          )),
        )}
      </Routes>
    </BrowserRouter>
  )
}

function PracticeApplication({ entry }: { entry: LearningEntry }) {
  useEffect(() => {
    document.title = `${entry.label}: ${entry.title}`
  }, [entry.label, entry.title])

  const SelectedPractice = entry.component

  return (
    <>
      <a className="learning-return-link" href="/">
        Back to learning home
      </a>
      <Suspense fallback={<PracticeLoadingState title={entry.title} />}>
        <SelectedPractice />
      </Suspense>
    </>
  )
}

function RouteLoadingBoundary({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <Suspense fallback={<ProductLoadingState label={label} />}>
      {children}
    </Suspense>
  )
}

function ProductLoadingState({ label }: { label: string }) {
  return (
    <section aria-live="polite" className="site-loading-state">
      <span className="site-loading-mark" aria-hidden="true" />
      <p>Loading {label}...</p>
    </section>
  )
}

function PracticeLoadingState({ title }: { title: string }) {
  const location = useLocation()

  return (
    <main className="learning-loading-state">
      <p>
        Loading {title} for <code>{location.pathname}</code>...
      </p>
    </main>
  )
}

export default App
