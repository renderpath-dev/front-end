// Goal:
// Compare in, Object.hasOwn, hasOwnProperty, and propertyIsEnumerable.

const baseProfile = {
  role: "reader",
};

const memberProfile = Object.create(baseProfile);
memberProfile.name = "Ada";
memberProfile.subscription = undefined;

Object.defineProperty(memberProfile, "internalId", {
  value: "M-100",
  enumerable: false,
});

console.log("role" in memberProfile);
console.log(Object.hasOwn(memberProfile, "role"));
console.log(memberProfile.hasOwnProperty("name"));
console.log(memberProfile.propertyIsEnumerable("internalId"));
console.log("subscription" in memberProfile);
console.log(memberProfile.subscription !== undefined);
