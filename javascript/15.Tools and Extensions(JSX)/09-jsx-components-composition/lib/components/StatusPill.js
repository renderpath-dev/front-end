import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
// Goal:
// Export a small reusable UI component.

export function StatusPill({
  isOnline
}) {
  return /*#__PURE__*/_jsxDEV("span", {
    children: isOnline ? 'Online' : 'Offline'
  }, void 0, false);
}