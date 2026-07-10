import { defineStore } from "pinia";
import type { SidebarState } from "./storeTypes";

export const useSidebarStore = defineStore("sidebar", {
  state: (): SidebarState => ({
    collapsed: false,
    pinned: true,
  }),
  actions: {
    toggleCollapsed(): void {
      this.collapsed = !this.collapsed;
    },
    setPinned(pinned: boolean): void {
      this.pinned = pinned;
    },
    reset(): void {
      this.$reset();
    },
  },
});
