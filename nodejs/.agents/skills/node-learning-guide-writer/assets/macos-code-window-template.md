# macOS-Style Code Window Template

Use these Markdown-compatible patterns for Node.js source code, terminal commands, expected output, and error output. The title bar is HTML. The real code is a normal Markdown fenced code block inside the same `.macos-code-window` container. The closing `</div>` for `.macos-code-window` comes after the fenced code block. Copy the self-contained style block into a guide that uses these windows.

<style>
.macos-code-window {
  overflow: hidden;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
  margin: 16px 0;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}

.macos-code-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  display: inline-block;
  flex: 0 0 auto;
}

.macos-code-dot-red {
  background: #ff5f57;
}

.macos-code-dot-yellow {
  background: #ffbd2e;
}

.macos-code-dot-green {
  background: #28c840;
}

.macos-code-title {
  margin-left: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  color: #c9d1d9;
}

.macos-code-titlebar + pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  background: transparent;
  border-radius: 0 0 12px 12px;
}

.macos-code-titlebar + pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}
</style>

## Conceptual JavaScript Snippet

Use a logical `Snippet:` title when the code explains a concept and does not correspond to a real local file.

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: process identity</span>
  </div>

```js
console.log({
  pid: process.pid,
  platform: process.platform,
});
```
</div>

## Conceptual ESM Snippet

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: ESM file read</span>
  </div>

```mjs
import { readFile } from 'node:fs/promises';

const contents = await readFile(new URL('./message.txt', import.meta.url), 'utf8');
console.log(contents);
```
</div>

## Conceptual CommonJS Snippet

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: CommonJS export</span>
  </div>

```cjs
function createMessage(name) {
  return `Hello, ${name}`;
}

module.exports = { createMessage };
```
</div>

## Conceptual TypeScript Snippet

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: typed port parser</span>
  </div>

```ts
export function parsePort(rawPort: string): number {
  const port = Number.parseInt(rawPort, 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new RangeError('Port must be an integer between 1 and 65535');
  }

  return port;
}
```
</div>

## Reusable Pattern

Use a `Template:` title when the code is a reusable pattern rather than a file to create unchanged.

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: HTTP handler</span>
  </div>

```js
export function handleRequest(request, response) {
  response.writeHead(200, {
    'content-type': 'text/plain; charset=utf-8',
  });
  response.end('OK');
}
```
</div>

## Terminal Command

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
node --test
```
</div>

## Expected Output

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
tests 1
pass 1
fail 0
```
</div>

## Error Output

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Error</span>
  </div>

```txt
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
```
</div>

## Usage Rules

- The title bar is HTML.
- The real code is a normal Markdown fenced code block.
- Place the fenced code block inside the same `.macos-code-window` container immediately after the title bar.
- Place the closing `</div>` for `.macos-code-window` after the fenced code block.
- Use `macos-code-title` for every title and `macos-code-dot` plus one color class for every dot.
- Never generate `macos-code-filename`, `macos-code-dot red`, `macos-code-dot yellow`, or `macos-code-dot green`.
- Use a real file path only when the file exists in the nearby project structure.
- Use `Snippet:` for conceptual examples.
- Use `Template:` for reusable patterns.
- Use `Terminal` for commands, `Output` for expected output, and `Error` for error output.
- Keep the three traffic-light dots and all other decorative HTML outside the fence.
- Keep fenced source clean, copyable, and executable.
- Keep source code, comments, commands, runtime strings, and identifiers in English only.
- Keep Chinese explanations outside source-code blocks.
- Use `js`, `mjs`, `cjs`, `ts`, `mts`, `cts`, `bash`, `json`, `html`, `css`, or `txt` accurately.
- Never place source code inside raw HTML `<pre><code>` tags.
- Use `.macos-code-titlebar + pre` and `.macos-code-titlebar + pre code`; never use `.macos-code-window + pre`.
