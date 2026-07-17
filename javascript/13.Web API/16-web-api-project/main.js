// Goal:
// Compose several Web APIs in one browser module entry.

import { loadDashboardRecord } from './modules/apiClient.js';
import {
  readDashboardState,
  saveDashboardState,
} from './modules/storageStore.js';
import { pushDashboardRoute } from './modules/router.js';
import { renderScoreChart } from './modules/chartRenderer.js';
import { calculateSummaryInWorker } from './modules/taskWorkerClient.js';

const loadButtonElement = document.querySelector('#load-button');
const saveRouteButtonElement = document.querySelector('#save-route-button');
const statusOutputElement = document.querySelector('#status-output');
const dataOutputElement = document.querySelector('#data-output');
const chartCanvasElement = document.querySelector('#chart-canvas');

const storedState = readDashboardState();

if (storedState !== null) {
  statusOutputElement.textContent = `Stored route: ${storedState.routeName}`;
}

loadButtonElement.addEventListener('click', async () => {
  statusOutputElement.textContent = 'Loading...';

  const dashboardRecord = await loadDashboardRecord();
  const summaryRecord = await calculateSummaryInWorker(dashboardRecord.body);

  dataOutputElement.textContent = JSON.stringify(
    { dashboardRecord, summaryRecord },
    null,
    2,
  );
  renderScoreChart(chartCanvasElement, summaryRecord.wordCount * 8);
  statusOutputElement.textContent = 'Loaded';
});

saveRouteButtonElement.addEventListener('click', () => {
  const routeName = 'dashboard';

  pushDashboardRoute(routeName);
  saveDashboardState({ routeName });
  statusOutputElement.textContent = `Saved route: ${routeName}`;
});
