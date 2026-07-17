// Goal:
// Show that else binds to the nearest unmatched if.

const isSignedIn = true;
const hasPaymentMethod = false;
let message = "";

if (isSignedIn)
  if (hasPaymentMethod)
    message = "ready";
  else
    message = "add payment method";
else
  message = "sign in";

console.log(message);
