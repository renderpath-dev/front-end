// Goal:
// Show that data descriptor fields and accessor descriptor fields cannot be mixed.

const settingsRecord = {};

Object.defineProperty(settingsRecord, 'theme', {
  value: 'dark',
  get() {
    return 'light';
  },
});
