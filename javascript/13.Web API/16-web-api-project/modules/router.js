// Goal:
// update history state.

export function pushDashboardRoute (routeName) {
  history.pushState({routeName},"",`?route${encodeURIComponent(routeName)}`);
}
