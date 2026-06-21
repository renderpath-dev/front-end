import { useState } from 'react'

const initialTopics = ['Events', 'State snapshot']

export function ArrayStateUpdate() {
  const [topics, setTopics] = useState(initialTopics)

  function handleAddTopic() {
    setTopics((currentTopics) =>
      currentTopics.includes('Immutable updates')
        ? currentTopics
        : [...currentTopics, 'Immutable updates'],
    )
  }

  function handleRemoveFirstTopic() {
    setTopics((currentTopics) => currentTopics.filter((_, index) => index !== 0))
  }

  return (
    <section className="practice-panel">
      <p className="practice-kicker">9.11 Array replacement</p>
      <h2>Array state update</h2>
      <ul className="topic-list">
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      <div className="practice-actions">
        <button className="practice-button" onClick={handleAddTopic} type="button">
          Add topic
        </button>
        <button
          className="practice-button secondary"
          disabled={topics.length === 0}
          onClick={handleRemoveFirstTopic}
          type="button"
        >
          Remove first
        </button>
      </div>
    </section>
  )
}
