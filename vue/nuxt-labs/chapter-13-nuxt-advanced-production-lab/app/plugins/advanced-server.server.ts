export default defineNuxtPlugin(() => {
  return {
    provide: {
      serverBoundary: "server-only plugin loaded",
    },
  };
});
