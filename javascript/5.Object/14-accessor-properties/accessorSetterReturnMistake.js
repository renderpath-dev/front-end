// Goal:
// Verify that a setter return value is ignored.

const shippingBox = {
  width: 10,
  height: 5,
  set area(nextArea) {
    this.width = nextArea / this.height;
    return "ignored";
  },
};

const assignmentResult = (shippingBox.area = 100);

console.log(assignmentResult);
console.log(shippingBox.width);
