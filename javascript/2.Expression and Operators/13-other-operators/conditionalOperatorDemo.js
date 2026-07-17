// Goal:
// Verify conditional, typeof, delete, void, and comma operators.

const permissionLevel = 2;
const accountRecord = { name: "Ava", temporaryToken: "token-1" };

const label = permissionLevel >= 2 ? "editor" : "viewer";
const deleteResult = delete accountRecord.temporaryToken;
const voidResult = void console.log("side effect from void");
const commaResult = (permissionLevel + 1, permissionLevel + 2, permissionLevel + 3);

console.log(label);
console.log(deleteResult);
console.log(accountRecord.temporaryToken);
console.log(voidResult);
console.log(commaResult);
console.log(typeof missingGlobalName);
