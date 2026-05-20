// Goal:
// Use a reviver function to restore a Date value after parsing JSON.

const eventJsonText =
  '{"name":"launch","createdAt":"2026-05-12T00:00:00.000Z"}';

const eventRecord = JSON.parse(eventJsonText, (propertyName, propertyValue) => {
  if (propertyName === 'createdAt') {
    return new Date(propertyValue);
  }

  return propertyValue;
});

console.log(eventRecord.createdAt instanceof Date);
console.log(eventRecord.createdAt.toISOString());
