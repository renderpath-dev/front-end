// Goal:
// Update browser history state without reloading the page.

const homeButtonElement = document.querySelector('#show-home-button');
const settingsButtonElement = document.querySelector('#show-settings-button');
const routeOutputElement = document.querySelector('#route-output');

function renderRoute(routeName) {
  routeOutputElement.textContent = `Route: ${routeName}`;
}

homeButtonElement.addEventListener('click', () => {
  history.pushState({ routeName: 'home' }, '', '?route=home');
  renderRoute('home');
});

settingsButtonElement.addEventListener('click', () => {
  history.pushState({ routeName: 'settings' }, '', '?route=settings');
  renderRoute('settings');
});

window.addEventListener('popstate', (eventObject) => {
  const routeName = eventObject.state?.routeName ?? 'initial';
  renderRoute(routeName);
});
