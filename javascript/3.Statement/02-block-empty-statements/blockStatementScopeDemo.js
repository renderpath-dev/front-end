// Goal:
// Verify that block statements create block scope for let and const.

const statusLabel = "outer";

{
  const statusLabel = "inner";
  let retryCount = 2;
  retryCount += 1;
  console.log(statusLabel);
  console.log(retryCount);
}

console.log(statusLabel);
