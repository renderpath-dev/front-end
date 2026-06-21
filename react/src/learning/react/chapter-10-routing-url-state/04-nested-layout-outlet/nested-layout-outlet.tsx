import { Link, Outlet, Route, Routes } from 'react-router'

function PracticeLayout() {
  return (
    <div className="routing-outlet-frame">
      <strong>Persistent practice layout</strong>
      <nav aria-label="Nested route practice" className="routing-practice-actions">
        <Link to="/practice/layout">Overview</Link>
        <Link to="/practice/layout/orders">Orders</Link>
      </nav>
      <Outlet />
    </div>
  )
}

function LayoutOverview() {
  return <p>The index route renders into the parent Outlet.</p>
}

function LayoutOrders() {
  return <p>The child orders route replaces only the Outlet content.</p>
}

export function NestedLayoutOutlet() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">04 / Nested layout</p>
      <h2>Parent layout owns shared UI; Outlet owns the child slot</h2>
      <div className="routing-practice-actions">
        <Link to="/practice/layout">Open nested layout</Link>
        <Link to="/practice/layout/orders">Open nested orders</Link>
      </div>
      <Routes>
        <Route element={<PracticeLayout />} path="/practice/layout">
          <Route element={<LayoutOverview />} index />
          <Route element={<LayoutOrders />} path="orders" />
        </Route>
      </Routes>
    </article>
  )
}
