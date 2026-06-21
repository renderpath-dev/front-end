import { useEffect, useRef, useState } from 'react'
import { sellerProducts } from './seller-search-data'
import { SellerSearchInput } from './seller-search-input'
import { SellerSearchResults } from './seller-search-results'
import type { SearchSyncStatus, SellerProductCategory } from './seller-search-types'
import './seller-search-sync-mini-project.css'

export function SellerSearchSyncWorkspace() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<SellerProductCategory>('all')
  const [searchStatus, setSearchStatus] = useState<SearchSyncStatus>('pending')
  const [syncedCriteria, setSyncedCriteria] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const requestSequenceRef = useRef(0)

  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = sellerProducts.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery)
    const matchesCategory = category === 'all' || product.category === category
    return matchesQuery && matchesCategory
  })

  useEffect(() => {
    document.body.dataset.sellerSearchResultCount = String(visibleProducts.length)

    return () => {
      delete document.body.dataset.sellerSearchResultCount
    }
  }, [visibleProducts.length])

  useEffect(() => {
    const requestId = requestSequenceRef.current + 1
    requestSequenceRef.current = requestId
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => {
      if (!controller.signal.aborted && requestId === requestSequenceRef.current) {
        const criteria = `${query || 'all names'} / ${category}`
        setSyncedCriteria(criteria)
        setSearchStatus('success')
      }
    }, 550)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [category, query])

  function handleQueryChange(nextQuery: string): void {
    setQuery(nextQuery)
    setSearchStatus('pending')
  }

  function handleCategoryChange(nextCategory: SellerProductCategory): void {
    setCategory(nextCategory)
    setSearchStatus('pending')
  }

  return (
    <section className="seller-search-project" aria-labelledby="seller-search-project-title">
      <header className="seller-search-project-header">
        <div>
          <p className="project-eyebrow">SellerHub learning connection</p>
          <h2 id="seller-search-project-title">Seller Search Sync Workspace</h2>
          <p>
            Keep local derived results separate from browser and asynchronous synchronization.
          </p>
        </div>
        <button onClick={() => searchInputRef.current?.focus()}>Focus product search</button>
      </header>

      <SellerSearchInput
        category={category}
        inputRef={searchInputRef}
        onCategoryChange={handleCategoryChange}
        onQueryChange={handleQueryChange}
        query={query}
      />

      <SellerSearchResults
        products={visibleProducts}
        status={searchStatus}
        syncedCriteria={syncedCriteria}
      />
    </section>
  )
}
