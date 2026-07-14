import { useInsertionEffect, useState } from 'react'

const runtimeStyleElementId = 'chapter-17-runtime-style'

export function CssInsertionBoundaryPanel() {
  const [accentColor, setAccentColor] = useState('#f97316')

  useRuntimeStyleRule(`
    .api-gap-runtime-style {
      border-color: ${accentColor};
      box-shadow: inset 0 0 0 1px ${accentColor};
    }
  `)

  return (
    <article className="api-gap-card">
      <p className="api-gap-kicker">useInsertionEffect</p>
      <h3>CSS insertion boundary</h3>
      <form className="api-gap-form">
        <label htmlFor="insertion-accent-color">Runtime accent color</label>
        <input
          id="insertion-accent-color"
          onChange={(event) => setAccentColor(event.currentTarget.value)}
          type="color"
          value={accentColor}
        />
      </form>
      <div className="api-gap-measured-box api-gap-runtime-style">
        <strong>Runtime style target</strong>
        <p>
          The rule is inserted before layout effects read the DOM. This is a CSS
          library boundary, not a normal data-fetching effect.
        </p>
      </div>
    </article>
  )
}

function useRuntimeStyleRule(ruleText: string) {
  useInsertionEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    let styleElement = document.getElementById(runtimeStyleElementId) as HTMLStyleElement | null

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = runtimeStyleElementId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = ruleText

    return () => {
      styleElement?.remove()
    }
  }, [ruleText])
}
