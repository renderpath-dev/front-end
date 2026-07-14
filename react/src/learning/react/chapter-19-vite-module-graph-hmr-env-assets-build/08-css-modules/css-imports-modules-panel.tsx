import styles from './vite-scope-card.module.css'

export function CssImportsModulesPanel() {
  return (
    <article className="vite-boundary-card">
      <p className="vite-boundary-kicker">9.8 CSS graph</p>
      <h3>CSS imports and CSS Modules</h3>
      <p>
        CSS imports participate in the Vite module graph. A .module.css import returns a
        mapping object so the component consumes generated local class names instead of
        global selectors.
      </p>
      <div className={styles.moduleCard}>
        <span className={styles.moduleBadge}>CSS Module</span>
        <h4 className={styles.moduleTitle}>Local class mapping</h4>
        <p>
          The source class name is stable in TypeScript, while Vite maps it to a scoped
          browser class during transform and build.
        </p>
      </div>
    </article>
  )
}
