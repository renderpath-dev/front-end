type EventDelivery = {
  transport: "redis-pubsub" | "postgres-replay";
  durable: boolean;
  missedWhileOffline: "lost" | "replayable";
};

const redisPubSub: EventDelivery = {
  transport: "redis-pubsub",
  durable: false,
  missedWhileOffline: "lost"
};

const postgresReplay: EventDelivery = {
  transport: "postgres-replay",
  durable: true,
  missedWhileOffline: "replayable"
};

console.log(redisPubSub, postgresReplay);
