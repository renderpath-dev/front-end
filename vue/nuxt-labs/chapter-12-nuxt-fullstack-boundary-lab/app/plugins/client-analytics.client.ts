export default defineNuxtPlugin(() => {
  window.dispatchEvent(new CustomEvent("nuxt-boundary-lab-ready"));
});
