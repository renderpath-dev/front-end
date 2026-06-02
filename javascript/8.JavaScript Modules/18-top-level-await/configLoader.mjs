// Goal:
// Export a value that is initialized with top-level await.

const simulatedConfigPromise = Promise.resolve({
  pageSize: 20,
  layoutMode: 'grid',
});

export const loadedConfig = await simulatedConfigPromise;
