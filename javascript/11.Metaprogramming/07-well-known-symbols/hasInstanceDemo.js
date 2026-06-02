// Goal:
// Customize instanceof with Symbol.hasInstance.

class PositiveNumberRecord {
  static [Symbol.hasInstance](candidateValue) {
    return typeof candidateValue === 'number' && candidateValue > 0;
  }
}

console.log(10 instanceof PositiveNumberRecord);
console.log((-5) instanceof PositiveNumberRecord);
console.log('10' instanceof PositiveNumberRecord);
