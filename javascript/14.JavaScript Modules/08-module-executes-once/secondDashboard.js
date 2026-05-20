// Goal:
// Import and use the same audit logger module.

import { writeAuditLog } from './auditLogger.js';

export function renderSecondDashboard() {
  console.log(writeAuditLog('second dashboard'));
}
