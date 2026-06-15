# Chapter Title

<style>

</style>

## 目录

- [0. 文件定位](#0-文件定位)
- [1. 本章解决的问题](#1-本章解决的问题)
- [2. 前置概念](#2-前置概念)
- [3. 学习目标](#3-学习目标)
- [4. 推荐学习顺序](#4-推荐学习顺序)
- [5. 核心术语表](#5-核心术语表)
- [6. 底层心智模型](#6-底层心智模型)
- [7. 推荐目录结构](#7-推荐目录结构)
- [8. 示例运行方式](#8-示例运行方式)
- [9. 分节教学与练习](#9-分节教学与练习)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 对应文件 / 片段 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| Replace with actual concept | `replace-with-actual-file-path.tsx` | 真实练习文件 | 9.x |

生成实际章节时，必须根据实际标题、小节和真实文件路径更新目录和代码定位索引，不能保留 placeholder。

## 0. 文件定位

说明本文件在学习路径中的位置、适合的学习阶段、前后章节关系，以及本章不覆盖的内容边界。

## 1. 本章解决的问题

用问题驱动的方式说明本章解决什么学习障碍、工程问题或概念混淆。

## 2. 前置概念

列出学习本章前必须理解的概念，并说明每个前置概念为什么必要。

## 3. 学习目标

列出学习者完成本章后应该能解释、判断、编写、调试和迁移的能力。

## 4. 推荐学习顺序

给出推荐学习顺序，并说明为什么这个顺序能降低理解成本。

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| Example Term | 说明术语含义 | syntax / runtime / type system / framework convention / platform API / tooling | 说明它在本章中的作用 |

表格表头可以使用清晰的 English headers；正文说明使用中文。

## 6. 底层心智模型

用机制优先的方式建立本章的核心心智模型。

## 7. 推荐目录结构

必须明确区分下面四类结构。只保留与当前章节相关的结构，但不要混用名称。

### 当前项目结构

用于展示当前 repository 中真实存在或正在学习的项目文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
project-root/
  package.json
  src/
    main.tsx
```
</div>

### 本章文档结构

用于展示本章 learning guide 和相关文档资料的位置。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">本章文档结构</span>
  </div>

```txt
docs/
  topic/
    chapter-name/
      chapter-learning-guide.md
```
</div>

### 概念示例结构

用于列出只解释机制的 snippets。概念 snippet 不表示需要创建真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets:
  Snippet: concept mechanism
  Snippet: common mistake
  Template: basic pattern
```
</div>

### 后续章节真实练习结构

React 第一章可以偏概念理解。从 React 第二章开始，每个核心概念必须拥有独立目录，文件名必须体现知识点和练习目标。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">真实练习结构</span>
  </div>

```txt
src/
  concepts/
    jsx-basics/
      jsx-expression-demo.tsx
      jsx-attribute-demo.tsx

    component-basics/
      user-card-component.tsx
      product-card-component.tsx
```
</div>

## 8. 示例运行方式

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm install
npm run dev
```
</div>

说明运行环境、命令、预期入口和常见启动失败原因。

## 9. 分节教学与练习

### 9.1 核心概念标题

**结论：**

先给出本节最重要的结论。

**本节解决的问题：**

说明本节解决的具体问题。

**技术意义：**

说明概念的技术含义，并在首次出现时补充 English term。

**概念解释：**

用教学语言解释概念，不只给定义。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

明确这个概念分别属于哪些层，不属于哪些层，避免把不同层混在一起。

**底层机制：**

说明运行时、编译器、框架或平台实际做了什么。

**API / 语法规则：**

如果本节没有新 API，明确写出：本节没有新的 API，重点是理解机制。

**固定属性名 / 固定方法名 / 参数签名：**

列出固定名称、方法名、参数签名或说明本节不涉及固定 API。

**概念示例结构：**

如果本节包含多个 conceptual snippets，先列出 snippet 名称，并说明它们不需要创建为真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets in this section:
  Snippet: correct mechanism
  Snippet: common mistake
  Snippet: corrected version
```
</div>

**示例代码：**

概念示例使用 `Snippet:` 或 `Template:` 逻辑标题；真实练习文件才使用真实文件路径。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: concept mechanism</span>
  </div>

```ts
const value = 1;
console.log(value);
```
</div>

**逐行解释：**

逐行解释代码在语法层和运行时层分别发生什么。

**运行方式：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
```
</div>

**预期输出：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
1
```
</div>

**执行过程：**

按顺序说明执行过程。

**变量与引用变化：**

说明变量绑定、对象引用、状态变化或闭包捕获如何变化。

**为什么会得到这个结果：**

解释为什么会得到这个输出。

**对比情况：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: contrasting case</span>
  </div>

```ts
const value = "1";
console.log(value);
```
</div>

说明对比代码改变了什么规则或执行过程。

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: common mistake</span>
  </div>

```ts
missingIdentifier;
```
</div>

说明错误类型、违反的规则、修正方式，以及以后如何识别类似错误。

**与真实项目的关系：**

说明这个机制在真实项目中的使用场景。

**与当前学习路径的关系：**

说明本节如何连接到前后知识。

**最终记忆模型：**

用少量句子总结本节最终要记住的模型。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| Example | syntax | 说明语法作用 | 说明常见误用 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| Example error | runtime / type / tooling | 说明违反的规则 | 说明修正方式 | 说明识别方法 |

## 12. 最终小项目

### 项目目标

说明项目目标。

### 为什么适合本章

说明项目如何整合本章核心机制。

### 最终小项目结构

真实文件路径必须与下面结构完全一致。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/
  concepts/
    concept-name/
      concept-practice-file.tsx
```
</div>

### 文件职责

说明每个文件负责什么。

### 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/concepts/concept-name/concept-practice-file.tsx</span>
  </div>

```tsx
export function ConceptPracticeFile() {
  return <h1>Practice</h1>;
}
```
</div>

### 运行方式

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run dev
```
</div>

### 预期输出或交互结果

说明预期输出或交互结果。

### 核心执行流程

说明项目核心执行流程。

### 常见错误

说明常见错误、违反规则和修复方式。

### 可选扩展

列出与本章机制直接相关的扩展方向。

## 13. 额外速查表

使用 `assets/cheatsheet-template.md` 的结构。

## 14. 最终文件清单

只列出本次实际创建的文档文件，以及最终 mini project 中建议保留或替换的真实练习文件。不要混入配置文件、资料来源、官方文档或概念 snippets。

| File | Role | Status |
| --- | --- | --- |
| `docs/topic/chapter-name/chapter-learning-guide.md` | 本章学习指导文件。 | 已创建并保留。 |
| `src/concepts/concept-name/concept-practice-file.tsx` | 最终小项目真实练习文件。 | 仅在执行最终小项目练习时创建或替换。 |

不需要创建这些概念示例文件：

- `Snippet: concept mechanism`
- `Snippet: common mistake`
- `Template: basic pattern`

## 15. 如何转换成个人笔记

说明学习者如何把本章整理成自己的笔记。

## 16. 必须能回答的问题

列出学习者必须能回答的问题。

## 17. 最终记忆模型

总结本章最核心的心智模型。

## 18. 官方文档阅读清单

列出官方文档阅读顺序、每个链接应该重点看什么，以及未验证内容的 `Verification Needed` 标记。
