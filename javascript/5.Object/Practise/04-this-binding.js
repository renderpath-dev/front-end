"use strict"
const obj = {
  x: 10,
  getX() {
    return this.x;
  },
};

const anotherObj = {
  x: 20,
  getX: obj.getX,
};

console.log(obj.getX()); // 10
console.log(anotherObj.getX()); // 20

const fn = obj.getX;
console.log(fn()); // depends on strict mode, often undefined or error
