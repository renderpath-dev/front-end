// Goal:
// Verify delete as an expression statement with a side effect.

const sessionRecord = {
  userId: "u1",
  token: "secret-token",
};

const deleteResult = delete sessionRecord.token;

console.log(deleteResult);
console.log("token" in sessionRecord);
console.log(sessionRecord.userId);
