const learner = {
  name: 'Mia',
  role: 'React learner',
}

const skills = ['JSX', 'Components', 'TypeScript']

export function JsxChildValues() {
  return (
    <section className="practice-panel">
      <h2>{learner.name}</h2>
      <p>{learner.role}</p>
      <p>{skills.length}</p>
      <p>{null}</p>
      <p>{false}</p>
      <div>
        {skills.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
