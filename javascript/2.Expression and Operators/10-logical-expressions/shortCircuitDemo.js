// Goal:
// Compare short-circuit behavior, || defaults, ?? defaults, and logical assignment.

const requestedPage = 0;
const missingPage = null;
let cacheConfig = { timeout: 0, retries: undefined };

function createFallbackPage() {
  console.log("fallback created");
  return 1;
}

console.log(requestedPage || createFallbackPage());
console.log(requestedPage ?? createFallbackPage());
console.log(missingPage ?? createFallbackPage());

cacheConfig.timeout ||= 30;
cacheConfig.retries ??= 3;

console.log(cacheConfig.timeout);
console.log(cacheConfig.retries);
console.log(false && createFallbackPage());
