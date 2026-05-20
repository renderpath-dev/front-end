// Goal:
// Import and use the shared audit logger.

import { writeAuditLog } from './auditLogger.js';

export function renderFirstDashboard() {
  console.log(writeAuditLog('first dashboard'));
}
