// Goal:
// Compose async modules into one dashboard flow.

import { loadProfileRecord } from './services/profileService.mjs';
import { loadVisitMetric, loadOrderMetric } from './services/metricService.mjs';
import { createDashboardStatusStream } from './streams/statusStream.mjs';
import { createDashboardSummary } from './views/dashboardView.mjs';

for await (const statusText of createDashboardStatusStream()) {
  console.log(statusText);
}

const profilePromise = loadProfileRecord();
const metricPromise = Promise.all([loadVisitMetric(), loadOrderMetric()]);

try {
  const profileRecord = await profilePromise;
  const metricList = await metricPromise;

  console.log(createDashboardSummary(profileRecord, metricList));
} catch (dashboardError) {
  console.error(dashboardError.message);
}
