// Goal:
// Build a dashboard summary string.

export function createDashboardSummary(profileRecord, metricList) {
  const metricText = metricList
    .map((metricRecord) => `${metricRecord.label}:${metricRecord.value}`)
    .join(',');

  return `${profileRecord.name} ${profileRecord.plan} ${metricText}`;
}
