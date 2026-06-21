import { MinimalCartState } from './01-minimal-state/minimal-cart-state'
import { StateShapeBoundaries } from './02-state-shape-boundaries/state-shape-boundaries'
import { SharedFilterOwner } from './03-state-owner-lifting/shared-filter-owner'
import { CallbackIntentBoundary } from './04-callback-dispatch-intent/callback-intent-boundary'
import { KeyedCheckoutDraft } from './05-preserving-resetting-state/keyed-checkout-draft'
import { CartReducerTransition } from './06-reducer-mental-model/cart-reducer-transition'
import { PureReducerImmutability } from './07-pure-reducer-immutability/pure-reducer-immutability'
import { TypedActionUnion } from './08-typed-action-union/typed-action-union'
import { ContextProviderBoundary } from './09-context-boundary/context-provider-boundary'
import { ReducerContextBoundary } from './10-reducer-context/reducer-context-boundary'
import { CustomHookExtraction } from './11-custom-hook-extraction/custom-hook-extraction'
import { IndependentHookState } from './12-independent-hook-state/independent-hook-state'
import { CartStateWorkspace } from './cart-state-workspace/cart-state-workspace'
import './chapter-08-practice.css'

const practiceSections = [
  { id: 'minimal-state', component: <MinimalCartState /> },
  { id: 'state-shape', component: <StateShapeBoundaries /> },
  { id: 'state-owner', component: <SharedFilterOwner /> },
  { id: 'callback-intent', component: <CallbackIntentBoundary /> },
  { id: 'state-identity', component: <KeyedCheckoutDraft /> },
  { id: 'reducer-model', component: <CartReducerTransition /> },
  { id: 'pure-reducer', component: <PureReducerImmutability /> },
  { id: 'action-union', component: <TypedActionUnion /> },
  { id: 'context-boundary', component: <ContextProviderBoundary /> },
  { id: 'reducer-context', component: <ReducerContextBoundary /> },
  { id: 'custom-hook', component: <CustomHookExtraction /> },
  { id: 'hook-identity', component: <IndependentHookState /> },
]

export function Chapter08PracticeRoot() {
  return (
    <main className="chapter-eight-shell">
      <header className="chapter-eight-header">
        <p className="chapter-eight-eyebrow">React Chapter 08</p>
        <h1>State Architecture, Reducers, Context, and Custom Hooks</h1>
        <p>
          Model source state, ownership, transition logic, delivery boundaries, and
          reusable stateful contracts before scaling SellerHub workflows.
        </p>
      </header>

      <section aria-labelledby="chapter-eight-practice-title">
        <div className="chapter-eight-section-heading">
          <div>
            <p>Mechanism practice</p>
            <h2 id="chapter-eight-practice-title">One state architecture decision per directory</h2>
          </div>
          <p>Predict the owner, source of truth, identity, transition, and consumer boundary.</p>
        </div>

        <div className="chapter-eight-practice-grid">
          {practiceSections.map((practice) => (
            <div id={practice.id} key={practice.id}>
              {practice.component}
            </div>
          ))}
        </div>
      </section>

      <CartStateWorkspace />
    </main>
  )
}
