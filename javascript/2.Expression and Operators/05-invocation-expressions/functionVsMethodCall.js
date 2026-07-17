// Goal:
// Compare function calls and method calls.

"use strict";

function describeOwner(label) {
  return `${label}:${this?.ownerName}`;
}

const storeAccount = {
  ownerName: "Nora",
  describeOwner,
};

const detachedDescribeOwner = storeAccount.describeOwner;

console.log(storeAccount.describeOwner("method"));
console.log(detachedDescribeOwner("function"));
console.log(storeAccount.missingHandler?.("test"));
