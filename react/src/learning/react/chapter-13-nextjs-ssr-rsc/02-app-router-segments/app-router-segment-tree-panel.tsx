import {
  flattenSegmentTree,
  sellerHubSegmentTree,
} from './app-router-segment-tree'

export function AppRouterSegmentTreePanel() {
  const segments = flattenSegmentTree(sellerHubSegmentTree)

  return (
    <section className="chapter13-panel" aria-labelledby="segment-tree-title">
      <p className="chapter13-kicker">App Router</p>
      <h2 id="segment-tree-title">Route segments select layouts and pages</h2>
      <p>
        This tree is a learning model inside Vite. It mirrors an App Router structure
        without creating a real Next.js root app directory.
      </p>
      <div className="chapter13-table" role="table" aria-label="App Router segment tree">
        <div role="row" className="chapter13-table-row chapter13-table-head">
          <span role="columnheader">Pathname</span>
          <span role="columnheader">Segment</span>
          <span role="columnheader">Special files</span>
        </div>
        {segments.map((segment) => (
          <div role="row" className="chapter13-table-row" key={segment.pathname}>
            <span role="cell">{segment.pathname}</span>
            <span role="cell">{`${'  '.repeat(segment.depth)}${segment.segment}`}</span>
            <span role="cell">{segment.fileList}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
