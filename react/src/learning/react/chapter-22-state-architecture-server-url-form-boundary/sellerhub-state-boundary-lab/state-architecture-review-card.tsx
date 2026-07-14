const reviewItems = [
  'Every value has one named owner.',
  'Derived values are calculated from source state during render.',
  'URL state stays small, serializable, and user-visible.',
  'Request status is separate from confirmed server data.',
  'Optimistic items are marked as pending and can be rolled back.',
  'Entity identity uses ids instead of duplicated objects.',
] as const

export function StateArchitectureReviewCard() {
  return (
    <section className="state-lab-card state-lab-card-wide" aria-labelledby="review-card-title">
      <p className="state-card-kicker">Final lab part 8</p>
      <h3 id="review-card-title">State architecture review card</h3>
      <ul className="state-review-list">
        {reviewItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
