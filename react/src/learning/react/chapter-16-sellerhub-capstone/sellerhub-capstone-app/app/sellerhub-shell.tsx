import { NavLink, Outlet } from 'react-router'
import { useSellerHubApp } from './sellerhub-app-state'
import { deriveCartSummary } from '../features/cart/cart-model'
import { formatReleaseDate } from '../shared/i18n/formatters'
import type { SellerHubLocale } from '../shared/i18n/messages'
import type { SellerHubRole } from '../shared/flags/feature-flags'

const navigationItems = [
  { label: 'Catalog', to: '/react/chapter-16/catalog' },
  { label: 'Cart / Checkout', to: '/react/chapter-16/cart' },
  { label: 'Seller Orders', to: '/react/chapter-16/seller/orders' },
  { label: 'Operations', to: '/react/chapter-16/operations' },
  { label: 'Evidence', to: '/react/chapter-16/evidence' },
] as const

export function SellerHubShell() {
  const {
    cart,
    locale,
    release,
    role,
    setLocale,
    setRole,
  } = useSellerHubApp()
  const cartSummary = deriveCartSummary(cart)

  return (
    <div className="sellerhub-app-shell">
      <header className="sellerhub-app-header">
        <div>
          <p className="sellerhub-eyebrow">React Chapter 16 capstone</p>
          <h1>SellerHub</h1>
          <p>
            Local frontend simulation. No real backend, authentication, payment, or
            production telemetry is connected.
          </p>
        </div>
        <div className="sellerhub-release-summary">
          <strong>{release.version}</strong>
          <span>{formatReleaseDate(release.releasedAt, locale)}</span>
          <span>{cartSummary.itemCount} cart items</span>
        </div>
      </header>

      <nav aria-label="SellerHub capstone" className="sellerhub-navigation">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            key={item.to}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sellerhub-context-controls">
        <label>
          Locale
          <select
            onChange={(event) => setLocale(event.target.value as SellerHubLocale)}
            value={locale}
          >
            <option value="en-US">en-US</option>
            <option value="en-GB">en-GB</option>
          </select>
        </label>
        <label>
          Role
          <select
            onChange={(event) => setRole(event.target.value as SellerHubRole)}
            value={role}
          >
            <option value="seller">seller</option>
            <option value="buyer">buyer</option>
            <option value="viewer">viewer</option>
          </select>
        </label>
      </div>

      <main className="sellerhub-route-surface">
        <Outlet />
      </main>
    </div>
  )
}
