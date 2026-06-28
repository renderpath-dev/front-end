import { useState } from 'react'
import { PrimitiveButton } from '../sellerhub-capstone-app/design-system/primitive-button'
import { StatusTabs } from '../sellerhub-capstone-app/design-system/status-tabs'

type PreviewStatus = 'ready' | 'review'

const previewOptions = [
  { label: 'Ready', value: 'ready' },
  { label: 'Review', value: 'review' },
] as const

export function DesignSystemShellPanel() {
  const [status, setStatus] = useState<PreviewStatus>('ready')

  return (
    <section className="chapter16-panel" aria-labelledby="design-system-title">
      <p className="chapter16-eyebrow">9.4 Design system shell</p>
      <h2 id="design-system-title">Reuse behavior and semantics through primitives</h2>
      <div className="chapter16-actions">
        <StatusTabs<PreviewStatus>
          controlsId="delivery-status-preview"
          label="Delivery status"
          onChange={setStatus}
          options={previewOptions}
          value={status}
        />
        <PrimitiveButton tone="secondary">Review {status}</PrimitiveButton>
      </div>
      <p
        aria-labelledby={`delivery-status-preview-${status}-tab`}
        id="delivery-status-preview"
        role="tabpanel"
      >
        Current delivery status: {status}
      </p>
    </section>
  )
}
