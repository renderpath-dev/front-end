// Goal:
// Show that ordinary objects are not iterable by default.

const userRecord = {
  id: "u1",
  name: "Mira",
};

try {
  for (const value of userRecord) {
    console.log(value);
  }
} catch (error) {
  console.log(error.name);
}

console.log(Object.values(userRecord));
