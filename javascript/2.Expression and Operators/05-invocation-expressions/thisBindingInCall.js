// Goal:
// Verify explicit this binding with call and apply.

function formatAccount(prefix, suffix) {
  return `${prefix}:${this.owner}:${suffix}`;
}

const accountContext = { owner: "Ava" };

console.log(formatAccount.call(accountContext, "call", "done"));
console.log(formatAccount.apply(accountContext, ["apply", "done"]));
