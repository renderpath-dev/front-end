import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export function NavigationAccessibilityPanel() {
  const location = useLocation()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [location.pathname])

  return (
    <section className="route-lab-card" aria-labelledby="navigation-a11y-title">
      <p className="route-card-kicker">Part 13</p>
      <h2 id="navigation-a11y-title" ref={headingRef} tabIndex={-1}>
        Navigation accessibility boundary
      </h2>
      <p>
        Navigation changes should leave evidence for keyboard and assistive technology users:
        active links, a page heading, focus repair, and a scroll restoration decision.
      </p>
      <ul className="route-list">
        <li>NavLink can expose aria-current on the active route.</li>
        <li>The new page region needs a stable heading.</li>
        <li>Focus repair should target the new page, not a decorative container.</li>
      </ul>
    </section>
  )
}
