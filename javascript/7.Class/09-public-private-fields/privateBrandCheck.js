// Goal:
// Use private field brand checking.

// Expected output:
// true
// false

class SessionToken {
  #value;

  constructor(value) {
    this.#value = value;
  }

  static isSessionToken(value) {
    return #value in value;
  }
}

const token = new SessionToken("abc");
const fakeToken = { value: "abc" };

console.log(SessionToken.isSessionToken(token));
console.log(SessionToken.isSessionToken(fakeToken));
