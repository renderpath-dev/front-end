// Goal:
// Show that assigning a property to a primitive value is not persistent.

// Expected output:
// undefined
// undefined

const orderCode = "A100";

const primitivePropertyResult = Function(`
  const orderCode = "A100";
  orderCode.owner = "Mira";
  return [orderCode.owner, "A100".owner];
`)();

console.log(primitivePropertyResult[0]);
console.log(primitivePropertyResult[1]);
