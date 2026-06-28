export type HydrationCase = {
  name: string
  serverOutput: string
  clientFirstOutput: string
  cause: string
}

export type HydrationComparison = HydrationCase & {
  isMismatch: boolean
  diagnosis: string
}

export const hydrationCases: HydrationCase[] = [
  {
    name: 'Stable product count',
    serverOutput: 'Products: 12',
    clientFirstOutput: 'Products: 12',
    cause: 'Both sides use serialized server props.',
  },
  {
    name: 'Time during first render',
    serverOutput: 'Rendered at 08:00',
    clientFirstOutput: 'Rendered at 08:01',
    cause: 'The first client render reads a different clock value.',
  },
  {
    name: 'Browser storage branch',
    serverOutput: 'Theme: system',
    clientFirstOutput: 'Theme: dark',
    cause: 'The first client render reads localStorage before hydration completes.',
  },
  {
    name: 'Random badge',
    serverOutput: 'Badge: A',
    clientFirstOutput: 'Badge: B',
    cause: 'Math.random creates different markup on each environment.',
  },
]

export function compareHydrationOutput(caseItem: HydrationCase): HydrationComparison {
  const isMismatch = caseItem.serverOutput !== caseItem.clientFirstOutput

  return {
    ...caseItem,
    isMismatch,
    diagnosis: isMismatch
      ? 'Fix the first client render so it matches the server snapshot.'
      : 'Hydration can attach event logic to the existing HTML snapshot.',
  }
}
