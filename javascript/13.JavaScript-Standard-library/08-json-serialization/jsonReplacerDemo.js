// Goal:
// Use a replacer array to serialize only public fields.

const accountRecord = {
  id: 7,
  email: 'user@example.com',
  passwordHash: 'hidden-value',
};

const publicAccountJsonText = JSON.stringify(accountRecord, ['id', 'email'],2);

console.log(publicAccountJsonText);
