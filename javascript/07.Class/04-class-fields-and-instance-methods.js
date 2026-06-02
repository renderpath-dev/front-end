'use strict';

// Goal:
// Separate public instance fields, constructor properties, prototype methods,
// and instance arrow function fields.

class NotificationPanelState {
  defaultChannel = 'email';

  constructor(panelTitle) {
    this.panelTitle = panelTitle;
  }

  formatPanelTitle() {
    return `[${this.defaultChannel}] ${this.panelTitle}`;
  }

  handlePanelClick = () => {
    return `Open ${this.panelTitle}`;
  };
}

const alertNotificationPanelState = new NotificationPanelState('System Alert');
const reportNotificationPanelState = new NotificationPanelState('Daily Report');

console.log(alertNotificationPanelState.formatPanelTitle());
console.log(alertNotificationPanelState.handlePanelClick());
console.log(
  alertNotificationPanelState.formatPanelTitle ===
    reportNotificationPanelState.formatPanelTitle,
);
console.log(
  alertNotificationPanelState.handlePanelClick ===
    reportNotificationPanelState.handlePanelClick,
);
console.log(Object.keys(alertNotificationPanelState));
console.log(Object.hasOwn(alertNotificationPanelState, 'defaultChannel'));
console.log(Object.hasOwn(alertNotificationPanelState, 'panelTitle'));
console.log(Object.hasOwn(alertNotificationPanelState, 'formatPanelTitle'));
console.log(Object.hasOwn(alertNotificationPanelState, 'handlePanelClick'));
console.log(Object.hasOwn(NotificationPanelState.prototype, 'formatPanelTitle'));

// Instance fields are initialized for every new instance.
class PanelInitializationTrace {
  traceItems = ['field initialized'];

  constructor(panelName) {
    this.panelName = panelName;
    this.traceItems.push('constructor executed');
  }

  readTraceItems() {
    return this.traceItems.join(' -> ');
  }
}

const settingsPanelTrace = new PanelInitializationTrace('Settings');
console.log(settingsPanelTrace.readTraceItems());
console.log(Object.hasOwn(settingsPanelTrace, 'traceItems'));

// A prototype method can lose this when it is detached.
const detachedTitleFormatter = alertNotificationPanelState.formatPanelTitle;

try {
  console.log(detachedTitleFormatter());
} catch (caughtDetachedMethodError) {
  console.log(caughtDetachedMethodError.name);
}

// An arrow function field keeps the instance this it captured during initialization.
const detachedClickHandler = alertNotificationPanelState.handlePanelClick;
console.log(detachedClickHandler());
