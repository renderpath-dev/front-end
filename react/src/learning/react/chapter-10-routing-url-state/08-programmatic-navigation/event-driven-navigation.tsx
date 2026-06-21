import { useNavigate } from 'react-router'

export function EventDrivenNavigation() {
  const navigate = useNavigate()

  function completePracticeCheckout(): void {
    navigate('/checkout?step=review', {
      state: { source: 'programmatic-navigation-practice' },
    })
  }

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">08 / Programmatic navigation</p>
      <h2>Navigate after an explicit event completes</h2>
      <div className="routing-practice-actions">
        <button onClick={completePracticeCheckout} type="button">
          Complete step and review checkout
        </button>
        <button onClick={() => navigate(-1)} type="button">
          Go back one history entry
        </button>
      </div>
      <p className="routing-practice-note">
        The navigate function is called inside event handlers, never while the component is
        rendering.
      </p>
    </article>
  )
}
