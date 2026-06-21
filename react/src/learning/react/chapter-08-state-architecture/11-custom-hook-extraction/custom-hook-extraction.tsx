import { useState } from 'react'

function useDisclosure(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}

export function CustomHookExtraction() {
  const productDetails = useDisclosure()

  return (
    <article className="practice-card">
      <p className="practice-label">Custom hook</p>
      <h3>Reuse a stateful contract</h3>
      <div className="practice-stack">
        <button onClick={productDetails.open}>Open details</button>
        <button onClick={productDetails.close}>Close details</button>
      </div>
      <p>{productDetails.isOpen ? 'Details are open' : 'Details are closed'}</p>
    </article>
  )
}
