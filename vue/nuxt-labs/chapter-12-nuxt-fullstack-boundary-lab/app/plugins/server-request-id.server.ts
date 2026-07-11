export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("requestId", `request-${Date.now()}`);
});
