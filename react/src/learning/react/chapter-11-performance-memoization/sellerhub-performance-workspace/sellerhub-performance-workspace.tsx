import { lazy, Profiler, Suspense } from 'react'
import type { ProfilerOnRenderCallback } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PerformancePreferencesProvider } from './performance-preferences-provider'
import { SellerHubPerformanceLayout } from './sellerhub-performance-layout'

const LazyCatalogPage = lazy(() => import('./product-catalog-performance-page'))
const LazyOrdersPage = lazy(() => import('./seller-orders-performance-page'))
const LazyDashboardPage = lazy(() => import('./dashboard-performance-page'))

const handleWorkspaceRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
) => {
  console.info('SellerHub performance profile', {
    actualDuration,
    baseDuration,
    id,
    phase,
  })
}

export function SellerHubPerformanceWorkspace() {
  return (
    <PerformancePreferencesProvider>
      <Profiler id="SellerHubPerformanceWorkspace" onRender={handleWorkspaceRender}>
        <Suspense
          fallback={<p className="performance-loading-state">Loading page code chunk...</p>}
        >
          <Routes>
            <Route element={<SellerHubPerformanceLayout />}>
              <Route element={<Navigate replace to="catalog" />} index />
              <Route element={<LazyCatalogPage />} path="catalog" />
              <Route element={<LazyOrdersPage />} path="orders" />
              <Route element={<LazyDashboardPage />} path="dashboard" />
              <Route element={<Navigate replace to="catalog" />} path="*" />
            </Route>
          </Routes>
        </Suspense>
      </Profiler>
    </PerformancePreferencesProvider>
  )
}
