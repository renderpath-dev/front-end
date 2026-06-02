// Goal:
// Export a generator that yields batches from a source list.

export function* createBatchGenerator(sourceList, batchSize) {
  for (
    let startIndex = 0;
    startIndex < sourceList.length;
    startIndex += batchSize
  ) {
    yield sourceList.slice(startIndex, startIndex + batchSize);
  }
}
