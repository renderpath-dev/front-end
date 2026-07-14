import { Link } from 'react-router'
import { CodeWindow } from '../components/CodeWindow'
import { usePageTitle } from '../hooks/use-page-title'

const installAndRunCommands = `npm install
npm run dev`

const qualityGateCommands = `npm run lint
npm run typecheck
npm run test
npm run build`

const productionPreviewCommand = `npm run preview`

const learningProgression = [
  {
    title: 'Application boundary and component model',
    description:
      'Start with the browser root, Vite, TypeScript, JSX, components, props, state, events, lists, and forms.',
  },
  {
    title: 'Effects, ownership, and asynchronous data',
    description:
      'Separate pure rendering from synchronization, then model state ownership, reducers, context, custom hooks, and request lifecycles.',
  },
  {
    title: 'Routing, performance, and quality evidence',
    description:
      'Treat the URL as state, measure render and bundle work, and verify behavior with the existing test and quality-gate setup.',
  },
  {
    title: 'Framework and React 19 boundaries',
    description:
      'Study Next.js server and client boundaries, hydration, Actions, optimistic UI, the use API, and compiler readiness without converting this Vite app.',
  },
  {
    title: 'Production architecture and capstone delivery',
    description:
      'Connect design systems, module boundaries, runtime contracts, security, observability, operations, and portfolio evidence in SellerHub.',
  },
]

export function GettingStartedPage() {
  usePageTitle('Getting Started')

  return (
    <div className="getting-started-page page-container">
      <header className="page-hero getting-started-hero">
        <div>
          <h1>Start with the real workspace.</h1>
          <p>
            This is a React + TypeScript learning project first and a production-style
            practice project second. It keeps explanations, focused TSX exercises, routed
            workspaces, tests, and complete applications in one Vite project.
          </p>
        </div>
        <aside className="getting-started-audience" aria-label="Intended audience">
          <h2>Who it is for</h2>
          <p>
            Learners who want to understand what React and TypeScript are doing, not only
            copy an API pattern. JavaScript runtime behavior and TypeScript compile-time
            behavior stay deliberately separate.
          </p>
        </aside>
      </header>

      <section className="getting-started-section" aria-labelledby="workspace-title">
        <div className="section-heading section-heading-split">
          <div>
            <h2 id="workspace-title">How the workspace is organized</h2>
            <p>Read, run, inspect, and verify from the repository root.</p>
          </div>
        </div>
        <dl className="workspace-map">
          <div>
            <dt><code>docs/roadmap/</code></dt>
            <dd>The long-term progression from React foundations to production architecture.</dd>
          </div>
          <div>
            <dt><code>docs/react/</code></dt>
            <dd>The original chapter learning guides used as source material for this site.</dd>
          </div>
          <div>
            <dt><code>src/learning/react/</code></dt>
            <dd>Runnable TSX mechanism exercises and chapter applications.</dd>
          </div>
          <div>
            <dt><code>src/sudoku/</code></dt>
            <dd>A separate application for state, events, derived rendering, and local persistence.</dd>
          </div>
        </dl>
      </section>

      <section className="getting-started-section" aria-labelledby="commands-title">
        <div className="section-heading">
          <h2 id="commands-title">Install and run</h2>
          <p>
            Use the npm scripts already defined by the project. Start in the repository root;
            no nested directory change is required.
          </p>
        </div>
        <div className="command-grid">
          <div>
            <h3>Development</h3>
            <p>Install the locked dependency graph, then start the Vite development server.</p>
            <CodeWindow code={installAndRunCommands} label="Terminal · development" language="bash" />
          </div>
          <div>
            <h3>Quality gates</h3>
            <p>Keep linting, TypeScript contracts, runtime tests, and production compilation distinct.</p>
            <CodeWindow code={qualityGateCommands} label="Terminal · quality gates" language="bash" />
          </div>
          <div>
            <h3>Production preview</h3>
            <p>Run this after a successful build to inspect the generated application locally.</p>
            <CodeWindow code={productionPreviewCommand} label="Terminal · preview" language="bash" />
          </div>
        </div>
      </section>

      <section className="getting-started-section" aria-labelledby="progression-title">
        <div className="section-heading">
          <h2 id="progression-title">The learning progression</h2>
          <p>
            The roadmap advances from component syntax to the runtime and engineering
            boundaries required to reason about a production frontend.
          </p>
        </div>
        <ol className="progression-list">
          {learningProgression.map((stage, index) => (
            <li key={stage.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="next-actions" aria-labelledby="next-actions-title">
        <div>
          <h2 id="next-actions-title">Choose the next layer.</h2>
          <p>
            Open runnable practice when you want feedback from the browser, or read the
            authored chapter material when you need the complete mechanism first.
          </p>
        </div>
        <div className="landing-actions">
          <Link className="button button-primary" to="/tutorial">
            Open Tutorial
          </Link>
          <Link className="button button-secondary" to="/docs">
            Read Docs
          </Link>
        </div>
      </section>
    </div>
  )
}
