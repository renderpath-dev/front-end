import './chapter-01-practice.css'

type DemoSection = {
  title: string
  layer: string
  explanation: string
}

const sections: DemoSection[] = [
  {
    title: 'Component',
    layer: 'React runtime and convention',
    explanation: 'A component is a JavaScript function that returns a UI description.',
  },
  {
    title: 'JSX',
    layer: 'Syntax and tooling',
    explanation: 'JSX is transformed before the browser runs the app.',
  },
  {
    title: 'DOM',
    layer: 'Browser platform API',
    explanation: 'React DOM updates real browser nodes inside the root element.',
  },
]

function DemoCard({ title, layer, explanation }: DemoSection) {
  return (
    <article className="chapter-01-demo-card">
      <span>{layer}</span>
      <h2>{title}</h2>
      <p>{explanation}</p>
    </article>
  )
}

export function Chapter01PracticeRoot() {
  return (
    <main className="chapter-01-demo-page">
      <section className="chapter-01-hero-panel" aria-labelledby="chapter-01-page-title">
        <p className="chapter-01-eyebrow">React Component Rendering Demo</p>
        <h1 id="chapter-01-page-title">React describes UI with components</h1>
        <p className="chapter-01-intro">
          This demo shows the first boundary: TypeScript checks the source, Vite serves and
          builds it, React renders components, and the browser displays DOM and CSS.
        </p>
      </section>

      <section className="chapter-01-card-grid" aria-label="Rendering layers">
        {sections.map((section) => (
          <DemoCard
            explanation={section.explanation}
            key={section.title}
            layer={section.layer}
            title={section.title}
          />
        ))}
      </section>
    </main>
  )
}
