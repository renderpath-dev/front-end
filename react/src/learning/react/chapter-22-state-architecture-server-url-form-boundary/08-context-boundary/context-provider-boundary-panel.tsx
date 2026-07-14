import { createContext, useContext, useMemo, useState } from 'react'

type SellerViewContextValue = {
  sellerId: string
  region: string
}

const SellerViewContext = createContext<SellerViewContextValue | null>(null)

function SellerContextConsumer() {
  const value = useContext(SellerViewContext)

  if (value === null) {
    throw new Error('SellerContextConsumer must be rendered inside SellerViewContext.')
  }

  return (
    <p>
      Context consumer reads seller {value.sellerId} in {value.region}.
    </p>
  )
}

export function ContextProviderBoundaryPanel() {
  const [region, setRegion] = useState('North')
  const contextValue = useMemo(
    () => ({
      sellerId: 'seller-42',
      region,
    }),
    [region],
  )

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.8 provider scope</p>
      <h3>Context boundary and value identity</h3>
      <label className="state-field">
        Provider region
        <select value={region} onChange={(event) => setRegion(event.currentTarget.value)}>
          <option value="North">North</option>
          <option value="South">South</option>
        </select>
      </label>
      <SellerViewContext value={contextValue}>
        <SellerContextConsumer />
      </SellerViewContext>
    </article>
  )
}
