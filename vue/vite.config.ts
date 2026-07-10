import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv, type PluginOption } from "vite";

function resolveBasePath(mode: string): string {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return env.VITE_PUBLIC_BASE_PATH ?? "/";
}

function createAnalyzePlugins(mode: string): Array<PluginOption> {
  if (mode !== "analyze") {
    return [];
  }

  return [
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }) as PluginOption,
  ];
}

export default defineConfig(({ mode }) => ({
  base: resolveBasePath(mode),
  plugins: [vue(), ...createAnalyzePlugins(mode)],
  build: {
    reportCompressedSize: true,
    sourcemap: mode === "analyze",
  },
}));
