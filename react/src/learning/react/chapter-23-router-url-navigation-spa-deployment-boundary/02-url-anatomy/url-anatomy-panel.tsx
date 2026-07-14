import { describeUrlOwnership, parseUrlLocation } from './url-location-model'

const exampleUrl = '/sellerhub/catalog/product-201?channel=online&sort=margin#reviews'

export function UrlAnatomyPanel() {
  const parsedLocation = parseUrlLocation(exampleUrl)

  return (
    <section className="route-lab-card" aria-labelledby="url-anatomy-title">
      <p className="route-card-kicker">Part 2</p>
      <h2 id="url-anatomy-title">Browser URL anatomy and location object</h2>
      <p>{describeUrlOwnership(exampleUrl)}</p>
      <ul className="route-list">
        <li>
          Pathname owns page identity: <code className="route-code">{parsedLocation.pathname}</code>
        </li>
        <li>
          Search owns shareable filters: <code className="route-code">{parsedLocation.search}</code>
        </li>
        <li>
          Hash owns in-page target: <code className="route-code">{parsedLocation.hash}</code>
        </li>
        <li>
          Search entries: <code className="route-code">{parsedLocation.searchEntries.length}</code>
        </li>
      </ul>
    </section>
  )
}
