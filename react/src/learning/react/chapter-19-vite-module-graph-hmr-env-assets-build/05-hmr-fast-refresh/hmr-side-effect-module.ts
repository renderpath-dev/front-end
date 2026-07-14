const globalKey = '__sellerhub_vite_hmr_side_effect_count__'

type HmrSideEffectGlobal = typeof globalThis & {
  [globalKey]?: number
}

const hmrGlobal = globalThis as HmrSideEffectGlobal
hmrGlobal[globalKey] = (hmrGlobal[globalKey] ?? 0) + 1

if (import.meta.hot) {
  import.meta.hot.data.reloads = (import.meta.hot.data.reloads ?? 0) + 1
  import.meta.hot.dispose((data) => {
    data.previousSideEffectCount = hmrGlobal[globalKey]
  })
}

export const hmrSideEffectSummary = {
  currentSideEffectCount: hmrGlobal[globalKey] ?? 0,
  hasHmrContext: Boolean(import.meta.hot),
}
