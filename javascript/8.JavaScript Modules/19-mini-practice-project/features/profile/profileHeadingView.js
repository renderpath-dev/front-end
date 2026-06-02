// Goal:
// Export a default profile heading renderer.

import { defaultUserName } from '../../config/defaultRuntimeConfig.js';

export default function createProfileHeadingText(
  displayName = defaultUserName,
) {
  return `Profile: ${displayName}`;
}
