export default defineEventHandler((event) => {
  event.context.requestStartedAt = Date.now();
});
