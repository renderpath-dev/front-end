export default defineNuxtPlugin(() => {
  return {
    provide: {
      universalBoundary: "universal plugin loaded",
    },
  };
});
