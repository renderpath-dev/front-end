export type SourceMapExposure = 'disabled' | 'private-upload-only' | 'public-asset'

export type SourceMapReleaseInput = {
  exposure: SourceMapExposure
  mapFileCount: number
  releaseId: string
  uploadTarget?: string
}

export type SourceMapReleaseRecord = {
  canDiagnoseMinifiedStack: boolean
  privacyBoundary: string
  releaseId: string
  uploadPerformed: false
  uploadReady: boolean
}

export function createSourceMapReleaseRecord(
  input: SourceMapReleaseInput,
): SourceMapReleaseRecord {
  const uploadReady =
    input.exposure === 'private-upload-only' &&
    input.mapFileCount > 0 &&
    Boolean(input.uploadTarget) &&
    input.releaseId.length > 0

  return {
    canDiagnoseMinifiedStack: input.mapFileCount > 0,
    privacyBoundary: getPrivacyBoundary(input.exposure),
    releaseId: input.releaseId,
    uploadPerformed: false,
    uploadReady,
  }
}

export function getPrivacyBoundary(exposure: SourceMapExposure): string {
  if (exposure === 'public-asset') {
    return 'Public source maps may expose source context and require explicit review.'
  }

  if (exposure === 'private-upload-only') {
    return 'Source maps stay private and are associated with a release id before upload.'
  }

  return 'Source maps are disabled, so minified stack traces cannot be mapped here.'
}
