import { useEffect, useState } from 'react'

type WorkspaceMode = 'catalog' | 'orders'

export function EventHandlerVsEffect() {
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('catalog')
  const [lastAction, setLastAction] = useState('No action recorded.')

  useEffect(() => {
    document.body.dataset.sellerWorkspace = workspaceMode

    return () => {
      delete document.body.dataset.sellerWorkspace
    }
  }, [workspaceMode])

  function handleModeChange(nextMode: WorkspaceMode): void {
    setWorkspaceMode(nextMode)
    setLastAction(`The user selected ${nextMode} mode.`)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Event or effect</p>
      <h3>Separate intent from synchronization</h3>
      <div className="button-row">
        <button onClick={() => handleModeChange('catalog')}>Catalog</button>
        <button onClick={() => handleModeChange('orders')}>Orders</button>
      </div>
      <p>Current mode: {workspaceMode}</p>
      <p aria-live="polite">{lastAction}</p>
    </section>
  )
}
