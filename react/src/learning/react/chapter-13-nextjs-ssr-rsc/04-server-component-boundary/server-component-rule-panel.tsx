import {
  countBlockedServerRules,
  serverComponentRules,
} from './server-component-rule-model'

export function ServerComponentRulePanel() {
  const blockedCount = countBlockedServerRules(serverComponentRules)

  return (
    <section className="chapter13-panel" aria-labelledby="server-rule-title">
      <p className="chapter13-kicker">Server Components</p>
      <h2 id="server-rule-title">Server Components default to server-only execution</h2>
      <p>
        The model marks which capabilities belong to the server render pass and which
        require a Client Component boundary.
      </p>
      <p className="chapter13-summary">{blockedCount} capabilities require a client boundary.</p>
      <div className="chapter13-grid">
        {serverComponentRules.map((rule) => (
          <article className="chapter13-card" key={rule.capability}>
            <span className={`chapter13-pill chapter13-pill-${rule.status}`}>{rule.status}</span>
            <h3>{rule.capability}</h3>
            <p>{rule.reason}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
