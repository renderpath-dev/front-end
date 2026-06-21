import { useLocation, useNavigate } from 'react-router'

type SellerHubLoginPageProps = {
  onLogin: () => void
}

type LoginLocationState = {
  from?: string
}

function getRedirectDestination(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof (state as LoginLocationState).from === 'string'
  ) {
    return (state as LoginLocationState).from ?? '/seller'
  }

  return '/seller'
}

export function SellerHubLoginPage({ onLogin }: SellerHubLoginPageProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const redirectDestination = getRedirectDestination(location.state)

  function completeLocalLogin(): void {
    onLogin()
    navigate(redirectDestination, { replace: true })
  }

  return (
    <section className="sellerhub-login-panel">
      <p>Local auth placeholder</p>
      <h3>Seller login</h3>
      <p>
        Redirect destination: <code>{redirectDestination}</code>
      </p>
      <button onClick={completeLocalLogin} type="button">
        Activate local seller session
      </button>
      <p className="routing-practice-note">
        This route changes local UI access only. A backend must still authorize every protected
        operation.
      </p>
    </section>
  )
}
