import type { InjectionKey, Ref } from "vue";

export type ThemeName = "light" | "dark";

export type ThemeContext = {
  theme: Readonly<Ref<ThemeName>>;
  toggleTheme: () => void;
};

export type ToastItem = {
  id: number;
  message: string;
};

export type ToastContext = {
  toasts: Readonly<Ref<readonly ToastItem[]>>;
  addToast: (message: string) => void;
  dismissToast: (toastId: number) => void;
};

export const themeKey: InjectionKey<ThemeContext> = Symbol("theme-context");
export const toastKey: InjectionKey<ToastContext> = Symbol("toast-context");
