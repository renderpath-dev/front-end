type Publish = (channel: string, message: string) => Promise<number>;

function userEventsChannel(userId: string): string {
  if (!/^[a-zA-Z0-9:-]+$/.test(userId)) throw new Error("Unsafe channel segment");
  return `realtime:user:${userId}:events`;
}

async function publishLiveNotification(publish: Publish, userId: string, eventId: string): Promise<number> {
  return publish(userEventsChannel(userId), JSON.stringify({ eventId }));
}

const count = await publishLiveNotification(async (channel, message) => {
  console.log(channel, message);
  return 1;
}, "user-1", "event-1");

console.log(count);
