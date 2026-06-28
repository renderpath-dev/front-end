import { startTransition, useState, useTransition } from 'react'

type CheckoutActionResult =
  | { status: 'idle'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

const initialResult: CheckoutActionResult = {
  status: 'idle',
  message: 'No checkout mutation has run.',
}

async function saveCheckoutAddress(address: string): Promise<CheckoutActionResult> {
  await wait(500)

  if (address.trim().length < 5) {
    return {
      status: 'error',
      message: 'Enter a complete delivery address.',
    }
  }

  return {
    status: 'success',
    message: `Saved delivery address: ${address.trim()}`,
  }
}

export function ActionTransitionResult() {
  const [address, setAddress] = useState('12 Market Street')
  const [result, setResult] = useState<CheckoutActionResult>(initialResult)
  const [isPending, startAction] = useTransition()

  function handleSave(): void {
    startAction(async () => {
      const nextResult = await saveCheckoutAddress(address)

      startTransition(() => {
        setResult(nextResult)
      })
    })
  }

  return (
    <section className="chapter14-panel" aria-labelledby="action-boundary-title">
      <p className="chapter14-kicker">9.1 Action boundary</p>
      <h2 id="action-boundary-title">Mutation, pending state, and result state</h2>
      <label className="chapter14-field">
        Delivery address
        <input
          onChange={(event) => setAddress(event.currentTarget.value)}
          value={address}
        />
      </label>
      <button className="chapter14-button" disabled={isPending} onClick={handleSave}>
        {isPending ? 'Saving address...' : 'Save address'}
      </button>
      <p className={`chapter14-result chapter14-result-${result.status}`}>
        {result.message}
      </p>
      <p className="chapter14-note">
        The click handler starts an Action. The async mutation and its result update are
        not the same operation as the click callback itself.
      </p>
    </section>
  )
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}
