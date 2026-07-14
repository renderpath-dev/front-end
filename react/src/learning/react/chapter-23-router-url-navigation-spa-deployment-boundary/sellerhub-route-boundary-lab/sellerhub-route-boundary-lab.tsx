import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { SellerHubDeploymentBoundaryCard } from './sellerhub-deployment-boundary-card'
import { SellerHubMemoryRouterLab } from './sellerhub-memory-router-lab'
import { SellerHubRouteReviewTable } from './sellerhub-route-review-table'

export function SellerHubRouteBoundaryLab() {
  return (
    <section className="sellerhub-route-lab" aria-labelledby="sellerhub-route-lab-title">
      <p className="route-card-kicker">Final lab</p>
      <h2 id="sellerhub-route-lab-title">SellerHub Route Boundary Lab</h2>
      <p>
        This is a client-side Vite React lab. It does not deploy to a real static host,
        create backend authorization, create SSR, claim Vite preview is production, claim
        BrowserRouter deep links work on every host without rewrites, or switch the whole
        project router mode.
      </p>
      <p>
        The surrounding app already owns a BrowserRouter. The isolated SellerHub simulation is
        mounted into a separate React root so its MemoryRouter is not nested inside the app
        router.
      </p>
      <IsolatedMemoryRouterMount />
      <div className="route-lab-grid">
        <SellerHubDeploymentBoundaryCard />
        <SellerHubRouteReviewTable />
      </div>
    </section>
  )
}

function IsolatedMemoryRouterMount() {
  const mountRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<Root | null>(null)

  useEffect(() => {
    if (mountRef.current === null) {
      return undefined
    }

    const root = createRoot(mountRef.current)
    rootRef.current = root
    root.render(<SellerHubMemoryRouterLab />)

    return () => {
      rootRef.current?.unmount()
      rootRef.current = null
    }
  }, [])

  return (
    <div
      aria-label="Embedded SellerHub MemoryRouter lab"
      className="sellerhub-route-frame"
      ref={mountRef}
    />
  )
}
