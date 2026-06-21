import { useEffect, useState } from 'react'

const inventoryChannels = ['all', 'warehouse', 'storefront'] as const
type InventoryChannel = (typeof inventoryChannels)[number]

export function EffectDependencies() {
  const [inventoryChannel, setInventoryChannel] = useState<InventoryChannel>('all')

  useEffect(() => {
    document.body.dataset.inventoryChannel = inventoryChannel

    return () => {
      delete document.body.dataset.inventoryChannel
    }
  }, [inventoryChannel])

  return (
    <section className="practice-card">
      <p className="practice-label">Reactive dependency</p>
      <h3>Re-synchronize when a dependency changes</h3>
      <label>
        Inventory channel
        <select
          onChange={(event) => setInventoryChannel(event.currentTarget.value as InventoryChannel)}
          value={inventoryChannel}
        >
          {inventoryChannels.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </label>
      <p>External dataset value: {inventoryChannel}</p>
    </section>
  )
}
