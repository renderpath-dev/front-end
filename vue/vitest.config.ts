import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    setupFiles: [
      "./src/learning/vue/chapter-10-testing-quality/vitest/setupTests.ts",
    ],
    include: ["src/**/*.test.ts"],
    exclude: ["src/**/*.spec.ts", "node_modules/**", "dist/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "./coverage",
      include: ["src/learning/vue/chapter-10-testing-quality/**/*.{ts,vue}"],
      exclude: [
        "src/learning/vue/chapter-10-testing-quality/**/*.test.ts",
        "src/learning/vue/chapter-10-testing-quality/e2e/**",
        "src/learning/vue/chapter-10-testing-quality/vitest/**",
      ],
    },
  },
});
