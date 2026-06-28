type CompilerRuleEvidence = {
  lint: string
  violation: string
  safeDirection: string
}

const compilerRuleEvidence: CompilerRuleEvidence[] = [
  {
    lint: 'purity',
    violation: 'Date.now() or Math.random() during render',
    safeDirection: 'Read changing values in events or external synchronization boundaries.',
  },
  {
    lint: 'immutability',
    violation: 'Mutating props, state, or captured values',
    safeDirection: 'Create a new object or array for the next snapshot.',
  },
  {
    lint: 'refs',
    violation: 'Reading or writing ref.current during render',
    safeDirection: 'Use refs from event handlers or effects.',
  },
  {
    lint: 'set-state-in-render',
    violation: 'Unconditional state setter call during render',
    safeDirection: 'Derive the value or update it from an event.',
  },
  {
    lint: 'static-components',
    violation: 'Defining a component inside another component',
    safeDirection: 'Keep component definitions at module scope.',
  },
  {
    lint: 'unsupported-syntax',
    violation: 'Dynamic scope or eval that blocks static analysis',
    safeDirection: 'Use explicit data flow and supported syntax.',
  },
  {
    lint: 'preserve-manual-memoization',
    violation: 'Incomplete dependencies on existing manual memoization',
    safeDirection: 'Keep complete dependencies and remove memoization only with evidence.',
  },
]

export function CompilerRuleEvidencePanel() {
  return (
    <section className="chapter14-panel" aria-labelledby="compiler-lints-title">
      <p className="chapter14-kicker">9.11 Compiler rules and lints</p>
      <h2 id="compiler-lints-title">Static analysis evidence before compiler adoption</h2>
      <div className="chapter14-table" role="table" aria-label="Compiler lint evidence">
        {compilerRuleEvidence.map((rule) => (
          <div className="chapter14-table-row" key={rule.lint} role="row">
            <strong role="cell">{rule.lint}</strong>
            <span role="cell">{rule.violation}</span>
            <span role="cell">{rule.safeDirection}</span>
          </div>
        ))}
      </div>
      <p className="chapter14-note">
        The current project runs the recommended eslint-plugin-react-hooks preset, but it
        does not run React Compiler.
      </p>
    </section>
  )
}
