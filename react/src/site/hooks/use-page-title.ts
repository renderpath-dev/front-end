import { useEffect } from 'react'

const PRODUCT_NAME = 'React + TypeScript Learning Lab'

export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${PRODUCT_NAME}` : PRODUCT_NAME
  }, [pageTitle])
}
