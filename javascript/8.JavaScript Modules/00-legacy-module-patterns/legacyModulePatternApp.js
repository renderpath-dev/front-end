'use strict';

// Goal:
// Run all legacy module pattern examples and verify their limitations.

console.log(globalThis.checkoutNamespaceTools.calculateSubtotal(30, 2));
console.log(globalThis.checkoutNamespaceTools.calculateTaxAmount(60));
console.log(globalThis.checkoutNamespaceTools.calculateGrandTotal(30, 2));

globalThis.checkoutNamespaceTools.taxRate = 0.2;

console.log(globalThis.checkoutNamespaceTools.calculateGrandTotal(30, 2));

console.log(globalThis.ticketCounterModule.readNextTicketPreview());
console.log(globalThis.ticketCounterModule.createTicketCode());
console.log(globalThis.ticketCounterModule.createTicketCode());
console.log(globalThis.nextTicketNumber);

console.log(globalThis.runtimeSettingsModule.readSettingValue('themeMode'));
console.log(globalThis.runtimeSettingsModule.createSettingsSummary());

globalThis.runtimeSettingsModule.updateSettingValue('pageSize', 50);

console.log(globalThis.runtimeSettingsModule.createSettingsSummary());
console.log(globalThis.runtimeSettings);
