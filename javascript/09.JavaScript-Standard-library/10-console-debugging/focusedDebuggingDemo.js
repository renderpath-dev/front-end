// Goal:
// Use console output to test specific runtime assumptions.

const selectedUserIdValue = 'u-102';
const userCacheMap = new Map();

userCacheMap.set('u-101', { name: 'Ada' });

console.log('selected-user-id', selectedUserIdValue);
console.log('has-cache-entry', userCacheMap.has(selectedUserIdValue));
console.log('known-cache-keys', Array.from(userCacheMap.keys()));
