// Goal:
// Compare primitive strings with String wrapper objects.

// Expected output:
// string
// object
// false
// true
// entered

const primitiveTitle = "Keyboard";
const wrapperTitle = new String("Keyboard");
const disabledFlag = new Boolean(false);

console.log(typeof primitiveTitle);
console.log(typeof wrapperTitle);
console.log(primitiveTitle === wrapperTitle);
console.log(primitiveTitle == wrapperTitle);

if (disabledFlag) {
  console.log("entered");
}
