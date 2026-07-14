import { Link, NavLink } from 'react-router'

export function LinkNavLinkPanel() {
  return (
    <section className="route-lab-card" aria-labelledby="link-navlink-title">
      <p className="route-card-kicker">Part 3</p>
      <h2 id="link-navlink-title">Link and NavLink semantics</h2>
      <p>
        A Link preserves anchor navigation semantics while letting the router update location
        without a document reload. NavLink adds active-route evidence through aria-current.
      </p>
      <div className="route-link-grid" aria-label="Chapter 23 link examples">
        <Link to="/react/chapter-23?view=catalog#links">Object-style destination</Link>
        <Link replace to="/react/chapter-23?notice=replace">
          Replace current entry
        </Link>
        <NavLink to="/react/chapter-23" end>
          Active chapter route
        </NavLink>
      </div>
    </section>
  )
}
