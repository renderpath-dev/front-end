import { ArrayRenderingWithMap } from './01-array-rendering/array-rendering-with-map'
import { ConditionalRenderingBranches } from './02-conditional-rendering/conditional-rendering-branches'
import { UiStateBranches } from './03-ui-state-branches/ui-state-branches'
import { KeyIdentityStableId } from './04-key-identity/key-identity-stable-id'
import { KeyIsNotProp } from './05-key-is-not-prop/key-is-not-prop'
import { IndexKeyMistake } from './06-index-key-mistake/index-key-mistake'
import { FilterSortMapBoundary } from './07-filter-sort-map-boundary/filter-sort-map-boundary'
import { TypedListRendering } from './08-typed-list-rendering/typed-list-rendering'
import { ProductListMiniProject } from './product-list-mini-project/product-list-mini-project'
import './chapter-05-practice.css'

export function Chapter05PracticeRoot() {
  return (
    <main className="chapter-five-shell">
      <header className="chapter-five-header">
        <p className="chapter-five-eyebrow">React Chapter 05</p>
        <h1>Lists, keys, and conditional rendering</h1>
        <p>
          Transform typed arrays into UI descriptions, preserve sibling identity with stable
          keys, and model loading, error, empty, and success states explicitly.
        </p>
      </header>

      <section aria-labelledby="chapter-five-concepts-heading">
        <div className="chapter-five-section-heading">
          <div>
            <p className="chapter-five-section-index">01</p>
            <h2 id="chapter-five-concepts-heading">Mechanism practice</h2>
          </div>
          <p>Eight focused exercises connect JavaScript arrays to React identity.</p>
        </div>

        <div className="chapter-five-practice-grid">
          <ArrayRenderingWithMap />
          <ConditionalRenderingBranches />
          <UiStateBranches />
          <KeyIdentityStableId />
          <KeyIsNotProp />
          <FilterSortMapBoundary />
          <TypedListRendering />
          <IndexKeyMistake />
        </div>
      </section>

      <section className="chapter-five-project" aria-labelledby="chapter-five-project-heading">
        <div className="chapter-five-section-heading">
          <div>
            <p className="chapter-five-section-index">02</p>
            <h2 id="chapter-five-project-heading">Integrated mini project</h2>
          </div>
          <p>A SellerHub-inspired product list without backend or routing dependencies.</p>
        </div>
        <ProductListMiniProject />
      </section>
    </main>
  )
}
