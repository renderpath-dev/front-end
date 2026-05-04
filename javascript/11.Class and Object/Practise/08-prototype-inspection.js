const proto = { protoProp: 'from proto' };
const obj = Object.create(proto);

obj.ownProp = 'from obj';

console.log(Object.getPrototypeOf(obj) === proto); // true
console.log(proto.isPrototypeOf(obj)); // true
console.log(obj.protoProp); // "from proto"
console.log(obj.ownProp); // "from obj"
