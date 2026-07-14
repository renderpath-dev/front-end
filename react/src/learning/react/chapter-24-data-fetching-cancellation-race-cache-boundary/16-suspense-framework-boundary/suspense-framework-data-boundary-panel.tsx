export function SuspenseFrameworkDataBoundaryPanel() {
  return (
    <section className="data-fetching-card" aria-labelledby="suspense-boundary-title">
      <p className="data-fetching-card__eyebrow">9.16</p>
      <h2 id="suspense-boundary-title">Suspense, use, and framework data boundary</h2>
      <p>
        Suspense can show pending UI for a suspended subtree, and use can read a promise
        or context in supported boundaries. This Vite client lab documents those APIs as
        reading boundaries instead of faking framework data loading.
      </p>
    </section>
  )
}
