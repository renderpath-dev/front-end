import { Link } from 'react-router'

export function SellerHubLinkNavigationPanel() {
  return (
    <section aria-labelledby="sellerhub-link-navigation-title">
      <h3 id="sellerhub-link-navigation-title">SellerHub link navigation panel</h3>
      <div className="route-link-grid">
        <Link to="/sellerhub/catalog/product-201">Open product detail</Link>
        <Link to={{ pathname: '/sellerhub/catalog', search: '?channel=online' }}>
          Share online catalog
        </Link>
        <Link to={{ pathname: '/sellerhub/help', hash: '#faq' }}>Open help FAQ</Link>
      </div>
    </section>
  )
}
