import { resolvePathRelativeLink, sellerHubRelativeLinkCases } from './relative-link-model'

export function RelativeLinkResolutionPanel() {
  return (
    <section className="route-lab-card" aria-labelledby="relative-link-title">
      <p className="route-card-kicker">Part 8</p>
      <h2 id="relative-link-title">Relative links and resolved paths</h2>
      <p>
        Relative links reduce repeated prefixes, but the team must know whether a link is
        route-relative, path-relative, or absolute before moving a layout.
      </p>
      <ul className="route-list">
        {sellerHubRelativeLinkCases.map((linkCase) => (
          <li key={`${linkCase.currentPath}:${linkCase.target}`}>
            <code className="route-code">{linkCase.target}</code> from{' '}
            <code className="route-code">{linkCase.currentPath}</code> resolves to{' '}
            <code className="route-code">
              {resolvePathRelativeLink(linkCase.currentPath, linkCase.target)}
            </code>
          </li>
        ))}
      </ul>
    </section>
  )
}
