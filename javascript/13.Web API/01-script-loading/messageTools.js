// Goal:
// Export a helper for a browser module script.

export function createBrowserMessage(sourceLabel) {
  return `message-from-${sourceLabel}`;
}
