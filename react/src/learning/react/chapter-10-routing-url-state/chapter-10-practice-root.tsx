import { BrowserRouter, Link, Route, Routes } from 'react-router'
import { ClientRoutingBoundary } from './01-client-routing-boundary/client-routing-boundary'
import { RouteMatchingTree } from './02-route-matching-tree/route-matching-tree'
import { LinkNavLinkIntent } from './03-link-navlink-intent/link-navlink-intent'
import { NestedLayoutOutlet } from './04-nested-layout-outlet/nested-layout-outlet'
import { DynamicRouteParams } from './05-dynamic-route-params/dynamic-route-params'
import { SearchParamsUrlState } from './06-search-params-url-state/search-params-url-state'
import { UrlLocalContextState } from './07-url-local-context-state/url-local-context-state'
import { EventDrivenNavigation } from './08-programmatic-navigation/event-driven-navigation'
import { NotFoundFallbackRoute } from './09-not-found-route/not-found-fallback-route'
import { ProtectedRoutePlaceholder } from './10-protected-route-placeholder/protected-route-placeholder'
import { RouteParamStateReset } from './11-route-state-reset/route-param-state-reset'
import { RouteParamAsyncCriteria } from './12-route-params-async-criteria/route-param-async-criteria'
import { SellerHubRoutingWorkspace } from './sellerhub-routing-workspace/sellerhub-routing-workspace'
import './chapter-10-practice.css'

const practiceComponents = [
  <ClientRoutingBoundary key="client-routing" />,
  <RouteMatchingTree key="route-matching" />,
  <LinkNavLinkIntent key="navigation-intent" />,
  <NestedLayoutOutlet key="nested-layout" />,
  <DynamicRouteParams key="dynamic-params" />,
  <SearchParamsUrlState key="search-params" />,
  <UrlLocalContextState key="state-boundaries" />,
  <EventDrivenNavigation key="programmatic-navigation" />,
  <NotFoundFallbackRoute key="not-found" />,
  <ProtectedRoutePlaceholder key="protected-placeholder" />,
  <RouteParamStateReset key="route-state-reset" />,
  <RouteParamAsyncCriteria key="async-criteria" />,
]

function Chapter10PracticeOverview() {
  return (
    <section aria-labelledby="routing-practice-title">
      <div className="chapter-ten-section-heading">
        <div>
          <p>Mechanism practice</p>
          <h2 id="routing-practice-title">One routing boundary per directory</h2>
        </div>
        <Link to="/catalog">Open SellerHub workspace</Link>
      </div>
      <div className="routing-practice-grid">{practiceComponents}</div>
    </section>
  )
}

function Chapter10Router() {
  return (
    <main className="chapter-ten-shell">
      <header className="chapter-ten-header">
        <div>
          <p className="chapter-ten-eyebrow">React Chapter 10</p>
          <h1>Routing, URL State, and Navigation</h1>
          <p>
            Trace browser history, router matching, route elements, URL values, component
            identity, and TypeScript boundaries from one navigation intent.
          </p>
        </div>
        <nav aria-label="Chapter views" className="chapter-ten-nav">
          <Link to="/practice">Mechanism practice</Link>
          <Link to="/catalog">SellerHub workspace</Link>
        </nav>
      </header>
      <Routes>
        <Route element={<Chapter10PracticeOverview />} path="/practice/*" />
        <Route element={<SellerHubRoutingWorkspace />} path="*" />
      </Routes>
    </main>
  )
}

export function Chapter10PracticeRoot() {
  return (
    <BrowserRouter>
      <Chapter10Router />
    </BrowserRouter>
  )
}
