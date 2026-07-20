let loadCount = 0;
loadCount += 1;

module.exports = {
  loadCount,
  state: { requests: 0 },
};

if (require.main === module) {
  const first = require(__filename);
  const second = require(__filename);
  first.state.requests += 1;

  console.log(first === second);
  console.log(second.state.requests);
  console.log(second.loadCount);
}
