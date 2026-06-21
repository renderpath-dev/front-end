import { useState } from 'react'

type CheckoutDraftProps = {
  customerId: string
}

function CheckoutDraft({ customerId }: CheckoutDraftProps) {
  const [note, setNote] = useState('')

  return (
    <label>
      Note for {customerId}
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Delivery note"
      />
    </label>
  )
}

export function KeyedCheckoutDraft() {
  const [customerId, setCustomerId] = useState('customer-a')

  return (
    <article className="practice-card">
      <p className="practice-label">State identity</p>
      <h3>Reset a draft with an explicit key</h3>
      <div className="practice-stack">
        <button onClick={() => setCustomerId('customer-a')}>Customer A</button>
        <button onClick={() => setCustomerId('customer-b')}>Customer B</button>
      </div>
      <CheckoutDraft key={customerId} customerId={customerId} />
    </article>
  )
}
