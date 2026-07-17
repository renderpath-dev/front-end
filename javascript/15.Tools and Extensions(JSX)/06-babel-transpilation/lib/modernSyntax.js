// Goal:
// Give Babel modern JavaScript syntax that may need transformation.

const customerRecord = {
  profile: {
    displayName: 'Ada'
  }
};
const displayName = customerRecord.profile?.displayName ?? 'Guest';
console.log(displayName);
//# sourceMappingURL=modernSyntax.js.map