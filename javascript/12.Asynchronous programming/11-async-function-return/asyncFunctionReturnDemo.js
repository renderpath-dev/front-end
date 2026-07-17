// Goal
// Verify that an async function always return a Promise.

async function loadProfileName() {
  return 'Ada';
}

const ProfileNamePromise = loadProfileName();

console.log(ProfileNamePromise instanceof Promise);

ProfileNamePromise.then((profileName) => {
  console.log(profileName);
});