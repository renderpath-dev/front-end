import { defineStore } from "pinia";
import type { ThemeMode } from "./storeTypes";

type ResolvedTheme = "light" | "dark";
type ThemeAccent = "emerald" | "indigo" | "amber";

type ThemeState = {
  mode: ThemeMode;
  accent: ThemeAccent;
  systemPreference: ResolvedTheme;
};

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    mode: "system",
    accent: "emerald",
    systemPreference: "light",
  }),
  getters: {
    resolvedMode: (state): ResolvedTheme =>
      state.mode === "system" ? state.systemPreference : state.mode,
    themeClass(): string {
      return `theme-${this.resolvedMode} accent-${this.accent}`;
    },
    isDark(): boolean {
      return this.resolvedMode === "dark";
    },
  },
  actions: {
    setMode(mode: ThemeMode): void {
      this.mode = mode;
    },
    setAccent(accent: ThemeAccent): void {
      this.accent = accent;
    },
    toggleMode(): void {
      this.mode = this.isDark ? "light" : "dark";
    },
  },
});
