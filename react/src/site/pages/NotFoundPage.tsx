import { Link } from 'react-router'
import { usePageTitle } from '../hooks/use-page-title'

export function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <p className="page-number" aria-hidden="true">404</p>
      <h1 id="not-found-title">This route is outside the learning map.</h1>
      <p>
        The requested product page or practice route does not exist. Return to the learning
        home or open the structured Tutorial.
      </p>
      <div className="landing-actions">
        <Link className="button button-primary" to="/">
          Return home
        </Link>
        <Link className="button button-secondary" to="/tutorial">
          Open Tutorial
        </Link>
      </div>
    </section>
  )
}
