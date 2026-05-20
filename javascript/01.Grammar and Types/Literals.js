/** Array literals**/
const coffees = ["French Roast","Colombian","Kona"];
console.log(coffees.length);

const fish = ['Lion',  'Angel']; //Extra commas in array literals
console.log(fish);

/** object literals**/
const sales = "Toyota";

function carTypes(name) {
  return name === "Honda" ? name : `Sorry, we don't sell ${name}.`;
}

const car = { myCar: "Saturn", getCar: carTypes("Honda"), special: sales };

console.log(car.myCar); // Saturn
console.log(car.getCar); // Honda
console.log(car.special); // Toyota

const car1 = {manyCars:{a:"Saab",b:"Jeep"},7:"Mazda"};
console.log(car1.manyCars.b);
console.log(car1[7]);


