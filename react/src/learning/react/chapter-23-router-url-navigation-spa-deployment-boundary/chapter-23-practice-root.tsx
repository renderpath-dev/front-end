import { RouterUrlUiBoundaryPanel } from './01-router-boundary/router-url-ui-boundary-panel'
import { UrlAnatomyPanel } from './02-url-anatomy/url-anatomy-panel'
import { LinkNavLinkPanel } from './03-link-navlink/link-navlink-panel'
import { NavigationBoundaryPanel } from './04-navigation-boundary/navigation-boundary-panel'
import { RouteMatchingLayoutPanel } from './05-route-matching/route-matching-layout-panel'
import { RouteParamBoundaryPanel } from './06-route-params/route-param-boundary-panel'
import { SearchParamRoutePanel } from './07-search-params/search-param-route-panel'
import { RelativeLinkResolutionPanel } from './08-relative-links/relative-link-resolution-panel'
import { NotFoundBoundaryPanel } from './09-not-found/not-found-boundary-panel'
import { ProtectedRouteBoundaryPanel } from './10-protected-routes/protected-route-boundary-panel'
import { RouteIdentityResetPanel } from './11-route-identity/route-identity-reset-panel'
import { RouteCodeSplittingPanel } from './12-route-code-splitting/route-code-splitting-panel'
import { NavigationAccessibilityPanel } from './13-navigation-accessibility/navigation-accessibility-panel'
import { SpaDeploymentBoundaryPanel } from './14-spa-deployment/spa-deployment-boundary-panel'
import { HashRouterBoundaryPanel } from './15-hash-router/hash-router-boundary-panel'
import { TestingRoutedUiPanel } from './16-testing-routed-ui/testing-routed-ui-panel'
import { SellerHubRouteArchitectureMap } from './17-sellerhub-route-map/sellerhub-route-architecture-map'
import { SellerHubRouteBoundaryLab } from './sellerhub-route-boundary-lab/sellerhub-route-boundary-lab'
import './chapter-23-practice.css'

export function Chapter23PracticeRoot() {
  return (
    <main className="route-lab-page">
      <section className="route-lab-hero" aria-labelledby="chapter-23-title">
        <p className="route-lab-eyebrow">React Chapter 23</p>
        <h1 id="chapter-23-title">
          Router, URL Design, Navigation State, and SPA Deployment Boundary
        </h1>
        <p>
          Practice routing as URL ownership, route matching, navigation semantics, route
          identity, accessibility evidence, and static SPA deployment boundary decisions.
        </p>
        <div className="route-lab-pill-row" aria-label="Chapter 23 boundaries">
          <span className="route-pill">React Router declarative mode</span>
          <span className="route-pill">URL and history boundary</span>
          <span className="route-pill">Client-only deployment lab</span>
        </div>
      </section>

      <div className="route-lab-grid">
        <RouterUrlUiBoundaryPanel />
        <UrlAnatomyPanel />
        <LinkNavLinkPanel />
        <NavigationBoundaryPanel />
        <RouteMatchingLayoutPanel />
        <RouteParamBoundaryPanel />
        <SearchParamRoutePanel />
        <RelativeLinkResolutionPanel />
        <NotFoundBoundaryPanel />
        <ProtectedRouteBoundaryPanel />
        <RouteIdentityResetPanel />
        <RouteCodeSplittingPanel />
        <NavigationAccessibilityPanel />
        <SpaDeploymentBoundaryPanel />
        <HashRouterBoundaryPanel />
        <TestingRoutedUiPanel />
        <SellerHubRouteArchitectureMap />
        <SellerHubRouteBoundaryLab />
      </div>
    </main>
  )
}
