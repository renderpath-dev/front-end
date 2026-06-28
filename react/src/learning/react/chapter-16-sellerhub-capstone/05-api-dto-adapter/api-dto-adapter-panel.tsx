import { adaptProductDto } from '../sellerhub-capstone-app/shared/api/sellerhub-adapters'
import { assertProductDto } from '../sellerhub-capstone-app/shared/api/sellerhub-dto-contract'

const unknownResponse: unknown = {
  id: 'product-evidence',
  name: ' Evidence Lamp ',
  description: ' Runtime validated product ',
  priceInCents: 5200,
  inventoryCount: 4,
  status: 'ACTIVE',
}

assertProductDto(unknownResponse)
const product = adaptProductDto(unknownResponse)

export function ApiDtoAdapterPanel() {
  return (
    <section className="chapter16-panel" aria-labelledby="api-adapter-title">
      <p className="chapter16-eyebrow">9.5 API, DTO, and adapter</p>
      <h2 id="api-adapter-title">Validate unknown runtime data before adaptation</h2>
      <div className="chapter16-flow" aria-label="Data boundary">
        <span>unknown response</span>
        <span>DTO guard</span>
        <span>adapter</span>
        <strong>{product.name}</strong>
      </div>
    </section>
  )
}
