import { ChildrenBasicComposition } from './children-props-basics/children-basic-composition'
import { ChildrenRenderableBoundary } from './children-props-basics/children-renderable-boundary'
import './chapter-03-practice.css'
import { JsxAttributesToPropsDemo } from './props-object-boundary/jsx-attributes-to-props-demo'
import { PropsDestructuringDemo } from './props-object-boundary/props-destructuring-demo'
import { PropsObjectRuntimeDemo } from './props-object-boundary/props-object-runtime-demo'
import { PropsReadonlyMistake } from './props-object-boundary/props-readonly-mistake'
import { BooleanPropsDemo } from './props-type-boundary/boolean-props-demo'
import { DefaultPropValuesDemo } from './props-type-boundary/default-prop-values-demo'
import { OptionalPropsDemo } from './props-type-boundary/optional-props-demo'
import { RequiredPropsDemo } from './props-type-boundary/required-props-demo'
import { TypeScriptRuntimeBoundaryDemo } from './props-type-boundary/typescript-runtime-boundary-demo'

export function Chapter03PracticeRoot() {
  return (
    <main className="props-practice-shell">
      <header className="props-practice-header">
        <p className="chapter-eyebrow">React Chapter 03</p>
        <h1>Props basics</h1>
        <p>
          This page renders the chapter practice components for props, children,
          default values, boolean props, and TypeScript boundaries.
        </p>
      </header>

      <div className="props-practice-grid" aria-label="Chapter 03 practice exercises">
        <PropsObjectRuntimeDemo />
        <JsxAttributesToPropsDemo />
        <PropsDestructuringDemo />
        <RequiredPropsDemo />
        <OptionalPropsDemo />
        <DefaultPropValuesDemo />
        <BooleanPropsDemo />
        <ChildrenBasicComposition />
        <ChildrenRenderableBoundary />
        <PropsReadonlyMistake />
        <TypeScriptRuntimeBoundaryDemo />
      </div>
    </main>
  )
}
