import { describe, expect, test } from 'vitest'
import {
  resolvePathRelativeLink,
  sellerHubRelativeLinkCases,
} from '../08-relative-links/relative-link-model'

describe('resolvePathRelativeLink', () => {
  test('resolves the documented SellerHub relative link cases', () => {
    for (const linkCase of sellerHubRelativeLinkCases) {
      expect(resolvePathRelativeLink(linkCase.currentPath, linkCase.target)).toBe(
        linkCase.expectedPath,
      )
    }
  })

  test('normalizes extra slashes and trailing slash', () => {
    expect(resolvePathRelativeLink('/sellerhub//catalog/', './product-201/')).toBe(
      '/sellerhub/catalog/product-201',
    )
  })
})
