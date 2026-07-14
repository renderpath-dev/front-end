export type RouteChunkInput = {
  ownerRoute?: string
  sizeKb: number
  url: string
}

export type RouteChunkReview = RouteChunkInput & {
  issues: string[]
  status: 'pass' | 'review'
}

export function reviewRouteChunks(
  chunks: RouteChunkInput[],
  maxSizeKb = 180,
): RouteChunkReview[] {
  return chunks.map((chunk) => {
    const issues: string[] = []

    if (chunk.sizeKb > maxSizeKb) {
      issues.push('Chunk is over the route budget.')
    }

    if (!chunk.ownerRoute) {
      issues.push('Chunk does not have an owning route.')
    }

    return {
      ...chunk,
      issues,
      status: issues.length === 0 ? 'pass' : 'review',
    }
  })
}

export function countChunksNeedingReview(chunks: RouteChunkReview[]): number {
  return chunks.filter((chunk) => chunk.status === 'review').length
}
