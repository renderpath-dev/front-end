import { Link } from 'react-router'
import { CodeWindow } from '../components/CodeWindow'
import { usePageTitle } from '../hooks/use-page-title'
import { useViewportReveal } from '../hooks/use-viewport-reveal'

const learningPathCode = `type ChapterStatus =
  | { kind: 'ready'; practiceRoute: string }
  | { kind: 'planned'; note: string }

type Chapter = {
  id: \`chapter-\${number}\`
  title: string
  status: ChapterStatus
}

const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'React application boundary',
    status: { kind: 'ready', practiceRoute: '/react/chapter-01' },
  },
  {
    id: 'chapter-2',
    title: 'JSX and components',
    status: { kind: 'ready', practiceRoute: '/react/chapter-02' },
  },
]

type LearningPathProps = {
  chapters: readonly Chapter[]
}

export function LearningPath({ chapters }: LearningPathProps) {
  return (
    <ol>
      {chapters.map((chapter) => (
        <li key={chapter.id}>
          <strong>{chapter.title}</strong>
          <span>{chapter.status.kind}</span>
        </li>
      ))}
    </ol>
  )
}`

const projectFacts = [
  '16 structured React chapters',
  'Runnable TSX practice',
  'React 19 coverage',
  'TypeScript + Vite tooling',
]

export function LandingPage() {
  usePageTitle()
  const workflowRevealRef = useViewportReveal<HTMLOListElement>()

  return (
    <div className="landing-page">
      <section className="landing-hero" aria-labelledby="landing-title">
        <TechnologyIcons />
        <h1 id="landing-title">Understand React from runtime to production.</h1>
        <p className="landing-hero-copy">
          A runnable learning workspace that connects JavaScript behavior, TypeScript
          boundaries, React mechanics, and production engineering.
        </p>
        <div className="landing-actions">
          <Link className="button button-primary" to="/getting-started">
            Get Started
            <ArrowIcon />
          </Link>
          <Link className="button button-secondary" to="/tutorial">
            Explore Tutorial
            <ArrowIcon />
          </Link>
        </div>
        <ul className="project-facts" aria-label="Confirmed project facts">
          {projectFacts.map((fact, index) => (
            <li key={fact}>
              <FactIcon index={index} />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="workflow-section section-reveal" aria-labelledby="workflow-title">
        <div className="section-heading section-heading-centered">
          <h2 id="workflow-title">Your learning workflow</h2>
          <p>Move from mechanism to evidence without separating reading from practice.</p>
        </div>
        <ol className="workflow-steps" ref={workflowRevealRef}>
          <li data-reveal>
            <span className="workflow-number">1</span>
            <WorkflowIcon kind="model" />
            <h3>Understand the model</h3>
            <p>Trace JavaScript runtime behavior before layering on React rules.</p>
          </li>
          <li data-reveal>
            <span className="workflow-number">2</span>
            <WorkflowIcon kind="practice" />
            <h3>Practice in TSX</h3>
            <p>Run focused components and complete applications in the real workspace.</p>
          </li>
          <li data-reveal>
            <span className="workflow-number">3</span>
            <WorkflowIcon kind="verify" />
            <h3>Verify the result</h3>
            <p>Use linting, type checking, tests, builds, and browser evidence.</p>
          </li>
        </ol>
      </section>

      <section className="code-story-section section-reveal" aria-labelledby="code-story-title">
        <div className="section-heading code-story-heading">
          <div>
            <h2 id="code-story-title">A typed path you can inspect</h2>
            <p>
              The workspace keeps models, props, rendered collections, stable keys, and
              status boundaries visible in executable TSX.
            </p>
          </div>
          <Link className="text-link" to="/docs">
            Read the chapter docs
            <ArrowIcon />
          </Link>
        </div>
        <CodeWindow animated code={learningPathCode} label="LearningPath.tsx" language="tsx" />
      </section>
    </div>
  )
}

function TechnologyIcons() {
  return (
    <div className="technology-icons" aria-label="React, TypeScript, and Vite">
      <svg role="img" viewBox="0 0 64 64" aria-label="React">
        <circle cx="32" cy="32" r="4" />
        <ellipse cx="32" cy="32" rx="27" ry="10.5" />
        <ellipse cx="32" cy="32" rx="27" ry="10.5" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="27" ry="10.5" transform="rotate(120 32 32)" />
      </svg>
      <svg className="typescript-icon" role="img" viewBox="0 0 64 64" aria-label="TypeScript">
        <rect height="56" rx="6" width="56" x="4" y="4" />
        <text
          aria-hidden="true"
          className="typescript-mark-text"
          dominantBaseline="central"
          textAnchor="middle"
          x="32"
          y="32"
        >
          TS
        </text>
      </svg>
      <svg className="vite-icon" role="img" viewBox="0 0 64 64" aria-label="Vite">
        <defs>
          <linearGradient id="vite-gradient" x1="7" x2="58" y1="6" y2="61">
            <stop stopColor="#46e6ff" />
            <stop offset="0.52" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#f43fdb" />
          </linearGradient>
        </defs>
        <path d="M6 10.5 32 58 58 10.5 42 13 32 4 22 13Z" fill="url(#vite-gradient)" />
        <path d="m34 13-13 24h10l-2 15 14-26H33Z" />
      </svg>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  )
}

function FactIcon({ index }: { index: number }) {
  const paths = [
    'M4 5.5A2.5 2.5 0 0 1 6.5 3H10v14H6.5A2.5 2.5 0 0 0 4 19.5Zm16 0A2.5 2.5 0 0 0 17.5 3H14v14h3.5a2.5 2.5 0 0 1 2.5 2.5Z',
    'm7 6-4 4 4 4m10-8 4 4-4 4m-3-12-4 16',
    'm12 2 8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6Zm-3 10 2 2 4-5',
    'M4 4h16v16H4zm4 5h3m-3 6h8m-5-3 2-2 2 2',
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[index]} />
    </svg>
  )
}

function WorkflowIcon({ kind }: { kind: 'model' | 'practice' | 'verify' }) {
  const path =
    kind === 'model'
      ? 'M8 4a3 3 0 0 0-3 3v2a3 3 0 0 0 0 6v2a3 3 0 0 0 3 3m8-16a3 3 0 0 1 3 3v2a3 3 0 0 1 0 6v2a3 3 0 0 1-3 3M9 7h6M9 12h6M9 17h6'
      : kind === 'practice'
        ? 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-12-4 24'
        : 'M21 12a9 9 0 1 1-4-7.5M8 12l3 3 7-8'

  return (
    <svg className="workflow-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}
