// Goal:
// Show why missing blocks can run a statement unconditionally.

const isValid = false;
let message = "start";

if (isValid)
  message = "valid";
message = "saved";

console.log(message);
