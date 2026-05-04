const a = { x: 1 };
Object.preventExtensions(a);
a.y = 2;
console.log(a); // { x: 1 }

const b = { x: 1 };
Object.seal(b);
delete b.x;
b.x = 2;
console.log(b); // { x: 2 }

const c = { x: 1 };
Object.freeze(c);
c.x = 2;
console.log(c); // { x: 1 }
