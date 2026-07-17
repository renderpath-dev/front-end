// Goal:
// Export a value initialized by top-level await

const configPromise = Promise.resolve({
  apiBaseUrl: 'https://api.github.com/users/',
  retryCount : 2,
});

export const runtimeConfig = await configPromise;