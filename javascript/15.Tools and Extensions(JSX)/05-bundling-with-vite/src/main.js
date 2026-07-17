// Goal:
// Import a module and render text in the browser.

import { createDashboardMessage } from './dashboardMessage.js';

const appElement = document.querySelector('#app');

appElement.textContent = createDashboardMessage('Ada');
