let x;
console.log(x);

const myobj = {key:"value"};
myobj.key = "other value";
console.log(myobj);

const programming = ["HTML5", "CSS3", "JavaScript", "TypeScript"];
programming.push("React");
console.log(programming);

//object literals
const sales="Toyota";
function CarTypes(name) {
  return name === "Honda" ? name: `Sorry,We don't sell ${name}.`;
}
const car = {myCar: CarTypes("Saturn"),getCar:CarTypes("Honda"),special:sales};
console.log(car.myCar);console.log(car.getCar);console.log(car.special);

const values = {Weather:{S:"sunny",r:"rain",f:"fog"},1:"snow"}
console.log(values.Weather.S);
console.log(values[1]);

const unusualPropertynames = {
  '':"Empty String",
  '!':"bomb"
}
console.log(unusualPropertynames[""]);
console.log(unusualPropertynames["!"]);

/*  Template literals (Template strings) */
const personalinformation = {
  name:"Johnson",
  age:25,
  Postcode:56663,
}
function displayPersonalInformation(strings,nameExp,ageExp,PostcodeExp) {}