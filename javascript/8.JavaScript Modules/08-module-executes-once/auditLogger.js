// Goal:
// Verify that this module runs only once even when imported by multiple modules.

console.log('auditLogger module executed');

let logCount = 0;

export function writeAuditLog(messageText) {
  logCount += 1;
  return `${logCount}: ${messageText}`;
}
