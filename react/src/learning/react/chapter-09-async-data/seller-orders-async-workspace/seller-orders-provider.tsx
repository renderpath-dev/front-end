import type { ReactNode } from 'react'
import { SellerOrdersContext } from './seller-orders-context'
import { useSellerOrdersResource } from './use-seller-orders-resource'

export function SellerOrdersProvider({ children }: { children: ReactNode }) {
  const resource = useSellerOrdersResource()

  return <SellerOrdersContext value={resource}>{children}</SellerOrdersContext>
}
