// Goal:
// Verify the error-first callback convention.

function readUserRecord(userId, callback) {
  setTimeout(() => {
    if (userId <= 0) {
      callback(new Error('Invalid user id'), null);
      return;
    }

    callback(null, { id: userId, name: 'Ada' });
  }, 1000);
}

readUserRecord(7, (readError, userRecord) => {
  if (readError !== null) {
    console.error(readError.message);
    return;
  }

  console.log(userRecord.id);
});