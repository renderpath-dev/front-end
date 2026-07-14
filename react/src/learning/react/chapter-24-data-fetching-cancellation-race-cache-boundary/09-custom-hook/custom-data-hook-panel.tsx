export function CustomDataHookPanel() {
  return (
    <section className="data-fetching-card" aria-labelledby="custom-data-hook-title">
      <p className="data-fetching-card__eyebrow">9.9</p>
      <h2 id="custom-data-hook-title">Focused custom data hook boundary</h2>
      <p>
        A custom hook can extract the request process while keeping criteria, resource
        key, fetcher, parser, abort cleanup, and race guard visible to the feature owner.
      </p>
      <p>
        The hook in this chapter returns state, resourceKey, refetch, and abort instead
        of hiding the ownership boundary behind a universal useFetch abstraction.
      </p>
    </section>
  )
}
