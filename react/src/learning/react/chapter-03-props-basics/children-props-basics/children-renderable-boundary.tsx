import type { ReactNode } from 'react'

type RenderableBoxProps = {
  children: ReactNode
}

function RenderableBox({ children }: RenderableBoxProps) {
  return <article className="props-card">{children}</article>
}

export function ChildrenRenderableBoundary() {
  return (
    <section className="props-panel">
      <RenderableBox>
        <h2>Renderable children</h2>
        <p>String, number, JSX elements, null, and arrays can be React nodes.</p>
        {null}
        {false}
      </RenderableBox>
    </section>
  )
}
