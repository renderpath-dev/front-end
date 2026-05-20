// Goal
// Create a custom Error subclass for domain-specific failures.

class MissingFieldError extends Error {
  constructor(fieldNameText) {
    super(`Missing field ${fieldNameText}`);
    this.name = 'MissingFieldError';
    this.fieldName = fieldNameText;
  }
}

function requireProfileField(profileRecord,requiredFieldName) {
  if (!(requiredFieldName in profileRecord)) {
    throw new MissingFieldError(requiredFieldName);
  }
  return profileRecord[requiredFieldName];
}
try {
  requireProfileField({username:"river"},'email');
} catch (profileFieldError) {
  console.log(profileFieldError.name);
  console.log(profileFieldError.fieldName);
}