export type QualityGateName = 'lint' | 'typecheck' | 'test' | 'build'

export type QualityGateCommand = {
  name: QualityGateName
  command: string
  verifies: string
}

export const qualityGateCommands: QualityGateCommand[] = [
  {
    name: 'lint',
    command: 'npm run lint',
    verifies: 'Static code rules and hook lint rules',
  },
  {
    name: 'typecheck',
    command: 'npm run typecheck',
    verifies: 'TypeScript compile-time relationships',
  },
  {
    name: 'test',
    command: 'npm run test',
    verifies: 'Runtime behavior and user-visible outcomes',
  },
  {
    name: 'build',
    command: 'npm run build',
    verifies: 'Production TypeScript and Vite build pipeline',
  },
]

export function summarizeQualityGate(commands: QualityGateCommand[]): string {
  return commands.map((command) => command.name).join(' -> ')
}
