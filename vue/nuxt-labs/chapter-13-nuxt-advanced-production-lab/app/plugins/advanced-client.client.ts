export default defineNuxtPlugin(() => {
  return {
    provide: {
      clientBoundary: "browser-only plugin loaded",
    },
  };
});
