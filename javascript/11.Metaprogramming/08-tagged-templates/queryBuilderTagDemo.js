// Goal:
// Return a structured value from a tagged template.

function sqlParts(stringParts, ...expressionValues) {
  return {
    text: stringParts.join('?'),
    values: expressionValues,
  };
}

const userId = 42;
const statusValue = 'active';

const queryRecord = sqlParts`select * from users where id = ${userId} and status = ${statusValue}`;

console.log(queryRecord.text);
console.log(queryRecord.values);
