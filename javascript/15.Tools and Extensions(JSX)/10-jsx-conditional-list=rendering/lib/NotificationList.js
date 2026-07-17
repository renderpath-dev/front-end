import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
// Goal:
// Verify conditional rendering and list rendering with JSX.

const notificationRecords = [{
  id: 1,
  messageText: 'Build completed',
  unread: true
}, {
  id: 2,
  messageText: 'Tests passed',
  unread: false
}, {
  id: 3,
  messageText: 'Deploy ready',
  unread: true
}];
export function NotificationList() {
  const unreadTotal = notificationRecords.filter(readItem => {
    return readItem.unread;
  }).length;
  return /*#__PURE__*/_jsxDEV("section", {
    children: [/*#__PURE__*/_jsxDEV("h2", {
      children: "Notifications"
    }, void 0, false), unreadTotal > 0 && /*#__PURE__*/_jsxDEV("p", {
      children: [unreadTotal, " unreadMessages"]
    }, void 0, true), /*#__PURE__*/_jsxDEV("ul", {
      children: notificationRecords.map(recordItem => {
        return /*#__PURE__*/_jsxDEV("li", {
          children: [" ", recordItem.messageText]
        }, recordItem.id, true);
      })
    }, void 0, false)]
  }, void 0, true);
}