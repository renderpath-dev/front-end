import { nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { piniaPersistencePlugin } from "../stores/piniaPersistencePlugin";
import { useThemeStore } from "../stores/themeStore";
import {
  activateFreshPinia,
  MemoryStorage,
} from "./piniaStoreTest";

describe("theme store", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    activateFreshPinia();
  });

  it("derives a class and toggles the resolved mode", () => {
    const themeStore = useThemeStore();

    themeStore.setMode("dark");

    expect(themeStore.isDark).toBe(true);
    expect(themeStore.themeClass).toContain("theme-dark");

    themeStore.toggleMode();

    expect(themeStore.mode).toBe("light");
  });

  it("persists only after the local plugin is installed", async () => {
    const localStorage = new MemoryStorage();
    vi.stubGlobal("window", { localStorage });
    const firstPinia = activateFreshPinia(piniaPersistencePlugin);
    const firstStore = useThemeStore(firstPinia);

    firstStore.setMode("dark");
    await nextTick();

    expect(localStorage.getItem("vue-chapter-07:theme")).toContain(
      '"storeId":"theme"',
    );

    const secondPinia = activateFreshPinia(piniaPersistencePlugin);
    const secondStore = useThemeStore(secondPinia);

    expect(secondStore.mode).toBe("dark");
  });
});
