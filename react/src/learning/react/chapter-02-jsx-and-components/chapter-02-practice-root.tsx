import { ComponentModuleComposition } from './component-basics/component-module-composition'
import { ComponentNameBoundary } from './component-basics/component-name-boundary'
import './chapter-02-practice.css'
import { JsxAttributeBoundary } from './jsx-source-boundary/jsx-attribute-boundary'
import { JsxChildValues } from './jsx-source-boundary/jsx-child-values'
import { JsxExpressionValues } from './jsx-source-boundary/jsx-expression-values'

export function Chapter02PracticeRoot() {
  return (
    <main className="chapter-practice-shell">
      <header className="chapter-practice-header">
        <p className="chapter-eyebrow">React Chapter 02</p>
        <h1>JSX and component basics</h1>
        <p>
          This practice page renders every real exercise component from the chapter in
          one static React tree.
        </p>
      </header>

      <div className="practice-grid" aria-label="Chapter 02 practice exercises">
        <JsxExpressionValues />
        <JsxAttributeBoundary />
        <JsxChildValues />
        <ComponentNameBoundary />
        <ComponentModuleComposition />
      </div>
    </main>
  )
}
