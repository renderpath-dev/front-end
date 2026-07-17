// Goal:
// Verify conditional rendering and list rendering with JSX.

const notificationRecords = [
  { id: 1, messageText: 'Build completed', unread: true },
  { id: 2, messageText: 'Tests passed', unread: false },
  { id: 3, messageText: 'Deploy ready', unread: true },
];

export function NotificationList() {
  const unreadTotal = notificationRecords.filter((readItem)=>{
    return readItem.unread;
  }).length;

  return(
    <section>
      <h2>Notifications</h2>

      {unreadTotal > 0 && <p>{unreadTotal} unreadMessages</p>}

      <ul>
        {notificationRecords.map( (recordItem)=>{
          return <li key = {recordItem.id} > {recordItem.messageText}</li>
        })}
      </ul>
    </section>
  )
}