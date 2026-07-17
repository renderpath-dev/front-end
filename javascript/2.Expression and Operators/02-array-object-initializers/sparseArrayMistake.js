// Goal:
// Verify that an array hole is not the same as an explicit undefined element.

const sparseList = ["first", , "third"];
const explicitList = ["first", undefined, "third"];

console.log(sparseList[1]);
console.log(1 in sparseList);
console.log(1 in explicitList);
console.log(Object.keys(sparseList).join(","));
console.log(Object.keys(explicitList).join(","));
