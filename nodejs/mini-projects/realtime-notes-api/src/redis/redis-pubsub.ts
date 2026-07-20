import { randomUUID } from "node:crypto";
import type { RedisClientType } from "redis";
import { getRedisClient } from "./redis-client.js";
import { NOTE_EVENTS_PATTERN, USER_EVENTS_PATTERN, noteEventsChannel, userEventsChannel } from "./redis-channels.js";
import type { StoredRealtimeEvent } from "../realtime/events.js";
import { logger } from "../shared/logging/logger.js";

const processId = randomUUID();
let subscriber: RedisClientType | undefined;

type RealtimePubSubEnvelope = {
  originProcessId: string;
  event: StoredRealtimeEvent;
};

export async function publishEventNotification(event: StoredRealtimeEvent): Promise<void> {
  const client = await getRedisClient();
  const envelope = JSON.stringify({ originProcessId: processId, event } satisfies RealtimePubSubEnvelope);
  await client.publish(userEventsChannel(event.ownerId), envelope);

  if (event.resourceType === "NOTE") {
    await client.publish(noteEventsChannel(event.resourceId), envelope);
  }
}

export async function subscribeToRealtimeFanout(onEvent: (event: StoredRealtimeEvent) => void): Promise<() => Promise<void>> {
  const client = await getRedisClient();
  subscriber = client.duplicate();
  subscriber.on("error", (error) => {
    logger.error("Redis subscriber error.", { error });
  });
  await subscriber.connect();

  const listener = (message: string): void => {
    try {
      const envelope = JSON.parse(message) as RealtimePubSubEnvelope;
      if (envelope.originProcessId === processId) return;
      onEvent(envelope.event);
    } catch (error) {
      logger.warn("Dropped invalid Redis Pub/Sub message.", { error });
    }
  };

  await subscriber.pSubscribe(USER_EVENTS_PATTERN, listener);
  await subscriber.pSubscribe(NOTE_EVENTS_PATTERN, listener);

  return async () => {
    if (!subscriber) return;
    await subscriber.pUnsubscribe(USER_EVENTS_PATTERN);
    await subscriber.pUnsubscribe(NOTE_EVENTS_PATTERN);
    await subscriber.quit();
    subscriber = undefined;
  };
}
