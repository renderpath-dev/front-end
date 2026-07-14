import type { Language } from 'prism-react-renderer'

const languageAliases: Record<string, Language> = {
  bash: 'bash',
  css: 'css',
  html: 'markup',
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'jsx',
  json: 'json',
  markdown: 'markdown',
  md: 'markdown',
  plain: 'plain',
  plaintext: 'plain',
  shell: 'bash',
  text: 'plain',
  ts: 'typescript',
  tsx: 'tsx',
  typescript: 'typescript',
  txt: 'plain',
}

export function normalizeCodeLanguage(language = 'plain'): Language {
  return languageAliases[language.toLowerCase()] ?? 'plain'
}
