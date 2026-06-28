import { lazy, Suspense, useEffect } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import './App.css'

const SudokuApp = lazy(() => import('./sudoku/App'))
const Chapter01PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-01-react-introduction/chapter-01-practice-root'
  ).then((module) => ({ default: module.Chapter01PracticeRoot })),
)
const Chapter02PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-02-jsx-and-components/chapter-02-practice-root'
  ).then((module) => ({ default: module.Chapter02PracticeRoot })),
)
const Chapter03PracticeRoot = lazy(() =>
  import('./learning/react/chapter-03-props-basics/chapter-03-practice-root').then(
    (module) => ({ default: module.Chapter03PracticeRoot }),
  ),
)
const Chapter04PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-04-state-and-events/chapter-04-practice-root'
  ).then((module) => ({ default: module.Chapter04PracticeRoot })),
)
const Chapter05PracticeRoot = lazy(() =>
  import('./learning/react/chapter-05-rendering-data/chapter-05-practice-root').then(
    (module) => ({ default: module.Chapter05PracticeRoot }),
  ),
)
const Chapter06PracticeRoot = lazy(() =>
  import('./learning/react/chapter-06-forms/chapter-06-practice-root').then(
    (module) => ({ default: module.Chapter06PracticeRoot }),
  ),
)
const Chapter07PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-07-effects-and-refs/chapter-07-practice-root'
  ).then((module) => ({ default: module.Chapter07PracticeRoot })),
)
const Chapter08PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-08-state-architecture/chapter-08-practice-root'
  ).then((module) => ({ default: module.Chapter08PracticeRoot })),
)
const Chapter09PracticeRoot = lazy(() =>
  import('./learning/react/chapter-09-async-data/chapter-09-practice-root').then(
    (module) => ({ default: module.Chapter09PracticeRoot }),
  ),
)
const Chapter10PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-10-routing-url-state/chapter-10-practice-root'
  ).then((module) => ({ default: module.Chapter10PracticeRoot })),
)
const Chapter11PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-11-performance-memoization/chapter-11-practice-root'
  ).then((module) => ({ default: module.Chapter11PracticeRoot })),
)
const Chapter12PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-12-testing-quality/chapter-12-practice-root'
  ).then((module) => ({ default: module.Chapter12PracticeRoot })),
)
const Chapter13PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-13-nextjs-ssr-rsc/chapter-13-practice-root'
  ).then((module) => ({ default: module.Chapter13PracticeRoot })),
)
const Chapter14PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice-root'
  ).then((module) => ({ default: module.Chapter14PracticeRoot })),
)
const Chapter15PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-15-production-frontend-architecture/chapter-15-practice-root'
  ).then((module) => ({ default: module.Chapter15PracticeRoot })),
)
const Chapter16PracticeRoot = lazy(() =>
  import(
    './learning/react/chapter-16-sellerhub-capstone/chapter-16-practice-root'
  ).then((module) => ({ default: module.Chapter16PracticeRoot })),
)

type PracticeEntry = {
  id: string
  group: 'Sudoku' | 'React'
  label: string
  title: string
  description: string
  href: string
  component: LazyExoticComponent<ComponentType>
  matchesPath: (pathname: string) => boolean
}

const practiceEntries: PracticeEntry[] = [
  {
    id: 'sudoku',
    group: 'Sudoku',
    label: 'Daily challenge',
    title: 'Daily Sudoku',
    description: 'State, events, derived rendering, and a browser-local leaderboard.',
    href: '/sudoku',
    component: SudokuApp,
    matchesPath: (pathname) => pathname === '/sudoku',
  },
  {
    id: 'react-01',
    group: 'React',
    label: 'Chapter 01',
    title: 'React Application Boundary and Tooling',
    description: 'Connect TypeScript, Vite, React, React DOM, and the browser root.',
    href: '/react/chapter-01',
    component: Chapter01PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-01',
  },
  {
    id: 'react-02',
    group: 'React',
    label: 'Chapter 02',
    title: 'JSX and Component Basics',
    description: 'Explore JSX values, attributes, children, and component composition.',
    href: '/react/chapter-02',
    component: Chapter02PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-02',
  },
  {
    id: 'react-03',
    group: 'React',
    label: 'Chapter 03',
    title: 'Props and Component Inputs',
    description: 'Trace JSX attributes into typed, readonly component inputs.',
    href: '/react/chapter-03',
    component: Chapter03PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-03',
  },
  {
    id: 'react-04',
    group: 'React',
    label: 'Chapter 04',
    title: 'State, Events, and Rendering',
    description: 'Follow events and state updates through render and commit.',
    href: '/react/chapter-04',
    component: Chapter04PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-04',
  },
  {
    id: 'react-05',
    group: 'React',
    label: 'Chapter 05',
    title: 'Lists, Keys, and Conditional Rendering',
    description: 'Render collections, preserve identity, and model UI branches.',
    href: '/react/chapter-05',
    component: Chapter05PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-05',
  },
  {
    id: 'react-06',
    group: 'React',
    label: 'Chapter 06',
    title: 'Forms and Controlled Components',
    description: 'Practice browser submission, controlled fields, validation, and types.',
    href: '/react/chapter-06',
    component: Chapter06PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-06',
  },
  {
    id: 'react-07',
    group: 'React',
    label: 'Chapter 07',
    title: 'Effects and Refs',
    description: 'Separate render work, events, references, and external synchronization.',
    href: '/react/chapter-07',
    component: Chapter07PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-07',
  },
  {
    id: 'react-08',
    group: 'React',
    label: 'Chapter 08',
    title: 'State Architecture, Reducer, Context, and Custom Hooks',
    description: 'Practice ownership, transitions, delivery boundaries, and reusable hooks.',
    href: '/react/chapter-08',
    component: Chapter08PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-08',
  },
  {
    id: 'react-09',
    group: 'React',
    label: 'Chapter 09',
    title: 'Async Data, Fetch Lifecycle, and UI State',
    description: 'Model request ownership, lifecycle states, guards, aborts, and races.',
    href: '/react/chapter-09',
    component: Chapter09PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-09',
  },
  {
    id: 'react-10',
    group: 'React',
    label: 'Chapter 10',
    title: 'Routing, URL State, and Navigation',
    description: 'Use the existing router exercises for routes, links, params, and URL state.',
    href: '/practice',
    component: Chapter10PracticeRoot,
    matchesPath: (pathname) =>
      /^\/(practice|catalog|seller|checkout|login|not-found)(\/|$)/.test(pathname),
  },
  {
    id: 'react-11',
    group: 'React',
    label: 'Chapter 11',
    title: 'Performance, Memoization, and Code Splitting',
    description: 'Measure rendering before applying memoization and lazy loading.',
    href: '/performance/practice',
    component: Chapter11PracticeRoot,
    matchesPath: (pathname) => /^\/performance(\/|$)/.test(pathname),
  },
  {
    id: 'react-12',
    group: 'React',
    label: 'Chapter 12',
    title: 'Testing, Quality Gates, and Frontend Engineering',
    description: 'Verify behavior with Vitest, Testing Library, MSW, and quality gates.',
    href: '/react/chapter-12',
    component: Chapter12PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-12',
  },
  {
    id: 'react-13',
    group: 'React',
    label: 'Chapter 13',
    title: 'Next.js App Router, SSR, Hydration, and Server Components',
    description: 'Map server and client boundaries without converting this Vite app.',
    href: '/react/chapter-13',
    component: Chapter13PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-13',
  },
  {
    id: 'react-14',
    group: 'React',
    label: 'Chapter 14',
    title: 'React 19 Actions, use API, and React Compiler',
    description: 'Practice Actions, optimistic UI, resource boundaries, and compiler readiness.',
    href: '/react/chapter-14',
    component: Chapter14PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-14',
  },
  {
    id: 'react-15',
    group: 'React',
    label: 'Chapter 15',
    title: 'Production Frontend Architecture, Design System, and Governance',
    description: 'Practice module, data, release, operations, and governance boundaries.',
    href: '/react/chapter-15',
    component: Chapter15PracticeRoot,
    matchesPath: (pathname) => pathname === '/react/chapter-15',
  },
  {
    id: 'react-16',
    group: 'React',
    label: 'Chapter 16',
    title: 'SellerHub Capstone and Production Feature Delivery',
    description: 'Deliver a routed SellerHub slice with tests, operations, and evidence.',
    href: '/react/chapter-16/catalog',
    component: Chapter16PracticeRoot,
    matchesPath: (pathname) => /^\/react\/chapter-16(\/|$)/.test(pathname),
  },
]

function App() {
  const pathname = normalizePathname(window.location.pathname)
  const selectedEntry = practiceEntries.find((entry) => entry.matchesPath(pathname))

  useEffect(() => {
    document.title = selectedEntry
      ? `${selectedEntry.label}: ${selectedEntry.title}`
      : 'React + TypeScript Learning Lab'
  }, [selectedEntry])

  if (selectedEntry) {
    const SelectedPractice = selectedEntry.component

    return (
      <>
        <a className="learning-return-link" href="/">
          Back to learning home
        </a>
        <Suspense fallback={<PracticeLoadingState title={selectedEntry.title} />}>
          <SelectedPractice />
        </Suspense>
      </>
    )
  }

  return <LearningHome />
}

function LearningHome() {
  const sudokuEntry = practiceEntries.find((entry) => entry.group === 'Sudoku')!
  const reactEntries = practiceEntries.filter((entry) => entry.group === 'React')

  return (
    <main className="learning-home-shell">
      <header className="learning-home-hero">
        <p className="learning-home-eyebrow">Runnable local workspace</p>
        <h1>React + TypeScript Learning Lab</h1>
        <p>
          Open the Daily Sudoku app or jump directly into any completed React chapter
          practice root.
        </p>
        <div className="learning-home-summary" aria-label="Available learning entries">
          <span>1 application</span>
          <span>16 React chapters</span>
          <span>React 19 boundary lab</span>
        </div>
      </header>

      <section className="learning-home-section" aria-labelledby="application-entry-title">
        <div className="learning-home-section-heading">
          <p>Application practice</p>
          <h2 id="application-entry-title">Sudoku</h2>
        </div>
        <PracticeCard entry={sudokuEntry} featured />
      </section>

      <section className="learning-home-section" aria-labelledby="react-entry-title">
        <div className="learning-home-section-heading">
          <p>Chapter practice</p>
          <h2 id="react-entry-title">React</h2>
        </div>
        <div className="learning-home-grid">
          {reactEntries.map((entry) => (
            <PracticeCard entry={entry} key={entry.id} />
          ))}
        </div>
      </section>
    </main>
  )
}

function PracticeCard({ entry, featured = false }: { entry: PracticeEntry; featured?: boolean }) {
  return (
    <a
      className={`learning-home-card${featured ? ' learning-home-card-featured' : ''}`}
      href={entry.href}
    >
      <span className="learning-home-card-label">{entry.label}</span>
      <h3>{entry.title}</h3>
      <p>{entry.description}</p>
      <strong aria-hidden="true">Open practice <span>→</span></strong>
    </a>
  )
}

function PracticeLoadingState({ title }: { title: string }) {
  return (
    <main className="learning-loading-state">
      <p>Loading {title}...</p>
    </main>
  )
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

export default App
