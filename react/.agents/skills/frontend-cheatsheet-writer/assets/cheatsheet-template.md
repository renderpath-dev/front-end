# Cheatsheet Title

## 目录

- [0. Scope](#0-scope)
- [1. Core Mental Model](#1-core-mental-model)
- [2. One-Sentence Concept Map](#2-one-sentence-concept-map)
- [3. Syntax / API Quick Table](#3-syntax--api-quick-table)
- [4. Runtime Behavior Table](#4-runtime-behavior-table)
- [5. TypeScript Type System Table](#5-typescript-type-system-table)
- [6. Framework Behavior Table](#6-framework-behavior-table)
- [7. Similar Concepts Comparison](#7-similar-concepts-comparison)
- [8. Common Error Table](#8-common-error-table)
- [9. Project Usage Table](#9-project-usage-table)
- [10. Minimal Code Templates](#10-minimal-code-templates)
- [11. Debugging Checklist](#11-debugging-checklist)
- [12. What to Review in the Full Learning Guide](#12-what-to-review-in-the-full-learning-guide)
- [13. Official Documentation Links](#13-official-documentation-links)

生成实际速查表时，必须根据实际标题更新目录；如果用户明确要求很短的速查表，可以省略目录。

## 0. Scope

说明本速查表覆盖的主题、适用场景、不覆盖的内容，以及是否从某个完整学习指南压缩而来。

## 1. Core Mental Model

用少量句子说明这个主题的核心心智模型，保留避免误解所必需的机制。

## 2. One-Sentence Concept Map

| Concept | One-Sentence Summary | Layer |
| --- | --- | --- |
| Example Concept | 用一句话说明它解决的问题 | syntax / runtime / type system / framework behavior / platform API / tooling |

## 3. Syntax / API Quick Table

| Syntax / API | Purpose | Required Input | Return / Effect | Notes |
| --- | --- | --- | --- | --- |
| Example | 说明用途 | 说明输入 | 说明返回值或效果 | 说明边界 |

## 4. Runtime Behavior Table

| Case | Runtime Behavior | Why It Happens | Risk |
| --- | --- | --- | --- |
| Example case | 说明运行时行为 | 说明机制原因 | 说明风险 |

## 5. TypeScript Type System Table

| Pattern | Type-System Behavior | Emitted JavaScript | Diagnostic |
| --- | --- | --- | --- |
| Example pattern | 说明类型系统行为 | 说明类型擦除后的行为 | 说明 IDE 或 tsc 诊断 |

## 6. Framework Behavior Table

| Pattern | Framework Behavior | JavaScript Mechanism | Runtime Boundary |
| --- | --- | --- | --- |
| Example pattern | 说明框架行为 | 说明底层 JavaScript 机制 | browser / server / build time |

## 7. Similar Concepts Comparison

使用 `assets/comparison-table-template.md` 的结构。

## 8. Common Error Table

使用 `assets/error-table-template.md` 的结构。

## 9. Project Usage Table

| Scenario | Why It Appears | Practical Rule | Risk |
| --- | --- | --- | --- |
| Example scenario | 说明项目中为什么会出现 | 给出实践规则 | 说明误用风险 |

## 10. Minimal Code Templates

使用 `assets/minimal-code-template.md` 的结构。所有源代码、命令、输出和错误输出示例都必须使用 `assets/macos-code-window-template.md` 中的 HTML title bar + Markdown fenced code block 结构。

## 11. Debugging Checklist

- 检查问题属于 syntax、runtime、type system、framework behavior、platform API 还是 tooling。
- 检查错误信息中的固定名称、文件位置、调用栈或 `tsc` 诊断。
- 检查当前代码运行在 browser、server、build time 还是 test environment。

## 12. What to Review in the Full Learning Guide

列出需要回到完整学习指南中复习的机制，不要在速查表中展开成长篇教程。

## 13. Official Documentation Links

列出官方文档链接、重点阅读章节，以及任何 `Verification Needed` 项。
