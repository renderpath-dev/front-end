// Goal:
// Convert an error-first callback API into a promise API.

function readSettings(callback) {
  setTimeout(() => {
    callback(null, { theme: 'dark', pageSize: 20 });
  }, 10);
}

function readSettingsAsync() {
  return new Promise((resolve, reject) => {
    readSettings((settingsError, settingsRecord) => {
      if (settingsError !== null) {
        reject(settingsError);
        return;
      }

      resolve(settingsRecord);
    });
  });
}

readSettingsAsync().then((settingsRecord) => {
  console.log(settingsRecord.theme);
});
