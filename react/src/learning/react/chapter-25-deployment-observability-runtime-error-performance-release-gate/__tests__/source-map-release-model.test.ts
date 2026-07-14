import { describe, expect, it } from 'vitest'
import { createSourceMapReleaseRecord } from '../06-source-map/source-map-release-model'

describe('source map release model', () => {
  it('records release id and privacy boundary without uploading', () => {
    const record = createSourceMapReleaseRecord({
      exposure: 'private-upload-only',
      mapFileCount: 2,
      releaseId: 'release-25',
      uploadTarget: 'private-monitoring-boundary',
    })

    expect(record.releaseId).toBe('release-25')
    expect(record.uploadReady).toBe(true)
    expect(record.uploadPerformed).toBe(false)
    expect(record.privacyBoundary).toContain('private')
  })
})
