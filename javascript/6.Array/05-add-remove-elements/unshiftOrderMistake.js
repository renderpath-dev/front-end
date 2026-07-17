// Goal:
// Verify that one unshift call with multiple arguments is not the same as repeated unshift calls.

const oneCall = ['c'];
oneCall.unshift('a', 'b');

const repeatedCalls = ['c'];
repeatedCalls.unshift('a');
repeatedCalls.unshift('b');

console.log(oneCall);
console.log(repeatedCalls);
