import { catalogFeaturePublicApi } from './catalog-feature-public-api'

export function FeaturePublicApiBoundary() {
  const visibleProducts = catalogFeaturePublicApi.listVisibleProducts()

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.4 Feature public API</p>
      <h2>Consumers import capabilities instead of internal files</h2>
      <ul className="chapter15-list">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <code>{catalogFeaturePublicApi.getProductRoute(product.id)}</code>
          </li>
        ))}
      </ul>
      <p className="chapter15-note">
        Published exports: {Object.keys(catalogFeaturePublicApi).join(', ')}
      </p>
    </section>
  )
}
