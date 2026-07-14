# Output Checklist

Before finishing a guide or a guide-structure revision, verify:

- The guide is teaching-oriented, not a summary.
- The H1 contains the chapter number and concrete chapter name.
- For a new chapter, the directory name, file name, H1, mechanism map, boundary section, dependency map, and engineering review section use a consistent chapter identity.
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
- `## 目录` appears before `## 本章机制地图` and `## 0. 本章工程问题与边界`.
- The directory includes every numbered top-level section in the actual guide.
- The directory includes `## 本章机制地图`.
- The directory includes all core `### 9.x` sections under `## 9. 分节教学与练习`.
- The TOC expands every core subsection from `9.1` through the final `9.x`; listing only section 9 is a failure.
- TOC `9.x` links use stable `#section-9-x` anchors when the guide uses stable anchors.
- Each core `9.x` heading with a stable TOC link has the matching explicit `<a id="section-9-x"></a>` HTML anchor immediately before the heading, with at most one blank line between them.
- No core section anchor ID is duplicated.
- Meaningful heading text was not changed only to satisfy anchor generation.
- The directory includes important `###` sections under `## 12. 最终小项目`.
- The directory does not include internal bold teaching labels such as `结论`, `本节解决的问题`, `技术意义`, `逐行解释`, or `最终记忆模型`.
- `## 本章机制地图` connects mechanisms to owner or boundary, runtime layer, project scenario, and selected source reading paths.
- `## 本章机制地图` is not a file inventory and does not include file status labels.
- `## 0. 本章工程问题与边界` explains the engineering problem and chapter boundaries instead of file location.
- `## 4. 机制依赖图` explains dependency relationships between mechanisms instead of generic reading order.
- `## 14. 工程迁移与代码审查要点` teaches code review, migration risks, anti-patterns, production signals, and evidence to collect.
- The guide body does not include delivery status tables or file preservation claims.
- Core concept sections inside `## 9. 分节教学与练习` use `###` concept headings plus bold teaching labels, not a long stack of H4 headings.
- JavaScript runtime and TypeScript type system are separated.
- Framework runtime and language mechanism are separated.
- Practice file names reveal the knowledge point, exercise goal, or component responsibility when practice files are present.
- Non-trivial code has line-by-line explanation.
- Execution process is explicit.
- Common mistakes include wrong code, error type, violated rule, correction, and recognition method.
- The guide includes a mini project.
- The guide includes a cheatsheet.
- The guide includes official documentation reading list.
- Concept snippets use logical `Snippet:` or `Template:` title-bar names and do not masquerade as real project files.
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
- Final delivery evidence is reported in the final response, including changed guide files, changed skill files, source-file touches, README/App entry touches, dependency changes, preserved `9.x` anchors, no full rewrite, and lint/typecheck/test/build results.

## Evidence-Based Self-Check

Before final delivery, output this table and add one row for every critical checklist item:

| 检查项 | 结果 | 证据 |
| --- | --- | --- |
| Replace with a specific check | PASS / FAIL / UNKNOWN | Cite the exact heading, section, file path, command result, verified count, style selector, or chapter-by-chapter replacement mapping. |

- Mark every result as `PASS`, `FAIL`, or `UNKNOWN`.
- Provide specific, reproducible evidence for every result.
- Evidence such as `已检查`, `符合要求`, `全部通过`, `没有问题`, or `按照 skill 完成` is invalid by itself.
- If a check was not actually performed, mark it `UNKNOWN` or `FAIL`; never use `PASS`.
- If any critical item is `FAIL`, do not deliver the final result. Continue revising until all critical items pass.

## Hard-Fail Conditions

Treat any item below as `FAIL`:

1. macOS code-window HTML is used without the required self-contained style definitions or an explicit standalone-safe style source.
2. The TOC omits any core `9.x` subsection that exists in the guide.
3. A core `9.x` section contains label-only filler and no concrete mechanism evidence chain.
4. A mechanism explanation can be copied unchanged into another chapter.
5. The final mini project substitutes for or overwhelms the core teaching sections.
6. The guide body keeps low-learning-value file inventory or file status sections instead of mechanism teaching.
7. The mechanism map becomes a status table rather than a concept-to-boundary map.
8. The engineering review section is a delivery report instead of review/migration guidance.
9. The self-check contains claims without verifiable evidence.
10. Required validation commands were not run, but the final response claims they passed.
11. Any core `9.x` TOC entry that claims a stable `#section-9-x` target lacks its matching explicit anchor, uses a duplicate anchor ID, or changes heading text only to influence anchor generation.
