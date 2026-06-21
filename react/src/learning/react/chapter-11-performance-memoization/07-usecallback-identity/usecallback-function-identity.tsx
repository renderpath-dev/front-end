import { useCallback, useEffect, useState } from 'react'

type CallbackIdentityReporterProps = {
  label: string
  onAction: () => void
}

function CallbackIdentityReporter({ label, onAction }: CallbackIdentityReporterProps) {
  useEffect(() => {
    console.info(`${label} callback identity changed`)
  }, [label, onAction])

  return <button onClick={onAction} type="button">Run {label} callback</button>
}

export function UseCallbackFunctionIdentity() {
  const [parentTick, setParentTick] = useState(0)
  const [actionCount, setActionCount] = useState(0)
  const stableAction = useCallback(() => {
    setActionCount((count) => count + 1)
  }, [])
  const inlineAction = () => {
    setActionCount((count) => count + 1)
  }

  return (
    <article className="performance-practice-panel">
      <p className="performance-practice-kicker">07 / useCallback identity</p>
      <h2>useCallback caches a function reference, not its execution result</h2>
      <button onClick={() => setParentTick((tick) => tick + 1)} type="button">
        Re-render parent ({parentTick})
      </button>
      <div className="performance-control-row">
        <CallbackIdentityReporter label="inline" onAction={inlineAction} />
        <CallbackIdentityReporter label="stable" onAction={stableAction} />
      </div>
      <p>Actions completed: {actionCount}</p>
      <p className="performance-practice-note">
        Watch the console: the inline dependency changes on each render; the cached callback does not.
      </p>
    </article>
  )
}
