import { nextTick } from "vue";
import { flushPromises } from "@vue/test-utils";

export async function flushAsync(): Promise<void> {
  await flushPromises();
  await nextTick();
}
