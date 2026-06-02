"use strict";

globalThis.checkoutNamespaceTools = {
  taxRate : 0.08,

  calculateSubtotal (unitPrice, quantityCount) {
    return unitPrice * quantityCount;
  },
  calculateTaxAmount (subtotalAmount) {
    return subtotalAmount * this.taxRate;
  },

  calculateGrandTotal (unitPrice, quantityCount) {
    const subtotalAmount = this.calculateSubtotal(unitPrice, quantityCount);
    const taxAmount = this.calculateTaxAmount(subtotalAmount);

    return subtotalAmount + taxAmount;
  },
};