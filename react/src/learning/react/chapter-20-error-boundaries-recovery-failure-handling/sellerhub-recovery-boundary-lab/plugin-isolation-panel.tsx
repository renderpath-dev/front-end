import { useState } from 'react'
import { SellerHubErrorBoundary } from './sellerhub-error-boundary'

function RiskyPlugin({ enabled }: { enabled: boolean }) {
  if (enabled) {
    throw new Error('Promotion plugin failed during render.')
  }

  return (
    <article className="recovery-widget-card">
      <p className="recovery-card-kicker">Plugin slot</p>
      <h3>Promotion plugin is isolated.</h3>
      <p>The dashboard shell can continue if this optional plugin fails.</p>
    </article>
  )
}

export function PluginIsolationPanel() {
  const [pluginCrashEnabled, setPluginCrashEnabled] = useState(false)

  return (
    <section className="recovery-card" aria-labelledby="plugin-isolation-title">
      <h3 id="plugin-isolation-title">Plugin isolation panel</h3>
      <p>
        Optional extensions need a boundary at the plugin slot, not at the entire app
        shell.
      </p>
      <SellerHubErrorBoundary
        boundaryName="Plugin slot boundary"
        fallbackTitle="Optional plugin failed safely."
        onReset={() => setPluginCrashEnabled(false)}
        resetButtonLabel="Disable failed plugin"
        resetKeys={[pluginCrashEnabled]}
      >
        <RiskyPlugin enabled={pluginCrashEnabled} />
      </SellerHubErrorBoundary>
      <button type="button" onClick={() => setPluginCrashEnabled(true)}>
        Crash optional plugin
      </button>
    </section>
  )
}
