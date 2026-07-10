import { defineStore } from "pinia";
import type { PreferenceState } from "./storeTypes";

export const usePreferenceStore = defineStore("preferences", {
  state: (): PreferenceState => ({
    compactLayout: false,
    tableDensity: "comfortable",
    dismissedTips: [],
  }),
  actions: {
    toggleCompactLayout(): void {
      this.compactLayout = !this.compactLayout;
    },
    setTableDensity(density: PreferenceState["tableDensity"]): void {
      this.tableDensity = density;
    },
    dismissTip(tipId: string): void {
      if (!this.dismissedTips.includes(tipId)) {
        this.dismissedTips.push(tipId);
      }
    },
    resetPreferences(): void {
      this.$reset();
    },
  },
});
