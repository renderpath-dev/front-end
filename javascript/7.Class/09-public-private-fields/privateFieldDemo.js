// Goal:
// Verify that private fields are not normal properties.

// Expected output:
// 500
// undefined
// SyntaxError

class BankAccount {
  #balanceCents = 0;

  deposit(cents) {
    if (!Number.isInteger(cents) || cents <= 0) {
      throw new RangeError("Deposit must be positive cents");
    }

    this.#balanceCents += cents;
  }

  get balanceCents() {
    return this.#balanceCents;
  }
}

const account = new BankAccount();
account.deposit(500);

console.log(account.balanceCents);
console.log(account["#balanceCents"]);

try {
  eval("account.#balanceCents");
} catch (error) {
  console.log(error.constructor.name);
}
