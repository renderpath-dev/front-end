class numberRangeCollection {
  constructor(startNumber, endNumber) {
    this.startNumber = startNumber;
    this.endNumber = endNumber;
  }
  [Symbol.iterator]() {
    let currentNumber = this.startNumber;
    const finalNumber = this.endNumber;

    return {
      next(){
        if (currentNumber <= finalNumber) {
          const resultValue = currentNumber;
          currentNumber += 1;

          return {value:resultValue, done: false};
        }
        return {value:undefined,done:true};
      },
    };
  }
}
const pageRange = new numberRangeCollection(10,15);
for (const pageNumber of pageRange) {
  console.log(pageNumber);
}
