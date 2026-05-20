// Goal:
// Verify how Map delete() removes entries and returns a boolean result.

const preferenceStore = new Map();

preferenceStore.set('theme', 'dark');
preferenceStore.set('density', 'compact');
preferenceStore.set('language', 'en');

const deletedThemeResult = preferenceStore.delete('theme');
const deletedMissingResult = preferenceStore.delete('timezone');

console.log(deletedThemeResult);
console.log(deletedMissingResult);
console.log(preferenceStore.get('theme'));
console.log(preferenceStore.size);

const statusStore = new Map();

statusStore.set('task', undefined);
console.log(statusStore.has('task'));
console.log(statusStore.size);

statusStore.delete('task');
console.log(statusStore.has('task'));
console.log(statusStore.size);
