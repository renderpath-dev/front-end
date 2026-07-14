import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { normalizeCodeLanguage } from '../code-languages'
import '../styles/code-window.css'

type CopyState = 'idle' | 'copied' | 'failed'

type CodeWindowProps = {
  code: string
  label?: string
  language?: string
  animated?: boolean
}

export function CodeWindow({
  animated = false,
  code,
  label,
  language = 'plain',
}: CodeWindowProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const resetTimerRef = useRef<number | null>(null)
  const normalizedLanguage = normalizeCodeLanguage(language)
  const visibleLabel = label ?? language.toUpperCase()

  useEffect(
    () => () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
      }
    },
    [],
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current)
    }

    resetTimerRef.current = window.setTimeout(() => setCopyState('idle'), 1800)
  }

  const copyLabel =
    copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy'

  return (
    <figure
      className={`code-window${animated ? ' code-window-animated' : ''}`}
      data-language={normalizedLanguage}
    >
      <figcaption className="code-window-titlebar">
        <span className="code-window-controls" aria-hidden="true">
          <span className="code-window-control code-window-control-red" />
          <span className="code-window-control code-window-control-yellow" />
          <span className="code-window-control code-window-control-green" />
        </span>
        <span className="code-window-label">{visibleLabel}</span>
        <button
          aria-label={`Copy ${visibleLabel} code`}
          className="code-copy-button"
          onClick={handleCopy}
          type="button"
        >
          <CopyIcon />
          <span aria-live="polite">{copyLabel}</span>
        </button>
      </figcaption>
      <Highlight code={code.trimEnd()} language={normalizedLanguage} theme={themes.nightOwl}>
        {({ className, getLineProps, getTokenProps, style, tokens }) => (
          <pre className={`${className} code-window-pre`} style={style} tabIndex={0}>
            <code>
              {tokens.map((line, lineIndex) => {
                const lineStyle = {
                  '--code-line-index': lineIndex,
                } as CSSProperties

                return (
                  <span
                    {...getLineProps({ line })}
                    className="code-window-line"
                    key={lineIndex}
                    style={lineStyle}
                  >
                    <span className="code-window-line-number" aria-hidden="true">
                      {lineIndex + 1}
                    </span>
                    <span className="code-window-line-content">
                      {line.map((token, tokenIndex) => (
                        <span {...getTokenProps({ token })} key={tokenIndex} />
                      ))}
                    </span>
                  </span>
                )
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </figure>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect height="10" rx="1.5" width="10" x="7" y="7" />
      <path d="M13 7V4.5A1.5 1.5 0 0 0 11.5 3h-7A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13H7" />
    </svg>
  )
}
