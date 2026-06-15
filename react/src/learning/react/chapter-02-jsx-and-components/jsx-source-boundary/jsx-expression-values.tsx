const courseName = 'React'
const chapterNumber = 2
const isPracticeReady = true
const topics = ['JSX', 'Components', 'TypeScript']

function formatTopicCount(count: number) {
  return `${count} topics`
}

export function JsxExpressionValues() {
  return (
    <section className="practice-panel">
      <h2>{courseName}</h2>
      <p>Chapter {chapterNumber}</p>
      <p>{isPracticeReady ? 'Practice ready' : 'Practice pending'}</p>
      <p>{formatTopicCount(topics.length)}</p>
    </section>
  )
}
