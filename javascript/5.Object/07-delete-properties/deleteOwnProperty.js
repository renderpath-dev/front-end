// Goal:
// Verify that delete removes own properties, not inherited properties.

const defaultSettings = {
  theme: "light",
};

const accountSettings = Object.create(defaultSettings);
accountSettings.language = "en";

console.log(delete accountSettings.language);
console.log(accountSettings.language);
console.log(delete accountSettings.theme);
console.log(accountSettings.theme);
console.log(defaultSettings.theme);
