export function StaticResumeBoundaryPanel() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.9 static APIs</p>
      <h3>Static prerender and resume ownership</h3>
      <p>
        Static APIs generate HTML ahead of request interaction. Resume APIs continue a
        postponed render in a runtime that owns stored state and streaming output.
      </p>
      <ul className="dom-boundary-list">
        <li>prerender and prerenderToNodeStream belong to static generation boundaries.</li>
        <li>resume, resumeToPipeableStream, and resume-and-prerender APIs need framework ownership.</li>
        <li>Application components should not import these APIs as ordinary UI helpers.</li>
      </ul>
    </article>
  )
}
