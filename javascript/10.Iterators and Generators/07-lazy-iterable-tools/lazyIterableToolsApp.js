// Goal:
// Build lazy map and filter iterable utilities

function createMappedIterable (sourceIterable,transformItem) {
  return {
    [Symbol.iterator]() {
      const sourceIterator = sourceIterable[Symbol.iterator]();

      return {
        next() {
          const sourceResult = sourceIterator.next();

          if (sourceResult.done) {
            return {value:undefined, done: true};
          }
          return {
            value:transformItem(sourceResult.value),
            done: false
          };
        },
      };
    },
  };
}

function createFilteredIterable (sourceIterable,shouldKeepItem) {
  return {
    [Symbol.iterator]() {
      const sourceIterator = sourceIterable[Symbol.iterator]();

      return {
        next() {
          while (true) {
            const sourceResult = sourceIterator.next();

            if (sourceResult.done) {
              return {value:undefined, done: true};
            }

            if (shouldKeepItem(sourceResult.value)) {
              return {value:sourceResult.value, done: false};
            }
          }
        },
      };
    },
  };
}

const rawScoreList = [40,80,100,55];
const passingScoreIterable = createFilteredIterable(rawScoreList,(scoreValue) => {
  return scoreValue >= 60;
});
const labelIterable = createMappedIterable(passingScoreIterable,(scoreValue) => {
  return `score:${scoreValue}`;
});
for (const scoreLabel of labelIterable) {
  console.log(scoreLabel);
}