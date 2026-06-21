# Output Checklist

Before finishing, verify:

- The guide is teaching-oriented, not a summary.
- The H1 contains the chapter number and concrete chapter name.
- For a new chapter, the directory name, file name, H1, directory, code location index, and final file list use a consistent chapter identity.
- The body is primarily mechanism-focused teaching explanation.
- Every core `9.x` section contains substantially more teaching than a brief overview.
- Required teaching labels contain subsection-specific explanations rather than generic filler.
- Each core `9.x` section contains at least one mechanism evidence chain covering trigger, JavaScript runtime values/calls, React snapshot/cell/identity, TypeScript boundary, observed result, violated rule, and real-project recognition method.
- Each React `9.x` section traces its topic-specific data flow through concrete value creation, transfer, read, and update.
- Explanations cannot be copied unchanged into another React, JavaScript, or TypeScript chapter.
- Code blocks do not replace line-by-line explanation, execution process, variable and reference changes, result reasoning, contrasting cases, or error-cause analysis.
- The final mini project opens by stating that it integrates the chapter and does not replace section-by-section teaching.
- The final mini project does not outweigh, replace, or hide shallow `9.x` teaching, and no core concept appears only in the project.
- API tables, directories, file structures, checklists, and cheatsheets do not replace core concept explanations.
- The chapter explains what problem it solves.
- Prerequisites are listed.
- Core terms include English names and layer classification.
- Ordinary structure headings are Chinese and do not keep English template headings such as `File Positioning`, `What Problem This Chapter Solves`, `Clear Conclusion`, or `Technical Meaning`.
- Table headers are not forced to be Chinese; clear English headers such as `Concept`, `Layer`, `Meaning`, and `Common Mistake` are allowed.
- The document starts with `## 目录` after the chapter title and any local `<style>` block.
- `## 目录` appears before `## 0. 文件定位`.
- The directory includes every numbered top-level section in the actual guide.
- The directory includes all core `### 9.x` sections under `## 9. 分节教学与练习`.
- The TOC expands every core subsection from `9.1` through the final `9.x`; listing only section 9 is a failure.
- The directory includes important `###` sections under `## 12. 最终小项目`.
- The directory does not include internal bold teaching labels such as `结论`, `本节解决的问题`, `技术意义`, `逐行解释`, or `最终记忆模型`.
- If the chapter contains real practice files or final mini-project files, it includes `## 本章代码定位索引`.
- The code location index connects learning goals, real files or snippets, type, and section location.
- Real file paths in the code location index can be found in the recommended directory structure, code-window title bars, and final file list.
- Every path labeled as a real file in the code location index, recommended structures, real-file title bars, final file list, and final mini-project structure exists in the local repository.
- Real-file title bars and the final file list refer to the same existing files.
- Concept snippets in the code location index are marked as `概念 snippet` and do not masquerade as real file paths.
- Core concept sections inside `## 9. 分节教学与练习` use `###` concept headings plus bold teaching labels, not a long stack of H4 headings.
- JavaScript runtime and TypeScript type system are separated.
- Framework runtime and language mechanism are separated.
- `当前项目结构`, `本章文档结构`, `概念示例结构`, and `最终小项目结构` are clearly distinguished when they appear.
- React chapter 1 may be mostly conceptual, but React chapter 2 and later include real practice file structures.
- For React chapter 2 and later, each core concept has an independent directory when practical.
- Practice file names reveal the knowledge point, exercise goal, or component responsibility.
- The guide avoids overusing `App.tsx`, `main.tsx`, `index.tsx`, `example.tsx`, `demo.tsx`, or `test.tsx` as the main learning files for multiple unrelated concepts.
- Non-trivial code has line-by-line explanation.
- Execution process is explicit.
- Common mistakes include wrong code, error type, violated rule, correction, and recognition method.
- The guide includes a mini project.
- The guide includes a cheatsheet.
- The guide includes official documentation reading list.
- Real file paths in code-window title bars can be found in the nearest relevant structure block.
- Concept snippets use logical `Snippet:` or `Template:` title-bar names and do not masquerade as real file paths.
- Concept snippets are not mixed into the final file list as final files.
- Missing files are never described as `已创建`, `已更新`, or `真实练习文件`; they are created or relabeled as `Snippet:` / `Template:` / not required.
- The final file list includes only files actually created or real final-practice files that should be created, kept, or replaced.
- The final file list includes file path, role, and status.
- Code and code comments contain no Chinese characters.
- Every code example uses the macOS-style HTML title bar plus a normal Markdown fenced code block.
- Every title bar has red/yellow/green dots.
- Every title bar displays a file name, logical snippet name, `Terminal`, `Output`, or `Error`.
- Decorative UI elements are outside the actual source code.
- Source code remains clean, copyable, and executable.
- No real source code is placed inside raw HTML `<pre><code>`.
- Correct fenced code language identifier is used: `ts`, `tsx`, `js`, `jsx`, `bash`, `json`, `html`, `css`, or `txt`.
- CSS includes `.macos-code-titlebar + pre` when local styling is included.
- If macOS code-window HTML is used, the guide's opening `<style>` block defines `.macos-code-window`, `.macos-code-titlebar`, `.macos-code-dot`, `.macos-code-dot-red`, `.macos-code-dot-yellow`, `.macos-code-dot-green`, `.macos-code-title`, `.macos-code-titlebar + pre`, and `.macos-code-titlebar + pre code`.
- If code-window styles come from an external stylesheet, the guide names the exact source and remains understandable as standalone Markdown.
- Delivery Gate text, self-check tables, `PASS` / `FAIL` / `UNKNOWN`, change notes, and Codex execution notes do not appear in the learning guide body.
- Necessary lint/build commands were actually run before the final response claims they passed.
- The final response includes the evidence-based self-check table below.

## Evidence-Based Self-Check

Before final delivery, output this table and add one row for every critical checklist item:

| 检查项 | 结果 | 证据 |
| --- | --- | --- |
| Replace with a specific check | PASS / FAIL / UNKNOWN | Cite the exact heading, section, file path, command result, verified count, style selector, or complete-code mapping. |

- Mark every result as `PASS`, `FAIL`, or `UNKNOWN`.
- Provide specific, reproducible evidence for every result. Valid evidence includes an exact file path, an exact heading such as TOC `9.1`, an actual command result such as `npm run lint passed`, a verified real-file count, the required style selectors found, or a mapping showing every final-project file in the complete-code section.
- Evidence such as `已检查`, `符合要求`, `全部通过`, `没有问题`, or `按照 skill 完成` is invalid by itself.
- If a check was not actually performed, mark it `UNKNOWN` or `FAIL`; never use `PASS`.
- If any critical item is `FAIL`, do not deliver the final result. Continue revising until all critical items pass.

## Hard-Fail Conditions

Treat any item below as `FAIL`:

1. macOS code-window HTML is used without the required self-contained style definitions or an explicit standalone-safe style source.
2. The TOC omits any core `9.x` subsection.
3. A core `9.x` section contains label-only filler and no concrete mechanism evidence chain.
4. A mechanism explanation can be copied unchanged into another chapter.
5. The final mini project substitutes for or overwhelms the core teaching sections.
6. A path labeled as a real file does not exist locally.
7. A real-file title bar disagrees with the final file list.
8. A `Snippet:` or `Template:` is listed as a real final file.
9. The self-check contains claims without verifiable evidence.
10. Lint/build was not run, but the final response claims it passed.
