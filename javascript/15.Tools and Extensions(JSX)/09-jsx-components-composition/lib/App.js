// Goal:
// Compose the application UI from smaller components.

import { ProfileSummary } from './components/ProfileSummary.jsx';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export function App() {
  return /*#__PURE__*/_jsxDEV("main", {
    children: [/*#__PURE__*/_jsxDEV(ProfileSummary, {
      displayName: "Ada",
      isOnline: true
    }, void 0, false), /*#__PURE__*/_jsxDEV(ProfileSummary, {
      displayName: "Brendan",
      isOnline: false
    }, void 0, false)]
  }, void 0, true);
}