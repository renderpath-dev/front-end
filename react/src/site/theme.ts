export const THEME_STORAGE_KEY = 'learning-lab-theme:v1'

export type Theme = 'dark' | 'light'

export function readStoredTheme(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null
  } catch {
    return null
  }
}

export function resolveInitialTheme(): Theme {
  const documentTheme = document.documentElement.dataset.theme

  if (documentTheme === 'dark' || documentTheme === 'light') {
    return documentTheme
  }

  const systemTheme: Theme = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  return readStoredTheme() ?? systemTheme
}
