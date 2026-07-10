import { computed, ref } from "vue";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export type AdminLocale = "en" | "zhCn";

export const adminLocale = ref<AdminLocale>("en");

export const elementPlusLocale = computed(() =>
  adminLocale.value === "zhCn" ? zhCn : en,
);

export function setAdminLocale(locale: AdminLocale): void {
  adminLocale.value = locale;
}
