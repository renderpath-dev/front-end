// Goal:
// Verify that JSON.stringify cannot serialize circular references.

const categoryRecord = {
  name: "Books",
};

categoryRecord.self = categoryRecord;

try {
  JSON.stringify(categoryRecord);
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
}
