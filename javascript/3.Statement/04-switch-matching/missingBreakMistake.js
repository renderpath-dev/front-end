// Goal:
// Show how missing break creates accidental fallthrough.

const orderStatus = "paid";
const actions = [];

switch (orderStatus) {
  case "paid":
    actions.push("capture receipt");
  case "cancelled":
    actions.push("notify customer");
    break;
  default:
    actions.push("manual review");
}

console.log(actions);
