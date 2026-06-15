This repository is for React + TypeScript learning.

Use `frontend-learning-guide-writer` when creating full learning guides.
Use `frontend-cheatsheet-writer` when creating standalone cheatsheets.

Local references:
- `references/books/react/the-road-to-react-2025.pdf`

Source priority:
1. Official React docs from react.dev
2. Official TypeScript docs when TS/TSX behavior is involved
3. MDN when browser APIs or DOM events are involved
4. Local React PDF references
5. Existing project notes and examples

Rules:
- Do not rely only on model memory for React APIs, hooks, events, forms, effects, testing, or framework-sensitive behavior.
- Use local PDF references as supporting material, not as the source of truth.
- If the PDF conflicts with current React docs, follow official React docs and mark the PDF content as outdated.
- Explain React through JavaScript runtime behavior and TypeScript type-system behavior.
- Generated code examples must use the mandatory macOS-style title bar followed by Markdown fenced code blocks.
- Do not use raw HTML `<pre><code>` for source-code examples.