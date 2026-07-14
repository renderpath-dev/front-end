import './chapter-19-practice.css'
import { ViteToolingBoundaryPanel } from './01-vite-boundary/vite-tooling-boundary-panel'
import { IndexModuleGraphPanel } from './02-index-module-graph/index-module-graph-panel'
import { DevServerModuleRequestPanel } from './03-dev-server-native-esm/dev-server-module-request-panel'
import { DependencyPrebundlingPanel } from './04-dependency-prebundling/dependency-prebundling-panel'
import { HmrFastRefreshPanel } from './05-hmr-fast-refresh/hmr-fast-refresh-panel'
import { EnvBoundaryPanel } from './06-env-modes/env-boundary-panel'
import { EnvTypeBoundaryPanel } from './07-env-types/env-type-boundary-panel'
import { CssImportsModulesPanel } from './08-css-modules/css-imports-modules-panel'
import { StaticAssetBoundaryPanel } from './09-static-assets/static-asset-boundary-panel'
import { ViteWorkerBoundaryPanel } from './10-web-workers/vite-worker-boundary-panel'
import { GlobModuleMapPanel } from './11-import-meta-glob/glob-module-map-panel'
import { DynamicImportChunkPanel } from './12-dynamic-import-chunks/dynamic-import-chunk-panel'
import { ViteConfigPluginBoundaryPanel } from './13-vite-config-plugin/vite-config-plugin-boundary-panel'
import { BuildPreviewBasePathPanel } from './14-build-preview-deploy/build-preview-base-path-panel'
import { SsrBackendBoundaryPanel } from './15-ssr-backend-boundary/ssr-backend-boundary-panel'
import { SellerHubViteToolingMap } from './16-sellerhub-vite-tooling-map/sellerhub-vite-tooling-map'
import { SellerHubViteBoundaryLab } from './sellerhub-vite-boundary-lab/sellerhub-vite-boundary-lab'

export function Chapter19PracticeRoot() {
  return (
    <main className="chapter-nineteen-shell">
      <header className="chapter-nineteen-hero">
        <p className="chapter-nineteen-eyebrow">React Chapter 19</p>
        <h1>Vite, Module Graph, HMR, Env, Assets, and Production Build</h1>
        <p>
          Trace the tooling boundary behind this React and TypeScript learning app:
          index.html entry, native ESM development, HMR, environment exposure, asset
          imports, workers, glob transforms, dynamic chunks, and production build review.
        </p>
        <div className="vite-boundary-pill-row" aria-label="Chapter 19 coverage">
          <span className="vite-boundary-pill">Vite tooling layer</span>
          <span className="vite-boundary-pill vite-boundary-pill-success">Runnable client lab</span>
          <span className="vite-boundary-pill vite-boundary-pill-warning">
            SSR and deployment boundaries
          </span>
        </div>
      </header>

      <div className="chapter-nineteen-layout">
        <section className="chapter-nineteen-section" aria-labelledby="chapter-19-core">
          <h2 id="chapter-19-core">Vite tooling mechanisms</h2>
          <div className="chapter-nineteen-grid">
            <ViteToolingBoundaryPanel />
            <IndexModuleGraphPanel />
            <DevServerModuleRequestPanel />
            <DependencyPrebundlingPanel />
            <HmrFastRefreshPanel />
            <EnvBoundaryPanel />
            <EnvTypeBoundaryPanel />
            <CssImportsModulesPanel />
          </div>
        </section>

        <section className="chapter-nineteen-section" aria-labelledby="chapter-19-boundaries">
          <h2 id="chapter-19-boundaries">Assets, chunks, config, and deployment boundaries</h2>
          <div className="chapter-nineteen-grid">
            <StaticAssetBoundaryPanel />
            <ViteWorkerBoundaryPanel />
            <GlobModuleMapPanel />
            <DynamicImportChunkPanel />
            <ViteConfigPluginBoundaryPanel />
            <BuildPreviewBasePathPanel />
            <SsrBackendBoundaryPanel />
            <SellerHubViteToolingMap />
          </div>
        </section>

        <SellerHubViteBoundaryLab />
      </div>
    </main>
  )
}
