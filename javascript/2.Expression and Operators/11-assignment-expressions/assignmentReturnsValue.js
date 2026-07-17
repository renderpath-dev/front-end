// Goal:
// Verify that assignment expressions evaluate to the written value.

let statusLabel;
const result = (statusLabel = "ready");

console.log(result);
console.log(statusLabel);

if ((statusLabel = "done")) {
  console.log(statusLabel);
}
