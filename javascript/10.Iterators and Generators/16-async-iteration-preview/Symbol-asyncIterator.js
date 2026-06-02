function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const asyncLogIterable = {
  [Symbol.asyncIterator]() {
    let currentIndex = 0;

    const logMessageList = ['log-1', 'log-2'];
    const delayList = [2000, 5000];

    return {
      async next() {
        if (currentIndex >= logMessageList.length) {
          return { value: undefined, done: true };
        }

        await delay(delayList[currentIndex]);

        const logMessage = logMessageList[currentIndex];
        currentIndex += 1;

        return { value: logMessage, done: false };
      },
    };
  },
};

for await (const logMessage of asyncLogIterable) {
  console.log(logMessage);
}
