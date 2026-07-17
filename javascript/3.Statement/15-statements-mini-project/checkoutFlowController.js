// Goal:
// Build a checkout flow controller with JavaScript statements.

function calculateItemTotal(cartItem) {
  if (cartItem.quantity < 0) {
    throw new Error(`Invalid quantity for ${cartItem.sku}`);
  }

  return cartItem.price * cartItem.quantity;
}

function resolveDiscountRate(customerTier) {
  switch (customerTier) {
    case "gold":
      return 0.2;
    case "silver":
      return 0.1;
    case "guest":
      return 0;
    default:
      throw new Error(`Unknown customer tier: ${customerTier}`);
  }
}

function buildCheckoutSummary(orderRequest) {
  const auditLog = [];

  try {
    if (!orderRequest || !Array.isArray(orderRequest.items)) {
      throw new Error("Invalid order request");
    }

    let subtotal = 0;
    let blockedSku = null;

    for (const cartItem of orderRequest.items) {
      if (cartItem.quantity === 0) {
        continue;
      }

      if (cartItem.stock < cartItem.quantity) {
        blockedSku = cartItem.sku;
        break;
      }

      subtotal += calculateItemTotal(cartItem);
    }

    if (blockedSku) {
      throw new Error(`Not enough stock for ${blockedSku}`);
    }

    const discountRate = resolveDiscountRate(orderRequest.customerTier);
    const discountAmount = subtotal * discountRate;
    const finalTotal = subtotal - discountAmount;

    let nextAction;
    switch (orderRequest.status) {
      case "draft":
        nextAction = "show payment form";
        break;
      case "paid":
        nextAction = "prepare shipment";
        break;
      case "cancelled":
        nextAction = "show cancelled message";
        break;
      default:
        nextAction = "manual review";
    }

    return {
      ok: true,
      subtotal,
      discountRate,
      discountAmount,
      finalTotal,
      nextAction,
      auditLog,
    };
  } catch (caughtError) {
    return {
      ok: false,
      errorMessage: caughtError.message,
      auditLog,
    };
  } finally {
    auditLog.push("checkout evaluated");
  }
}

const demoOrder = {
  customerTier: "gold",
  status: "draft",
  items: [
    { sku: "keyboard", price: 80, quantity: 1, stock: 5 },
    { sku: "mouse", price: 30, quantity: 0, stock: 10 },
    { sku: "monitor", price: 200, quantity: 1, stock: 2 },
  ],
};

console.log(buildCheckoutSummary(demoOrder));
