// Goal:
// Verify strict matching in switch.

const paymentStatus = "paid";
const nextActions = [];

switch (paymentStatus) {
  case "pending":
    nextActions.push("send reminder");
    break;
  case "paid":
    nextActions.push("prepare shipment");
    break;
  case "failed":
    nextActions.push("show retry button");
    break;
  default:
    nextActions.push("manual review");
}

console.log(nextActions);
