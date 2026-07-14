import { useState } from 'react'

function SellerSettingsDraft({ sellerId }: { sellerId: string }) {
  const [storeName, setStoreName] = useState(`${sellerId} demo store`)

  return (
    <label className="state-field">
      Store name draft
      <input value={storeName} onChange={(event) => setStoreName(event.currentTarget.value)} />
    </label>
  )
}

export function PreserveResetStatePanel() {
  const [sellerId, setSellerId] = useState('seller-42')

  return (
    <article className="state-card">
      <p className="state-card-kicker">9.15 identity and reset</p>
      <h3>State preservation and reset by key</h3>
      <label className="state-field">
        Seller identity
        <select value={sellerId} onChange={(event) => setSellerId(event.currentTarget.value)}>
          <option value="seller-42">seller-42</option>
          <option value="seller-84">seller-84</option>
        </select>
      </label>
      <SellerSettingsDraft key={sellerId} sellerId={sellerId} />
      <p>Changing seller identity remounts the keyed draft owner.</p>
    </article>
  )
}
