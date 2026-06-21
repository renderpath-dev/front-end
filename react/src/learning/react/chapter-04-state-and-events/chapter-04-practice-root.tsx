import { EventHandlerCallback } from './01-event-handler-callback/event-handler-callback'
import { PassVsCallHandler } from './02-pass-vs-call-handler/pass-vs-call-handler'
import { EventObjectAndDefaultBehavior } from './03-event-object-and-default-behavior/event-object-and-default-behavior'
import { UseStateMemory } from './04-use-state-memory/use-state-memory'
import { LocalVariableVsState } from './05-local-variable-vs-state/local-variable-vs-state'
import { StateSetterCurrentRender } from './06-state-setter-current-render/state-setter-current-render'
import { StateSnapshot } from './07-state-snapshot/state-snapshot'
import { BatchedUpdates } from './08-batched-updates/batched-updates'
import { FunctionalUpdate } from './09-functional-update/functional-update'
import { ObjectStateUpdate } from './10-object-state-update/object-state-update'
import { ArrayStateUpdate } from './11-array-state-update/array-state-update'
import { TypedEventHandler } from './12-typed-event-handler/typed-event-handler'
import { CartQuantityMiniProject } from './cart-quantity-mini-project/cart-quantity-mini-project'
import './chapter-04-practice.css'

export function Chapter04PracticeRoot() {
  return (
    <main className="chapter-four-shell">
      <header className="chapter-four-header">
        <p className="chapter-four-eyebrow">React Chapter 04</p>
        <h1>State, events, and interactive rendering</h1>
        <p>
          Follow an event from a callback, through the state update queue, into a new
          render and DOM commit.
        </p>
      </header>

      <section aria-labelledby="concept-practice-heading">
        <div className="section-heading-row">
          <div>
            <p className="section-index">01</p>
            <h2 id="concept-practice-heading">Mechanism practice</h2>
          </div>
          <p>Twelve focused files, one observable boundary per panel.</p>
        </div>

        <div className="practice-grid">
          <EventHandlerCallback />
          <PassVsCallHandler />
          <EventObjectAndDefaultBehavior />
          <UseStateMemory />
          <LocalVariableVsState />
          <StateSetterCurrentRender />
          <StateSnapshot />
          <BatchedUpdates />
          <FunctionalUpdate />
          <ObjectStateUpdate />
          <ArrayStateUpdate />
          <TypedEventHandler />
        </div>
      </section>

      <section className="mini-project-section" aria-labelledby="mini-project-heading">
        <div className="section-heading-row">
          <div>
            <p className="section-index">02</p>
            <h2 id="mini-project-heading">Integrated mini project</h2>
          </div>
          <p>Cart quantity behavior that can later connect to SellerHub.</p>
        </div>
        <CartQuantityMiniProject />
      </section>
    </main>
  )
}
