import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
// Goal:
// Verify expressions, props, children in JSX

const productName = 'Mechanical Keyboard';
const stockCount = 12;
const isAvailable = stockCount > 0;
const productBadgeElement = /*#__PURE__*/_jsxDEV("section", {
  className: "productBadge",
  "data-available": isAvailable,
  children: [/*#__PURE__*/_jsxDEV("h2", {
    children: productName
  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
    children: [stockCount, " items available"]
  }, void 0, true)]
}, void 0, true);
console.log(productBadgeElement);