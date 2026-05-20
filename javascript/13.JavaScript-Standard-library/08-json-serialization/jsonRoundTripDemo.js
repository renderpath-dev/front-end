// Goal:
// Serialize a JSON-compatible object and parse it back.

const userProfileRecord = {
  username: 'river',
  active: true,
  score: 42,
  preferences: ['dark-mode', 'compact-layout'],
};

const userProfileJsonText = JSON.stringify(userProfileRecord);
const restoredProfileRecord = JSON.parse(userProfileJsonText);

console.log(userProfileJsonText);
console.log(restoredProfileRecord.preferences[0]);
console.log(restoredProfileRecord === userProfileRecord);
