export function EventHandlerCallback() {
  function handleClick() {
    console.log('Event handler callback ran after the click.')
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.1 Callback boundary</p>
      <h2>Event handler callback</h2>
      <p>React receives a function value and calls it after the user clicks.</p>
      <button className="practice-button" onClick={handleClick} type="button">
        Run callback
      </button>
      <p className="practice-note">Open the browser console to inspect the callback log.</p>
    </section>
  )
}
