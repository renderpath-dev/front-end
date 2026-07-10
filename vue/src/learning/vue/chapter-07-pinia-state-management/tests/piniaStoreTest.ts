import { createApp } from "vue";
import {
  createPinia,
  setActivePinia,
  type Pinia,
  type PiniaPlugin,
} from "pinia";

export function activateFreshPinia(plugin?: PiniaPlugin): Pinia {
  const testPinia = createPinia();

  if (plugin) {
    testPinia.use(plugin);
    createApp({}).use(testPinia);
  }

  setActivePinia(testPinia);
  return testPinia;
}

export class MemoryStorage implements Storage {
  readonly #values = new Map<string, string>();

  get length(): number {
    return this.#values.size;
  }

  clear(): void {
    this.#values.clear();
  }

  getItem(key: string): string | null {
    return this.#values.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.#values.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.#values.delete(key);
  }

  setItem(key: string, value: string): void {
    this.#values.set(key, value);
  }
}
