// Goal:
// Verify that CommonJS modules are cached after the first require().

console.log('requestCounter module executed');

let requestCount = 0;

function increaseRequestCount() {
  requestCount += 1;
  return requestCount;
}

module.exports = {
  increaseRequestCount,
};
