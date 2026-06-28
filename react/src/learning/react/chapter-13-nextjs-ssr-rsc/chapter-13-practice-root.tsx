import { FrameworkBoundaryMap } from './01-framework-boundary/framework-boundary-map'
import { AppRouterSegmentTreePanel } from './02-app-router-segments/app-router-segment-tree-panel'
import { RouteSpecialFileBoundaries } from './03-route-special-files/route-special-file-boundaries'
import { ServerComponentRulePanel } from './04-server-component-boundary/server-component-rule-panel'
import { ClientComponentBoundaryPanel } from './05-client-component-boundary/client-component-boundary-panel'
import { SerializablePropsPanel } from './06-serialization-boundary/serializable-props-panel'
import { RenderingStrategyPanel } from './07-rendering-strategies/rendering-strategy-panel'
import { HydrationMismatchPanel } from './08-hydration-mismatch/hydration-mismatch-panel'
import { BrowserApiGuardPanel } from './09-browser-api-guard/browser-api-guard-panel'
import { StreamingBoundaryModel } from './10-suspense-streaming-boundary/streaming-boundary-model'
import { ServerFetchCachePanel } from './11-server-fetch-cache/server-fetch-cache-panel'
import { RouteRuntimeBoundaryMap } from './12-route-runtime-boundaries/route-runtime-boundary-map'
import { SellerHubNextjsArchitectureLab } from './sellerhub-nextjs-architecture-lab/sellerhub-nextjs-architecture-lab'
import './chapter-13-practice.css'

export function Chapter13PracticeRoot() {
  return (
    <main className="chapter13-shell">
      <header className="chapter13-hero">
        <p className="chapter13-kicker">React Chapter 13</p>
        <h1>Next.js App Router, SSR, Hydration, and Server Components</h1>
        <p>
          A Vite-hosted mechanism lab for learning framework boundaries before building
          a real Next.js SellerHub project.
        </p>
      </header>

      <FrameworkBoundaryMap />
      <AppRouterSegmentTreePanel />
      <RouteSpecialFileBoundaries />
      <ServerComponentRulePanel />
      <ClientComponentBoundaryPanel />
      <SerializablePropsPanel />
      <RenderingStrategyPanel />
      <HydrationMismatchPanel />
      <BrowserApiGuardPanel />
      <StreamingBoundaryModel />
      <ServerFetchCachePanel />
      <RouteRuntimeBoundaryMap />
      <SellerHubNextjsArchitectureLab />
    </main>
  )
}
