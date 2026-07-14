# React 第 6 章：Forms 与 Controlled Components

生成实际章节时，必须把上面的示范标题替换为当前技术主题、章节数字和具体章节名称，并保持目录名、文件名、H1、机制地图和工程迁移与代码审查要点一致。

<style>
.macos-code-window {
  overflow: hidden;
  margin: 16px 0;
  border: 1px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
}

.macos-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid #30363d;
  background: #161b22;
}

.macos-code-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  border-radius: 999px;
}

.macos-code-dot-red { background: #ff5f57; }
.macos-code-dot-yellow { background: #ffbd2e; }
.macos-code-dot-green { background: #28c840; }

.macos-code-title {
  margin-left: 8px;
  color: #c9d1d9;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
}

.macos-code-titlebar + pre {
  overflow-x: auto;
  margin: 0;
  padding: 16px;
  border-radius: 0 0 12px 12px;
  background: transparent;
}

.macos-code-titlebar + pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
}
</style>

## 目录

- [本章机制地图](#本章机制地图)
- [0. 本章工程问题与边界](#0-本章工程问题与边界)
- [1. 本章解决的问题](#1-本章解决的问题)
- [2. 前置概念](#2-前置概念)
- [3. 学习目标](#3-学习目标)
- [4. 机制依赖图](#4-机制依赖图)
- [5. 核心术语表](#5-核心术语表)
- [6. 底层心智模型](#6-底层心智模型)
- [7. 推荐目录结构](#7-推荐目录结构)
- [8. 示例运行方式](#8-示例运行方式)
- [9. 分节教学与练习](#9-分节教学与练习)
  - [9.1 controlled input 的 event-state-render 数据流](#section-9-1)
  - [9.2 第二个核心概念（生成时替换）](#section-9-2)
  - [9.3 第三个核心概念（生成时替换）](#section-9-3)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
- [13. 额外速查表](#13-额外速查表)
- [14. 工程迁移与代码审查要点](#14-工程迁移与代码审查要点)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章机制地图

| Mechanism | Owner / Boundary | Runtime Layer | Project Scenario | Source Reading Path |
| --- | --- | --- | --- | --- |
| Template mechanism: replace with actual chapter concept | Replace with the owner or boundary | syntax / runtime / type system / framework convention / platform API / tooling | Replace with the real project scenario | `Template: selected source reading path` |

生成实际章节时，必须根据当前章节替换上面的 mechanism rows。这里不是文件清单，不列出每个文件，不写文件状态；只在 source reading path 能帮助理解机制时才选择性引用。

## 0. 本章工程问题与边界

说明本文件在学习路径中的位置、适合的学习阶段、前后章节关系，以及本章不覆盖的内容边界。

## 1. 本章解决的问题

用问题驱动的方式说明本章解决什么学习障碍、工程问题或概念混淆。

## 2. 前置概念

列出学习本章前必须理解的概念，并说明每个前置概念为什么必要。

## 3. 学习目标

列出学习者完成本章后应该能解释、判断、编写、调试和迁移的能力。

## 4. 机制依赖图

用 dependency table 或短小节说明概念之间的依赖关系：先理解什么，再理解什么，为什么依赖成立，如果跳过会破坏哪条机制判断。

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

<a id="section-9-1"></a>

### 9.1 controlled input 的 event-state-render 数据流

**结论：**

受控文本框不是“变量和 DOM 自动双向绑定”。browser 先产生候选输入值，handler 把该 string 排入 React state update，下一次 render 才用新的 `value` prop 把结果提交回 DOM。

**本节解决的问题：**

解释用户输入 `Lamp` 时，`event.currentTarget.value`、`productName` render snapshot、React state cell 和最终 DOM value 分别在什么时候变化。

**技术意义：**

受控输入（controlled input）让 React state 成为字段 current value 的 owner，因此 preview、validation 和 submit payload 可以读取同一个 render snapshot，而不是分别读取 DOM 和复制 state。

**概念解释：**

`value={productName}` 描述本次 render 希望 input 显示的 string；`onChange={handleProductNameChange}` 注册用户编辑后的更新路径。setter 不会修改当前函数调用中的 `productName` binding，而是请求 React 用 next state 再调用 component。

**边界：语法、运行时、对象模型、类型系统、框架约定与平台 API：**

Browser 创建 input event 并在 DOM control 上提供候选 `value`；JavaScript runtime 调用 handler、读取 string 并调用 setter；React 按 hook call position 找到 state cell、排队 update、重新调用 owner component 并 commit 新 `value`；TypeScript 只检查 `ChangeEvent<HTMLInputElement>` 和 string setter 参数，运行时不会验证输入内容。

**底层机制：**

初次 render 的 `productName` 是 `'Desk Lamp'`。用户输入后，旧 handler closure 仍捕获该次 render 的 binding，但 `event.currentTarget.value` 已是 browser control 的候选值。React 处理 `setProductName(nextValue)` 后创建新 render snapshot，新 JSX 同时把该值交给 input 与 preview paragraph。

**API / 语法规则：**

可编辑 controlled text input 必须同时提供 string `value` 和同步更新 backing state 的 `onChange`。空字段从 `''` 开始，不能先传 `undefined` 再切换为 string。

**固定属性名 / 固定方法名 / 参数签名：**

固定属性名是 `value` 与 `onChange`；示例 handler 签名是 `function handleProductNameChange(event: ChangeEvent<HTMLInputElement>): void`；候选 string 从 `event.currentTarget.value` 读取。

**概念示例结构：**

下面三个 logical snippets 只示范机制、对比和错误，不代表真实文件。生成 React 第二章及后续章节时，应优先改成已在本地创建并验证存在的真实练习文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Conceptual snippets in this section:
  Snippet: controlled product name
  Snippet: uncontrolled initial value
  Snippet: value without update path
```
</div>

**示例代码：**

该示范必须在生成实际章节时替换为当前小节的真实代码与变量名；若 title bar 改用真实路径，该文件必须已经存在。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: controlled product name</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent } from 'react'

export function ProductNameField() {
  const [productName, setProductName] = useState('Desk Lamp')

  function handleProductNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setProductName(event.currentTarget.value)
  }

  return (
    <label>
      Product name
      <input onChange={handleProductNameChange} value={productName} />
      <span>{productName}</span>
    </label>
  )
}
```
</div>

**逐行解释：**

`useState` 声明 state cell 的初始 string；typed handler 从所属 input 的 `currentTarget` 读取候选值；setter 排队 next string；input 和 span 都读取同一个 `productName` snapshot，因此下一次 render 后两处显示一致。

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
Initial UI: input and preview show Desk Lamp
After typing Lamp: input and preview show Lamp
```
</div>

**执行过程：**

1. Browser 接收一次键盘输入并更新 control 的候选 value。
2. React 调用当前 render 创建的 `handleProductNameChange` closure。
3. JavaScript 读取 `event.currentTarget.value`，得到例如 `'Lamp'`。
4. `setProductName('Lamp')` 把 update 加入该 hook state cell 的 queue。
5. React 再次调用 `ProductNameField`，新 snapshot 中的 `productName` 是 `'Lamp'`。
6. React commit 新 JSX，input 与 span 同时显示 `'Lamp'`。

**机制证据链：**

触发动作是用户键入字符；JavaScript runtime 创建 event callback invocation 和 `nextValue` string；React 按 `ProductNameField` 的 hook call position 读取同一个 state cell，并从 update queue 计算 next snapshot；TypeScript 只确认 event element 和 setter parameter 都是 string，不会在 runtime 保存或验证商品名；最终 UI 一致是因为 input 与 span 都消费同一 snapshot。若遗漏同步 setter，代码违反 controlled value 必须有 update path 的规则；真实项目中可通过“输入回弹、read-only warning、preview 不更新”识别这一类错误。

**变量与引用变化：**

旧 closure 中的 `productName` binding 保持 `'Desk Lamp'`，不会被 setter 原地改写；event object 只服务本次 handler 调用；state cell 在 React 内部接收 next string；下一次 component call 创建值为 `'Lamp'` 的新 binding。

**为什么会得到这个结果：**

input 和 span 都由同一个 owner component render，并读取同一个 `productName`。handler 把 browser 候选值送入该 owner 的 state queue，所以 commit 后不存在两份需要手工同步的 source state。

**对比情况：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: uncontrolled initial value</span>
  </div>

```tsx
export function UncontrolledProductNameField() {
  return <input defaultValue="Desk Lamp" />
}
```
</div>

`defaultValue` 只提供 initial value。后续 edits 由 DOM control 保存，不进入 React state，因此其他 JSX 不能直接从 component snapshot 派生同步 preview。

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: value without update path</span>
  </div>

```tsx
export function ReadOnlyByMistake() {
  const [productName] = useState('Desk Lamp')
  return <input value={productName} />
}
```
</div>

React 每次 commit 都强制 input value 等于旧 snapshot，但没有 handler 更新 backing state，所以用户输入会回弹并产生 warning。修正方式是提供同步 `onChange`、改用 `defaultValue`，或在确实只读时显式添加 `readOnly`。

**与真实项目的关系：**

Seller product form 的 name、description 与 price preview 都依赖同一 values snapshot；如果其中一个字段绕过 state 只留在 DOM，validation 与 preview 就会读取不同 source of truth。

**与当前学习路径的关系：**

本节承接 event handler 与 render snapshot，并为后续 object form state、field validation 和 submission status 建立字段 ownership 基础。

**最终记忆模型：**

Browser 提供候选值，JavaScript handler 读取它，React setter 更新 state cell，下一次 render 产生新 snapshot，commit 再把 `value` 写回 DOM。TypeScript 只检查这条路径的静态类型，不参与 runtime state 保存。

<a id="section-9-2"></a>

### 9.2 第二个核心概念（生成时替换）

生成实际章节时，必须替换此标题，并像 9.1 一样追踪该概念自己的 trigger、JavaScript values/calls、React snapshot/cell/identity、TypeScript runtime boundary、结果原因、错误规则和真实项目识别信号。不得复制 9.1 的 controlled-input 解释来填充其他主题。

<a id="section-9-3"></a>

### 9.3 第三个核心概念（生成时替换）

生成实际章节时，必须替换此标题并提供另一条可验证的机制证据链。若本章实际拥有更多核心小节，继续添加 `9.4`、`9.5`，直到最后一个核心小节，并同步展开 TOC。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| Example | syntax | 说明语法作用 | 说明常见误用 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| Example error | runtime / type / tooling | 说明违反的规则 | 说明修正方式 | 说明识别方法 |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。任何在项目中使用的核心概念，都必须先在对应 `9.x` 小节中用独立机制证据链讲清楚。

### 项目目标

说明项目目标。

### 为什么适合本章

说明项目如何整合本章核心机制。

### 最终小项目结构

最终小项目结构用于解释文件职责和数据流。生成实际章节时必须替换 placeholder；文件存在性和交付证据放到最终回复自检中验证。

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

## 14. 工程迁移与代码审查要点

不要列文件清单。这里用于帮助学习者把本章机制迁移到真实项目的 code review、refactor、migration 和架构判断中。

建议包含：

- code review questions；
- migration checks；
- common production risk signals；
- when to keep this pattern；
- when to refactor away from this pattern；
- what evidence to collect before changing production code。

## 15. 如何转换成个人笔记

说明学习者如何把本章整理成自己的笔记。

## 16. 必须能回答的问题

列出学习者必须能回答的问题。

## 17. 最终记忆模型

总结本章最核心的心智模型。

## 18. 官方文档阅读清单

列出官方文档阅读顺序、每个链接应该重点看什么，以及未验证内容的 `Verification Needed` 标记。
