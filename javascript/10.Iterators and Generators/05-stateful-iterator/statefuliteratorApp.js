// Goal:
// Verify that an iterator keeps its own progress

const notificationList = ['email', 'password','sms','push'];
const notificationIterator = notificationList[Symbol.iterator]();

console.log(notificationIterator.next().value);

for (const  notificationType of notificationIterator) {
  console.log(notificationType);
}
console.log(notificationIterator.next());