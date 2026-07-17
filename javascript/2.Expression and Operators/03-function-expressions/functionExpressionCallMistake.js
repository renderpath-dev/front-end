// Goal:
// Show the difference between a function reference and a function call result.

function createHandler() {
  console.log("handler created");
  return "handler-result";
}

const calledValue = createHandler();
const functionReference = createHandler;

console.log(calledValue);
console.log(typeof functionReference);
