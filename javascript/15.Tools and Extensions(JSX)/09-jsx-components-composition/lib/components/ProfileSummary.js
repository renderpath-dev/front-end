// Goal:
// Compose a profile summary from props and another component.

import { StatusPill } from './StatusPill.jsx';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export function ProfileSummary({
  displayName,
  isOnline
}) {
  return /*#__PURE__*/_jsxDEV("article", {
    children: [/*#__PURE__*/_jsxDEV("h2", {
      children: displayName
    }, void 0, false), /*#__PURE__*/_jsxDEV(StatusPill, {
      isOnline: isOnline
    }, void 0, false)]
  }, void 0, true);
}