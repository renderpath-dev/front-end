// Goal:
// Intercept delete operations with deleteProperty.

const sessionRecord = {
  token: 'abc',
  temporaryNote: 'draft',
};

const sessionProxy = new Proxy(sessionRecord, {
  deleteProperty(targetObject, propertyName) {
    if (propertyName === 'token') {
      return false;
    }

    return Reflect.deleteProperty(targetObject, propertyName);
  },
});

console.log(delete sessionProxy.temporaryNote);

try {
  console.log(delete sessionProxy.token);
} catch (errorObject) {
  console.log(errorObject.name);
  console.log(errorObject.message);
}

console.log(sessionRecord);
