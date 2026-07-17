// Goal:
// Verify that object spread creates a shallow copy, not a deep copy.

const originalProfile = {
  name: "Nora",
  preferences: {
    theme: "dark",
  },
};

const copiedProfile = {
  ...originalProfile,
};

copiedProfile.preferences.theme = "light";

console.log(originalProfile.preferences.theme);
console.log(copiedProfile.preferences === originalProfile.preferences);
