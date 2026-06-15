const topicInputId = 'chapter-topic'
const isInputDisabled = false

export function JsxAttributeBoundary() {
  return (
    <section className="practice-panel" aria-labelledby="attribute-title">
      <h2 id="attribute-title">JSX attribute boundary</h2>

      <label className="field-label" htmlFor={topicInputId}>
        Topic
      </label>

      <input
        aria-label="Topic name"
        className="text-input"
        data-practice-id="jsx-attribute-boundary"
        defaultValue="JSX attributes"
        disabled={isInputDisabled}
        id={topicInputId}
        style={{ borderColor: '#28715f' }}
        type="text"
      />
    </section>
  )
}
