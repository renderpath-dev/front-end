// Goal:
// Show how return in finally overrides an earlier return.

function getStatusWrong() {
  try {
    return "try result";
  } finally {
    return "finally result";
  }
}

console.log(getStatusWrong());
