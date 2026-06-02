"use strict"


function makeCounter (start) {
  let n = start;

  return function step (delta = 1) {
    n += delta;
    return n;
  };
}
const counter = makeCounter(10);
console.log(counter());
console.log(counter(5));
console.log(counter());

function creatBankAccount (initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}
const account = creatBankAccount(1500);
console.log(account.deposit(50));
console.log(account.withdraw(300));
console.log(account.getBalance());
console.log(account.balance);

