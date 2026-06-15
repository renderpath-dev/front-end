# Minimal Code Templates

## Template Name

### Use When

说明这个模板适合的实践场景。

### Code

Use a real file path in the title bar only when the cheatsheet includes the matching project or template structure nearby. Use `Template:` for reusable patterns that are not exact files to create.

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: normalize input helper</span>
  </div>

```ts
export function normalizeInput(input: string) {
  return input.trim();
}
```
</div>

### Copy Rules

- Keep only the code needed for the scoped topic.
- Do not add unrelated boilerplate.
- Rename identifiers to match the practice file.

### Mechanism Reminder

用一两句话说明这个模板依赖的核心机制。
