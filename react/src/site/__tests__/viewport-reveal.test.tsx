import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useViewportReveal } from '../hooks/use-viewport-reveal'

const cardLabels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
const observerInstances: IntersectionObserverMock[] = []

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null
  readonly rootMargin: string
  readonly thresholds: readonly number[]
  readonly observe = vi.fn((target: Element) => {
    this.observedTargets.add(target)
  })
  readonly unobserve = vi.fn((target: Element) => {
    this.observedTargets.delete(target)
  })
  readonly disconnect = vi.fn(() => {
    this.observedTargets.clear()
  })

  private readonly callback: IntersectionObserverCallback
  private readonly observedTargets = new Set<Element>()

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.callback = callback
    this.root = options.root ?? null
    this.rootMargin = options.rootMargin ?? '0px'
    this.thresholds = Array.isArray(options.threshold)
      ? [...options.threshold]
      : [options.threshold ?? 0]
    observerInstances.push(this)
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  trigger(target: Element, isIntersecting: boolean) {
    const targetRectangle = target.getBoundingClientRect()

    this.callback(
      [
        {
          boundingClientRect: targetRectangle,
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: targetRectangle,
          isIntersecting,
          rootBounds: null,
          target,
          time: 0,
        },
      ],
      this,
    )
  }
}

function RevealGroupFixture() {
  const groupRef = useViewportReveal<HTMLDivElement>()

  return (
    <div data-testid="reveal-group" ref={groupRef}>
      {cardLabels.map((label) => (
        <article data-reveal key={label}>
          {label}
        </article>
      ))}
    </div>
  )
}

function createMediaQueryList(query: string, matches: boolean): MediaQueryList {
  return {
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
    matches,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  }
}

describe('useViewportReveal', () => {
  beforeEach(() => {
    observerInstances.length = 0
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('observes a card group with one shared observer and a capped stagger', () => {
    render(<RevealGroupFixture />)

    const group = screen.getByTestId('reveal-group')
    const targets = Array.from(group.querySelectorAll('[data-reveal]'))
    const observer = observerInstances[0]

    expect(observerInstances).toHaveLength(1)
    expect(observer.root).toBeNull()
    expect(observer.rootMargin).toBe('0px 0px -8% 0px')
    expect(observer.thresholds).toEqual([0.12])
    expect(observer.observe).toHaveBeenCalledTimes(cardLabels.length)
    expect(group).toHaveAttribute('data-reveal-ready', 'true')
    expect(targets[0]).toHaveStyle({ '--reveal-delay': '0ms' })
    expect(targets[1]).toHaveStyle({ '--reveal-delay': '70ms' })
    expect(targets[5]).toHaveStyle({ '--reveal-delay': '280ms' })
  })

  it('reveals and unobserves only intersecting targets', () => {
    render(<RevealGroupFixture />)

    const targets = screen.getByTestId('reveal-group').querySelectorAll('[data-reveal]')
    const observer = observerInstances[0]

    act(() => observer.trigger(targets[0], false))
    expect(targets[0]).not.toHaveAttribute('data-reveal-visible')
    expect(observer.unobserve).not.toHaveBeenCalled()

    act(() => observer.trigger(targets[0], true))
    expect(targets[0]).toHaveAttribute('data-reveal-visible', 'true')
    expect(observer.unobserve).toHaveBeenCalledOnce()
    expect(observer.unobserve).toHaveBeenCalledWith(targets[0])
  })

  it('disconnects the group observer during cleanup', () => {
    const { unmount } = render(<RevealGroupFixture />)
    const observer = observerInstances[0]

    unmount()

    expect(observer.disconnect).toHaveBeenCalledOnce()
  })

  it('leaves content visible when IntersectionObserver is unsupported', () => {
    vi.stubGlobal('IntersectionObserver', undefined)

    render(<RevealGroupFixture />)

    const group = screen.getByTestId('reveal-group')
    expect(group).not.toHaveAttribute('data-reveal-ready')
    expect(observerInstances).toHaveLength(0)
  })

  it('leaves content visible when reduced motion is requested', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) =>
      createMediaQueryList(query, query === '(prefers-reduced-motion: reduce)'),
    )

    render(<RevealGroupFixture />)

    const group = screen.getByTestId('reveal-group')
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
    expect(group).not.toHaveAttribute('data-reveal-ready')
    expect(observerInstances).toHaveLength(0)
  })
})
