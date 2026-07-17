// Goal:
// Show automatic semicolon insertion after return line break.

function buildResultWrong() {
  return
  {
    ok: true
  };
}

function buildResultRight() {
  return {
    ok: true,
  };
}

console.log(buildResultWrong());
console.log(buildResultRight());
