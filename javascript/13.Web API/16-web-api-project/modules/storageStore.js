// Goal:
// store and read dashboard state.

const dashboardStorageKey = 'mini.dashboard.state';

export function saveDashboardState(stateRecord) {
  localStorage.setItem(dashboardStorageKey, JSON.stringify(stateRecord));
}

export function readDashboardState() {
  const stateText = localStorage.getItem(dashboardStorageKey);

  if (stateText === null) {
    return null;
  }
  return JSON.parse(stateText);
}
