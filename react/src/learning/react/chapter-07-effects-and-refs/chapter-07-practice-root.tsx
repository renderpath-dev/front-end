import { PureRenderBoundary } from './01-pure-render-boundary/pure-render-boundary'
import { EventHandlerVsEffect } from './02-event-handler-vs-effect/event-handler-vs-effect'
import { RefMutableValue } from './03-ref-mutable-value/ref-mutable-value'
import { DomNodeRef } from './04-dom-node-ref/dom-node-ref'
import { EffectSetupCleanup } from './05-effect-setup-cleanup/effect-setup-cleanup'
import { EffectDependencies } from './06-effect-dependencies/effect-dependencies'
import { StaleClosureInterval } from './07-stale-closure/stale-closure-interval'
import { TimerCleanup } from './08-timer-cleanup/timer-cleanup'
import { DocumentTitleSync } from './09-document-title-sync/document-title-sync'
import { AsyncEffectCleanup } from './10-async-effect-cleanup/async-effect-cleanup'
import { DerivedDataWithoutEffect } from './11-derived-data-without-effect/derived-data-without-effect'
import { TypedRefsEffects } from './12-typed-refs-effects/typed-refs-effects'
import { SellerSearchSyncWorkspace } from './seller-search-sync-mini-project/seller-search-sync-workspace'
import './chapter-07-practice.css'

const practiceSections = [
  { id: 'pure-render', component: <PureRenderBoundary /> },
  { id: 'event-effect', component: <EventHandlerVsEffect /> },
  { id: 'mutable-ref', component: <RefMutableValue /> },
  { id: 'dom-ref', component: <DomNodeRef /> },
  { id: 'setup-cleanup', component: <EffectSetupCleanup /> },
  { id: 'dependencies', component: <EffectDependencies /> },
  { id: 'stale-closure', component: <StaleClosureInterval /> },
  { id: 'timer-cleanup', component: <TimerCleanup /> },
  { id: 'document-title', component: <DocumentTitleSync /> },
  { id: 'async-cleanup', component: <AsyncEffectCleanup /> },
  { id: 'derived-data', component: <DerivedDataWithoutEffect /> },
  { id: 'typed-refs', component: <TypedRefsEffects /> },
]

export function Chapter07PracticeRoot() {
  return (
    <main className="chapter-seven-shell">
      <header className="chapter-seven-header">
        <p className="chapter-seven-eyebrow">React Chapter 07</p>
        <h1>Effects, Refs, and External Synchronization</h1>
        <p>
          Separate render calculations, user-driven events, retained mutable references,
          and synchronization processes before applying them to SellerHub workflows.
        </p>
      </header>

      <section aria-labelledby="chapter-seven-practice-title">
        <div className="chapter-seven-section-heading">
          <div>
            <p>Mechanism practice</p>
            <h2 id="chapter-seven-practice-title">One synchronization boundary per directory</h2>
          </div>
          <p>Use each card to predict setup, cleanup, dependency, and render behavior.</p>
        </div>

        <div className="chapter-seven-practice-grid">
          {practiceSections.map((practice) => (
            <div id={practice.id} key={practice.id}>
              {practice.component}
            </div>
          ))}
        </div>
      </section>

      <SellerSearchSyncWorkspace />
    </main>
  )
}
