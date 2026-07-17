// Goal:
// Verify ||=, &&=, and ??= assignment behavior.

const settings = {
  retries: 0,
  enabled: true,
  label: undefined,
};

settings.retries ||= 3;
settings.enabled &&= "active";
settings.label ??= "default";

console.log(settings.retries);
console.log(settings.enabled);
console.log(settings.label);
