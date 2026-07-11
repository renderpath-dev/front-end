export default defineEventHandler((event) => {
  event.context.requestLogged = true;
});
