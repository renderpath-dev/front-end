import { useState } from 'react'
import { initialErrorLogEntries } from './sellerhub-recovery-boundary-data'
import type { ErrorLogEntry } from './sellerhub-recovery-boundary-data'
import { SellerHubErrorBoundary } from './sellerhub-error-boundary'

function LoggingPreviewCrash({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Error log preview captured a render failure.')
  }

  return <p className="recovery-success-note">Error logging preview is idle.</p>
}

export function ErrorLogPreview() {
  const [shouldCrash, setShouldCrash] = useState(false)
  const [logs, setLogs] = useState<ErrorLogEntry[]>(initialErrorLogEntries)

  return (
    <section className="recovery-card" aria-labelledby="error-log-title">
      <h3 id="error-log-title">Error log preview</h3>
      <p>
        Logging happens in the boundary side-effect path. It records safe diagnostics but
        does not decide the recovery UI.
      </p>
      <SellerHubErrorBoundary
        boundaryName="Logging preview boundary"
        fallbackTitle="Logging preview failed safely."
        onError={(error, info) =>
          setLogs((currentLogs) => [
            {
              boundary: 'Logging preview boundary',
              componentStack: info.componentStack ?? 'No component stack',
              id: `log-${currentLogs.length + 1}`,
              message: error.message,
              status: 'queued',
            },
            ...currentLogs,
          ])
        }
        onReset={() => setShouldCrash(false)}
        resetButtonLabel="Reset logging preview"
        resetKeys={[shouldCrash]}
      >
        <LoggingPreviewCrash shouldCrash={shouldCrash} />
      </SellerHubErrorBoundary>
      <button type="button" onClick={() => setShouldCrash(true)}>
        Capture render failure
      </button>
      <ul className="recovery-log-list" aria-label="Captured error log preview">
        {logs.map((log) => (
          <li key={log.id}>
            <strong>{log.boundary}</strong>: {log.message}
          </li>
        ))}
      </ul>
    </section>
  )
}
