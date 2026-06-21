import { AsyncDataSourceBoundary } from './01-async-data-boundary/async-data-source-boundary'
import { AsyncLifecycleUnion } from './02-async-state-union/async-lifecycle-union'
import { HttpResponseBoundary } from './03-http-error-boundary/http-response-boundary'
import { EventDrivenProductSearch } from './04-event-driven-fetch/event-driven-product-search'
import { EffectDrivenProductQuery } from './05-effect-driven-fetch/effect-driven-product-query'
import { AbortObsoleteRequest } from './06-abort-obsolete-result/abort-obsolete-request'
import { RaceConditionProtection } from './07-race-condition/race-condition-protection'
import { UnknownResponseGuard } from './08-runtime-type-guard/unknown-response-guard'
import { AsyncLifecycleReducer } from './09-async-reducer/async-lifecycle-reducer'
import { DerivedOrderSummary } from './10-derived-fetched-data/derived-order-summary'
import { CustomAsyncResource } from './11-custom-async-hook/custom-async-resource'
import { ContextAsyncDelivery } from './12-context-async-delivery/context-async-delivery'
import { SellerOrdersAsyncWorkspace } from './seller-orders-async-workspace/seller-orders-async-workspace'
import './chapter-09-practice.css'

const practiceSections = [
  { id: 'async-source', component: <AsyncDataSourceBoundary /> },
  { id: 'async-union', component: <AsyncLifecycleUnion /> },
  { id: 'http-boundary', component: <HttpResponseBoundary /> },
  { id: 'event-fetch', component: <EventDrivenProductSearch /> },
  { id: 'effect-fetch', component: <EffectDrivenProductQuery /> },
  { id: 'abort-request', component: <AbortObsoleteRequest /> },
  { id: 'race-protection', component: <RaceConditionProtection /> },
  { id: 'runtime-guard', component: <UnknownResponseGuard /> },
  { id: 'async-reducer', component: <AsyncLifecycleReducer /> },
  { id: 'derived-data', component: <DerivedOrderSummary /> },
  { id: 'custom-hook', component: <CustomAsyncResource /> },
  { id: 'context-delivery', component: <ContextAsyncDelivery /> },
]

export function Chapter09PracticeRoot() {
  return (
    <main className="chapter-nine-shell">
      <header className="chapter-nine-header">
        <p className="chapter-nine-eyebrow">React Chapter 09</p>
        <h1>Async Data, Fetch Lifecycle, and UI State</h1>
        <p>
          Trace each request from user intent or committed criteria through Promise settlement,
          runtime validation, React state transitions, obsolete-result protection, and UI branches.
        </p>
      </header>

      <section aria-labelledby="chapter-nine-practice-title">
        <div className="chapter-nine-section-heading">
          <div>
            <p>Mechanism practice</p>
            <h2 id="chapter-nine-practice-title">One async boundary per directory</h2>
          </div>
          <p>Predict the trigger, Promise result, state transition, and rendered branch.</p>
        </div>

        <div className="chapter-nine-practice-grid">
          {practiceSections.map((practice) => (
            <div id={practice.id} key={practice.id}>
              {practice.component}
            </div>
          ))}
        </div>
      </section>

      <SellerOrdersAsyncWorkspace />
    </main>
  )
}
