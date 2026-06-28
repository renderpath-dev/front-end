import { SellerHubProductionDashboard } from './sellerhub-production-dashboard'

export function SellerHubProductionArchitectureKit() {
  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">Final project</p>
      <h2>SellerHub Production Architecture Kit</h2>
      <p>
        This local dashboard integrates public APIs, adapters, release controls,
        observability, performance, security, and governance without external services.
      </p>
      <SellerHubProductionDashboard />
    </section>
  )
}
