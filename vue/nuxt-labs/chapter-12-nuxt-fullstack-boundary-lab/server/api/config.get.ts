import type { PublicRuntimeConfigShape } from "../../shared/types/runtimeConfig";

export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  const publicConfig: PublicRuntimeConfigShape = {
    apiBase: config.public.apiBase,
    appTitle: config.public.appTitle,
  };

  return {
    ok: true,
    data: publicConfig,
  };
});
