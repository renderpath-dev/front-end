import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export type LearningEntry = {
  id: string
  group: 'Sudoku' | 'React'
  label: string
  title: string
  description: string
  href: string
  routePaths: readonly string[]
  component: LazyExoticComponent<ComponentType>
  matchesPath: (pathname: string) => boolean
  showInTutorial: boolean
  docsSlug?: string
}

export type TutorialEntry = LearningEntry & { docsSlug: string }

const SudokuApp = lazy(() => import('../../sudoku/App'))
const Chapter01PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-01-react-introduction/chapter-01-practice-root'
  ).then((module) => ({ default: module.Chapter01PracticeRoot })),
)
const Chapter02PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-02-jsx-and-components/chapter-02-practice-root'
  ).then((module) => ({ default: module.Chapter02PracticeRoot })),
)
const Chapter03PracticeRoot = lazy(() =>
  import('../../learning/react/chapter-03-props-basics/chapter-03-practice-root').then(
    (module) => ({ default: module.Chapter03PracticeRoot }),
  ),
)
const Chapter04PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-04-state-and-events/chapter-04-practice-root'
  ).then((module) => ({ default: module.Chapter04PracticeRoot })),
)
const Chapter05PracticeRoot = lazy(() =>
  import('../../learning/react/chapter-05-rendering-data/chapter-05-practice-root').then(
    (module) => ({ default: module.Chapter05PracticeRoot }),
  ),
)
const Chapter06PracticeRoot = lazy(() =>
  import('../../learning/react/chapter-06-forms/chapter-06-practice-root').then(
    (module) => ({ default: module.Chapter06PracticeRoot })),
)
const Chapter07PracticeRoot = lazy(() =>
  import('../../learning/react/chapter-07-effects-and-refs/chapter-07-practice-root').then(
    (module) => ({ default: module.Chapter07PracticeRoot }),
  ),
)
const Chapter08PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-08-state-architecture/chapter-08-practice-root'
  ).then((module) => ({ default: module.Chapter08PracticeRoot })),
)
const Chapter09PracticeRoot = lazy(() =>
  import('../../learning/react/chapter-09-async-data/chapter-09-practice-root').then(
    (module) => ({ default: module.Chapter09PracticeRoot })),
)
const Chapter10PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-10-routing-url-state/chapter-10-practice-root'
  ).then((module) => ({ default: module.Chapter10PracticeRoot })),
)
const Chapter11PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-11-performance-memoization/chapter-11-practice-root'
  ).then((module) => ({ default: module.Chapter11PracticeRoot })),
)
const Chapter12PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-12-testing-quality/chapter-12-practice-root'
  ).then((module) => ({ default: module.Chapter12PracticeRoot })),
)
const Chapter13PracticeRoot = lazy(() =>
  import('../../learning/react/chapter-13-nextjs-ssr-rsc/chapter-13-practice-root').then(
    (module) => ({ default: module.Chapter13PracticeRoot }),
  ),
)
const Chapter14PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-14-react-19-actions-compiler/chapter-14-practice-root'
  ).then((module) => ({ default: module.Chapter14PracticeRoot })),
)
const Chapter15PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-15-production-frontend-architecture/chapter-15-practice-root'
  ).then((module) => ({ default: module.Chapter15PracticeRoot })),
)
const Chapter16PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-16-sellerhub-capstone/chapter-16-practice-root'
  ).then((module) => ({ default: module.Chapter16PracticeRoot })),
)
const Chapter17PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-17-official-api-gaps/chapter-17-practice-root'
  ).then((module) => ({ default: module.Chapter17PracticeRoot })),
)
const Chapter18PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-18-react-dom-server-static-legacy/chapter-18-practice-root'
  ).then((module) => ({ default: module.Chapter18PracticeRoot })),
)
const Chapter19PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-19-vite-module-graph-hmr-env-assets-build/chapter-19-practice-root'
  ).then((module) => ({ default: module.Chapter19PracticeRoot })),
)
const Chapter20PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-20-error-boundaries-recovery-failure-handling/chapter-20-practice-root'
  ).then((module) => ({ default: module.Chapter20PracticeRoot })),
)
const Chapter21PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-21-accessibility-semantic-html-aria-keyboard/chapter-21-practice-root'
  ).then((module) => ({ default: module.Chapter21PracticeRoot })),
)
const Chapter22PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-22-state-architecture-server-url-form-boundary/chapter-22-practice-root'
  ).then((module) => ({ default: module.Chapter22PracticeRoot })),
)
const Chapter23PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-23-router-url-navigation-spa-deployment-boundary/chapter-23-practice-root'
  ).then((module) => ({ default: module.Chapter23PracticeRoot })),
)
const Chapter24PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-24-data-fetching-cancellation-race-cache-boundary/chapter-24-practice-root'
  ).then((module) => ({ default: module.Chapter24PracticeRoot })),
)
const Chapter25PracticeRoot = lazy(() =>
  import(
    '../../learning/react/chapter-25-deployment-observability-runtime-error-performance-release-gate/chapter-25-practice-root'
  ).then((module) => ({ default: module.Chapter25PracticeRoot })),
)

const exactPath = (expectedPath: string) => (pathname: string) =>
  normalizePathname(pathname) === expectedPath

export const sudokuEntry: LearningEntry = {
  id: 'sudoku',
  group: 'Sudoku',
  label: 'Daily challenge',
  title: 'Daily Sudoku',
  description: 'State, events, derived rendering, and a browser-local leaderboard.',
  href: '/sudoku',
  routePaths: ['/sudoku'],
  component: SudokuApp,
  matchesPath: exactPath('/sudoku'),
  showInTutorial: false,
}

export const chapterEntries: LearningEntry[] = [
  {
    id: 'react-01',
    group: 'React',
    label: 'Chapter 01',
    title: 'React Application Boundary and Tooling',
    description: 'Connect TypeScript, Vite, React, React DOM, and the browser root.',
    href: '/react/chapter-01',
    routePaths: ['/react/chapter-01'],
    component: Chapter01PracticeRoot,
    matchesPath: exactPath('/react/chapter-01'),
    showInTutorial: true,
    docsSlug: 'chapter-01-react-introduction',
  },
  {
    id: 'react-02',
    group: 'React',
    label: 'Chapter 02',
    title: 'JSX and Component Basics',
    description: 'Explore JSX values, attributes, children, and component composition.',
    href: '/react/chapter-02',
    routePaths: ['/react/chapter-02'],
    component: Chapter02PracticeRoot,
    matchesPath: exactPath('/react/chapter-02'),
    showInTutorial: true,
    docsSlug: 'chapter-02-jsx-and-components',
  },
  {
    id: 'react-03',
    group: 'React',
    label: 'Chapter 03',
    title: 'Props and Component Inputs',
    description: 'Trace JSX attributes into typed, readonly component inputs.',
    href: '/react/chapter-03',
    routePaths: ['/react/chapter-03'],
    component: Chapter03PracticeRoot,
    matchesPath: exactPath('/react/chapter-03'),
    showInTutorial: true,
    docsSlug: 'chapter-03-props-basics',
  },
  {
    id: 'react-04',
    group: 'React',
    label: 'Chapter 04',
    title: 'State, Events, and Rendering',
    description: 'Follow events and state updates through render and commit.',
    href: '/react/chapter-04',
    routePaths: ['/react/chapter-04'],
    component: Chapter04PracticeRoot,
    matchesPath: exactPath('/react/chapter-04'),
    showInTutorial: true,
    docsSlug: 'chapter-04-state-and-events',
  },
  {
    id: 'react-05',
    group: 'React',
    label: 'Chapter 05',
    title: 'Lists, Keys, and Conditional Rendering',
    description: 'Render collections, preserve identity, and model UI branches.',
    href: '/react/chapter-05',
    routePaths: ['/react/chapter-05'],
    component: Chapter05PracticeRoot,
    matchesPath: exactPath('/react/chapter-05'),
    showInTutorial: true,
    docsSlug: 'chapter-05-rendering-data',
  },
  {
    id: 'react-06',
    group: 'React',
    label: 'Chapter 06',
    title: 'Forms and Controlled Components',
    description: 'Practice browser submission, controlled fields, validation, and types.',
    href: '/react/chapter-06',
    routePaths: ['/react/chapter-06'],
    component: Chapter06PracticeRoot,
    matchesPath: exactPath('/react/chapter-06'),
    showInTutorial: true,
    docsSlug: 'chapter-06-forms',
  },
  {
    id: 'react-07',
    group: 'React',
    label: 'Chapter 07',
    title: 'Effects and Refs',
    description: 'Separate render work, events, references, and external synchronization.',
    href: '/react/chapter-07',
    routePaths: ['/react/chapter-07'],
    component: Chapter07PracticeRoot,
    matchesPath: exactPath('/react/chapter-07'),
    showInTutorial: true,
    docsSlug: 'chapter-07-effects-and-refs',
  },
  {
    id: 'react-08',
    group: 'React',
    label: 'Chapter 08',
    title: 'State Architecture, Reducer, Context, and Custom Hooks',
    description: 'Practice ownership, transitions, delivery boundaries, and reusable hooks.',
    href: '/react/chapter-08',
    routePaths: ['/react/chapter-08'],
    component: Chapter08PracticeRoot,
    matchesPath: exactPath('/react/chapter-08'),
    showInTutorial: true,
    docsSlug: 'chapter-08-state-architecture',
  },
  {
    id: 'react-09',
    group: 'React',
    label: 'Chapter 09',
    title: 'Async Data, Fetch Lifecycle, and UI State',
    description: 'Model request ownership, lifecycle states, guards, aborts, and races.',
    href: '/react/chapter-09',
    routePaths: ['/react/chapter-09'],
    component: Chapter09PracticeRoot,
    matchesPath: exactPath('/react/chapter-09'),
    showInTutorial: true,
    docsSlug: 'chapter-09-async-data',
  },
  {
    id: 'react-10',
    group: 'React',
    label: 'Chapter 10',
    title: 'Routing, URL State, and Navigation',
    description: 'Use the existing router exercises for routes, links, params, and URL state.',
    href: '/practice',
    routePaths: [
      '/practice/*',
      '/catalog/*',
      '/seller/*',
      '/checkout/*',
      '/login/*',
      '/not-found/*',
    ],
    component: Chapter10PracticeRoot,
    matchesPath: (pathname) =>
      /^\/(practice|catalog|seller|checkout|login|not-found)(\/|$)/.test(pathname),
    showInTutorial: true,
    docsSlug: 'chapter-10-routing-url-state',
  },
  {
    id: 'react-11',
    group: 'React',
    label: 'Chapter 11',
    title: 'Performance, Memoization, and Code Splitting',
    description: 'Measure rendering before applying memoization and lazy loading.',
    href: '/react/chapter-11/practice',
    routePaths: ['/react/chapter-11/*'],
    component: Chapter11PracticeRoot,
    matchesPath: (pathname) => /^\/react\/chapter-11(\/|$)/.test(pathname),
    showInTutorial: true,
    docsSlug: 'chapter-11-performance-memoization',
  },
  {
    id: 'react-12',
    group: 'React',
    label: 'Chapter 12',
    title: 'Testing, Quality Gates, and Frontend Engineering',
    description: 'Verify behavior with Vitest, Testing Library, MSW, and quality gates.',
    href: '/react/chapter-12',
    routePaths: ['/react/chapter-12'],
    component: Chapter12PracticeRoot,
    matchesPath: exactPath('/react/chapter-12'),
    showInTutorial: true,
    docsSlug: 'chapter-12-testing-quality',
  },
  {
    id: 'react-13',
    group: 'React',
    label: 'Chapter 13',
    title: 'Next.js App Router, SSR, Hydration, and Server Components',
    description: 'Map server and client boundaries without converting this Vite app.',
    href: '/react/chapter-13',
    routePaths: ['/react/chapter-13'],
    component: Chapter13PracticeRoot,
    matchesPath: exactPath('/react/chapter-13'),
    showInTutorial: true,
    docsSlug: 'chapter-13-nextjs-ssr-rsc',
  },
  {
    id: 'react-14',
    group: 'React',
    label: 'Chapter 14',
    title: 'React 19 Actions, use API, and React Compiler',
    description: 'Practice Actions, optimistic UI, resource boundaries, and compiler readiness.',
    href: '/react/chapter-14',
    routePaths: ['/react/chapter-14'],
    component: Chapter14PracticeRoot,
    matchesPath: exactPath('/react/chapter-14'),
    showInTutorial: true,
    docsSlug: 'chapter-14-react-19-actions-compiler',
  },
  {
    id: 'react-15',
    group: 'React',
    label: 'Chapter 15',
    title: 'Production Frontend Architecture, Design System, and Governance',
    description: 'Practice module, data, release, operations, and governance boundaries.',
    href: '/react/chapter-15',
    routePaths: ['/react/chapter-15'],
    component: Chapter15PracticeRoot,
    matchesPath: exactPath('/react/chapter-15'),
    showInTutorial: true,
    docsSlug: 'chapter-15-production-frontend-architecture',
  },
  {
    id: 'react-16',
    group: 'React',
    label: 'Chapter 16',
    title: 'SellerHub Capstone and Production Feature Delivery',
    description: 'Deliver a routed SellerHub slice with tests, operations, and evidence.',
    href: '/react/chapter-16/catalog',
    routePaths: ['/react/chapter-16/*'],
    component: Chapter16PracticeRoot,
    matchesPath: (pathname) => /^\/react\/chapter-16(\/|$)/.test(pathname),
    showInTutorial: true,
    docsSlug: 'chapter-16-sellerhub-capstone',
  },
  {
    id: 'react-17',
    group: 'React',
    label: 'Chapter 17',
    title: 'React Official API Gaps, Escape Hatches, and External Store Boundary',
    description: 'Practice remaining official React APIs and mark server boundaries honestly.',
    href: '/react/chapter-17',
    routePaths: ['/react/chapter-17'],
    component: Chapter17PracticeRoot,
    matchesPath: exactPath('/react/chapter-17'),
    showInTutorial: false,
  },
  {
    id: 'react-18',
    group: 'React',
    label: 'Chapter 18',
    title: 'React DOM, Server / Static APIs, and Legacy API Reading',
    description: 'Map DOM APIs, client roots, server/static boundaries, and legacy migrations.',
    href: '/react/chapter-18',
    routePaths: ['/react/chapter-18'],
    component: Chapter18PracticeRoot,
    matchesPath: exactPath('/react/chapter-18'),
    showInTutorial: false,
  },
  {
    id: 'react-19',
    group: 'React',
    label: 'Chapter 19',
    title: 'Vite, Module Graph, HMR, Env, Assets, and Production Build',
    description: 'Map Vite tooling, env, assets, HMR, module graph, and build boundaries.',
    href: '/react/chapter-19',
    routePaths: ['/react/chapter-19'],
    component: Chapter19PracticeRoot,
    matchesPath: exactPath('/react/chapter-19'),
    showInTutorial: false,
  },
  {
    id: 'react-20',
    group: 'React',
    label: 'Chapter 20',
    title: 'Error Boundaries, Recovery UI, and Failure Handling',
    description: 'Practice render failure isolation, fallback UI, reset, retry, logging, and testing.',
    href: '/react/chapter-20',
    routePaths: ['/react/chapter-20'],
    component: Chapter20PracticeRoot,
    matchesPath: exactPath('/react/chapter-20'),
    showInTutorial: false,
  },
  {
    id: 'react-21',
    group: 'React',
    label: 'Chapter 21',
    title: 'Accessibility, Semantic HTML, ARIA, and Keyboard Interaction',
    description:
      'Practice semantic HTML, accessible names, keyboard behavior, focus management, live regions, dialogs, and accessibility tests.',
    href: '/react/chapter-21',
    routePaths: ['/react/chapter-21'],
    component: Chapter21PracticeRoot,
    matchesPath: exactPath('/react/chapter-21'),
    showInTutorial: false,
  },
  {
    id: 'react-22',
    group: 'React',
    label: 'Chapter 22',
    title: 'State Architecture, Server State, URL State, and Form State Boundary',
    description:
      'Practice state ownership, derived values, URL state, request lifecycle state, form draft state, optimistic rollback, external store boundaries, and SellerHub review evidence.',
    href: '/react/chapter-22',
    routePaths: ['/react/chapter-22'],
    component: Chapter22PracticeRoot,
    matchesPath: exactPath('/react/chapter-22'),
    showInTutorial: false,
  },
  {
    id: 'react-23',
    group: 'React',
    label: 'Chapter 23',
    title: 'Router, URL Design, Navigation State, and SPA Deployment Boundary',
    description:
      'Practice URL ownership, route matching, navigation state, route identity, accessibility evidence, and static SPA deployment boundaries.',
    href: '/react/chapter-23',
    routePaths: ['/react/chapter-23'],
    component: Chapter23PracticeRoot,
    matchesPath: exactPath('/react/chapter-23'),
    showInTutorial: false,
  },
  {
    id: 'react-24',
    group: 'React',
    label: 'Chapter 24',
    title: 'Data Fetching, Cancellation, Race Condition, and Cache Boundary',
    description:
      'Practice request lifecycle, cancellation, stale response guards, parsing, cache keys, dedupe, pagination, optimistic rollback, and framework data-fetching boundaries.',
    href: '/react/chapter-24',
    routePaths: ['/react/chapter-24'],
    component: Chapter24PracticeRoot,
    matchesPath: exactPath('/react/chapter-24'),
    showInTutorial: false,
  },
  {
    id: 'react-25',
    group: 'React',
    label: 'Chapter 25',
    title: 'Deployment Observability, Runtime Error, Performance Evidence, and Release Gate',
    description:
      'Practice build evidence, runtime diagnostics, performance evidence, Web Vitals boundaries, release gates, rollback, and SellerHub release readiness review.',
    href: '/react/chapter-25',
    routePaths: ['/react/chapter-25'],
    component: Chapter25PracticeRoot,
    matchesPath: exactPath('/react/chapter-25'),
    showInTutorial: false,
  },
]

export const tutorialEntries = chapterEntries.filter(
  (entry): entry is TutorialEntry => entry.showInTutorial && typeof entry.docsSlug === 'string',
)
export const practiceEntries = [sudokuEntry, ...chapterEntries]

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}
