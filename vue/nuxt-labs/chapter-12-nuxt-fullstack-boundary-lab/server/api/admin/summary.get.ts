export default defineEventHandler(() => {
  const config = useRuntimeConfig();

  return {
    ok: true,
    data: {
      section: "admin-summary",
      privateConfigAvailable: Boolean(config.apiSecret),
      returnedSecret: false,
    },
  };
});
