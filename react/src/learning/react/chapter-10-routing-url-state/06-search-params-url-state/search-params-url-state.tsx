import { useSearchParams } from 'react-router'

const orderStatuses = ['all', 'pending', 'shipped'] as const

type OrderStatus = (typeof orderStatuses)[number]

function parseOrderStatus(value: string | null): OrderStatus {
  return orderStatuses.includes(value as OrderStatus) ? (value as OrderStatus) : 'all'
}

export function SearchParamsUrlState() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = parseOrderStatus(searchParams.get('status'))

  function selectStatus(nextStatus: OrderStatus): void {
    setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus })
  }

  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">06 / URL state</p>
      <h2>Search params hold shareable filter criteria</h2>
      <div className="routing-segmented-control" role="group" aria-label="Order status filter">
        {orderStatuses.map((option) => (
          <button
            aria-pressed={status === option}
            key={option}
            onClick={() => selectStatus(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <p>
        Parsed status: <code>{status}</code>
      </p>
      <p className="routing-practice-note">
        URLSearchParams returns runtime strings. The parser narrows unknown URL input to the
        supported union.
      </p>
    </article>
  )
}
