import { useLayoutEffect, useRef } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const REVEAL_SELECTOR = '[data-reveal]'
const STAGGER_STEP_MS = 70
const MAX_STAGGER_MS = 280

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.12,
}

export function useViewportReveal<ElementType extends HTMLElement>() {
  const groupRef = useRef<ElementType>(null)

  useLayoutEffect(() => {
    const group = groupRef.current

    if (!group) {
      return
    }

    const targets = Array.from(group.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches

    if (
      targets.length === 0 ||
      prefersReducedMotion ||
      typeof window.IntersectionObserver !== 'function'
    ) {
      return
    }

    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        entry.target.setAttribute('data-reveal-visible', 'true')
        observer.unobserve(entry.target)
      })
    }, observerOptions)

    targets.forEach((target, index) => {
      const delay = Math.min(index * STAGGER_STEP_MS, MAX_STAGGER_MS)
      target.style.setProperty('--reveal-delay', `${delay}ms`)
      observer.observe(target)
    })

    group.setAttribute('data-reveal-ready', 'true')

    return () => {
      observer.disconnect()
      group.removeAttribute('data-reveal-ready')

      targets.forEach((target) => {
        target.removeAttribute('data-reveal-visible')
        target.style.removeProperty('--reveal-delay')
      })
    }
  }, [])

  return groupRef
}
