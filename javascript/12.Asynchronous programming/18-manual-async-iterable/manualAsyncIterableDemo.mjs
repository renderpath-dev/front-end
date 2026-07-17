// Goal:
// Manually implement an async iterable object.

function createAsyncNumberRange(startNumber, endNumber) {
  let currentNumber = startNumber;

  return {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          if (currentNumber > endNumber) {
            return {
              value: undefined,
              done: true,
            };
          }

          const valueNumber = currentNumber;
          currentNumber += 1;

          return {
            value: valueNumber,
            done: false,
          };
        },
      };
    },
  };
}

for await (const numberValue of createAsyncNumberRange(1, 3)) {
  console.log(numberValue);
}
