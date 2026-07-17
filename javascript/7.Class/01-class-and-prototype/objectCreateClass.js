// Goal:
// Build related objects by sharing a prototype object.

// Expected output:
// active: pro
// true
// true

const subscriptionMethods = {
  describe() {
    return `${this.status}: ${this.planName}`;
  },
};

function createSubscription(planName, status) {
  const subscription = Object.create(subscriptionMethods);
  subscription.planName = planName;
  subscription.status = status;
  return subscription;
}

const proSubscription = createSubscription("pro", "active");
const teamSubscription = createSubscription("team", "active");

console.log(proSubscription.describe());
console.log(Object.getPrototypeOf(proSubscription) === subscriptionMethods);
console.log(proSubscription.describe === teamSubscription.describe);
