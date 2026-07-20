This repository is for Node.js + backend JavaScript learning.

Use `frontend-learning-guide-writer` when creating full Node.js learning guides.
Use `frontend-cheatsheet-writer` when creating standalone Node.js cheatsheets.

Local references:
- `nodebook`
- `references/books/javascript/javascript-the-definitive-guide.pdf`

Source priority:
1. Official Node.js docs from nodejs.org/api
2. MDN when JavaScript language behavior or Web-standard APIs are involved
3. Official TypeScript docs when TypeScript behavior is involved
4. Local Node.js PDF references
5. Existing project notes and examples

Rules:
- Do not rely only on model memory for Node.js APIs, ESM/CommonJS behavior, streams, buffers, file system APIs, HTTP APIs, test runner behavior, security-sensitive behavior, or version-sensitive runtime APIs.
- Use local PDF references as supporting material, not as the source of truth.
- If local references conflict with current Node.js official docs, follow official docs and mark the local reference as outdated.
- Explain Node.js through JavaScript runtime behavior, platform API behavior, asynchronous I/O, event loop implications, module boundaries, and TypeScript type-system behavior when TypeScript is involved.
- Generated code examples must use the mandatory macOS-style title bar followed by Markdown fenced code blocks.
- Do not use raw HTML `<pre><code>` for source-code examples.