// Goal:
// Compare for-of, entries, forEach, and classic for loops on a sparse array.

const readings = [];
readings[0] = 18;
readings[2] = 21;

for (const value of readings) {
  console.log('for-of', value);
}

for (const [index, value] of readings.entries()) {
  console.log('entries', index, value);
}

readings.forEach((value, index) => {
  console.log('forEach', index, value);
});

for (let index = 0; index < readings.length; index += 1) {
  if (index in readings) {
    console.log('classic', index, readings[index]);
  }
}
