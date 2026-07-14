import { useImperativeHandle, useRef, useState } from 'react'
import type { Ref } from 'react'

type CommandPanelHandle = {
  focusCommand: () => void
  clearCommand: () => void
}

type CommandInputProps = {
  command: string
  onCommandChange: (nextCommand: string) => void
  ref?: Ref<CommandPanelHandle>
}

export function ImperativeCommandPanel() {
  const commandHandleRef = useRef<CommandPanelHandle | null>(null)
  const [command, setCommand] = useState('sync-catalog')

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">Final lab · useImperativeHandle</p>
      <h3>Imperative command panel</h3>
      <CommandInput command={command} onCommandChange={setCommand} ref={commandHandleRef} />
      <div className="api-gap-button-row">
        <button
          className="api-gap-button api-gap-button-secondary"
          onClick={() => commandHandleRef.current?.focusCommand()}
          type="button"
        >
          Focus command
        </button>
        <button
          className="api-gap-button api-gap-button-secondary"
          onClick={() => commandHandleRef.current?.clearCommand()}
          type="button"
        >
          Clear command
        </button>
      </div>
    </article>
  )
}

function CommandInput({ command, onCommandChange, ref }: CommandInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useImperativeHandle(
    ref,
    () => ({
      focusCommand() {
        inputRef.current?.focus()
      },
      clearCommand() {
        onCommandChange('')
      },
    }),
    [onCommandChange],
  )

  return (
    <form className="api-gap-form">
      <label htmlFor="sellerhub-command">SellerHub command</label>
      <input
        id="sellerhub-command"
        onChange={(event) => onCommandChange(event.currentTarget.value)}
        ref={inputRef}
        value={command}
      />
    </form>
  )
}
