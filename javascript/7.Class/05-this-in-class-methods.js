'use strict';

// Goal:
// Show that this is decided by the call-site, even inside class methods.

class ProfileCardView {
  constructor(displayName) {
    this.displayName = displayName;
  }

  renderDisplayText() {
    return `Profile: ${this.displayName}`;
  }
}

const profileCardView = new ProfileCardView('Ada');

console.log(profileCardView.renderDisplayText());

// Detaching a prototype method removes the original receiver object.
const detachedProfileRenderer = profileCardView.renderDisplayText;

try {
  console.log(detachedProfileRenderer());
} catch (caughtDetachedRendererError) {
  console.log(caughtDetachedRendererError.name);
}

// bind creates a new function with a fixed this value.
const boundProfileRenderer = profileCardView.renderDisplayText.bind(profileCardView);
console.log(boundProfileRenderer());

// An instance arrow function field captures the instance this.
class ProfileActionPanel {
  constructor(actionLabel) {
    this.actionLabel = actionLabel;
  }

  createActionText = () => {
    return `Action: ${this.actionLabel}`;
  };
}

const saveActionPanel = new ProfileActionPanel('Save');
const detachedActionCreator = saveActionPanel.createActionText;

console.log(detachedActionCreator());

// A callback runner simulates event systems or timer APIs.
function runCallbackNow(callbackFunction) {
  return callbackFunction();
}

class ToolbarButtonController {
  constructor(buttonLabel) {
    this.buttonLabel = buttonLabel;
  }

  buildButtonLabel() {
    return `Button: ${this.buttonLabel}`;
  }

  handleButtonClick = () => {
    return `Clicked: ${this.buttonLabel}`;
  };
}

const toolbarButtonController = new ToolbarButtonController('Refresh');

try {
  console.log(runCallbackNow(toolbarButtonController.buildButtonLabel));
} catch (caughtCallbackThisError) {
  console.log(caughtCallbackThisError.name);
}

console.log(runCallbackNow(toolbarButtonController.handleButtonClick));
console.log(runCallbackNow(toolbarButtonController.buildButtonLabel.bind(toolbarButtonController)));
