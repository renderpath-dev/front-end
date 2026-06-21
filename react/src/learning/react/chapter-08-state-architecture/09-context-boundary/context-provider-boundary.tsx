import { createContext, useContext, useState } from 'react'

const StoreRegionContext = createContext<string | null>(null)

function useStoreRegion() {
  const region = useContext(StoreRegionContext)

  if (region === null) {
    throw new Error('useStoreRegion must be used within StoreRegionContext')
  }

  return region
}

function DeepShippingNotice() {
  const region = useStoreRegion()

  return <p>Shipping rules: {region}</p>
}

export function ContextProviderBoundary() {
  const [region, setRegion] = useState('North America')

  return (
    <article className="practice-card">
      <p className="practice-label">Context boundary</p>
      <h3>Provide data to deep descendants</h3>
      <button
        onClick={() =>
          setRegion((current) =>
            current === 'North America' ? 'European Union' : 'North America',
          )
        }
      >
        Change region
      </button>
      <StoreRegionContext value={region}>
        <section>
          <DeepShippingNotice />
        </section>
      </StoreRegionContext>
    </article>
  )
}
