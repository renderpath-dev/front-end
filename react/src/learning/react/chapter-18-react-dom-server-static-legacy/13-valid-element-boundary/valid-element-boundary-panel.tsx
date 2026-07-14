import { createElement, isValidElement } from 'react'

const valuesToCheck = [
  { label: 'JSX element', value: <span>Element sample</span> },
  { label: 'createElement result', value: createElement('strong', null, 'Created element') },
  { label: 'string React node', value: 'Plain text node' },
  { label: 'array of nodes', value: ['A', 'B'] },
]

export function ValidElementBoundaryPanel() {
  return (
    <article className="dom-boundary-card">
      <p className="dom-boundary-kicker">9.13 isValidElement</p>
      <h3>Validate React elements, not business data</h3>
      <table className="dom-boundary-table">
        <thead>
          <tr>
            <th>Value</th>
            <th>isValidElement</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {valuesToCheck.map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td>{isValidElement(item.value) ? 'true' : 'false'}</td>
              <td>
                {isValidElement(item.value)
                  ? 'React can treat this value as an element object.'
                  : 'This may still be renderable, but it is not a React element object.'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
