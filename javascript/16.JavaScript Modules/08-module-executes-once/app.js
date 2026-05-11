// Goal:
// Verify module execution caching through two different import paths.

import { renderFirstDashboard } from './firstDashboard.js';
import { renderSecondDashboard } from './secondDashboard.js';

renderFirstDashboard();
renderSecondDashboard();
