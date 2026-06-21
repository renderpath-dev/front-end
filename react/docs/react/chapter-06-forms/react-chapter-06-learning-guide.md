# React 第六章：Forms 与 Controlled Components

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
  - [9.1 browser form 默认提交与 preventDefault](#91-browser-form-默认提交与-preventdefault)
  - [9.2 controlled text input 与 render snapshot](#92-controlled-text-input-与-render-snapshot)
  - [9.3 controlled 与 uncontrolled 的所有权边界](#93-controlled-与-uncontrolled-的所有权边界)
  - [9.4 多字段表单与 object state](#94-多字段表单与-object-state)
  - [9.5 controlled textarea 与 select](#95-controlled-textarea-与-select)
  - [9.6 controlled checkbox 与 radio group](#96-controlled-checkbox-与-radio-group)
  - [9.7 form validation 的最小模型](#97-form-validation-的最小模型)
  - [9.8 validation、pending 与 success 状态建模](#98-validationpending-与-success-状态建模)
  - [9.9 TypeScript event、form values 与 field name 类型](#99-typescript-eventform-values-与-field-name-类型)
  - [9.10 SellerHub 表单场景映射](#910-sellerhub-表单场景映射)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [项目目标](#项目目标)
  - [为什么适合本章](#为什么适合本章)
  - [最终小项目结构](#最终小项目结构)
  - [文件职责](#文件职责)
  - [完整代码](#完整代码)
  - [运行方式](#运行方式)
  - [预期输出或交互结果](#预期输出或交互结果)
  - [核心执行流程](#核心执行流程)
  - [常见错误](#常见错误)
  - [可选扩展](#可选扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 最终文件清单](#14-最终文件清单)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章代码定位索引

| 学习目标 | 对应文件 / 片段 | 类型 | 所在章节 |
| --- | --- | --- | --- |
| 本章练习总入口 | `src/learning/react/chapter-06-forms/chapter-06-practice-root.tsx` | 真实练习文件 | 8 |
| 本章共享样式 | `src/learning/react/chapter-06-forms/chapter-06-practice.css` | 真实练习文件 | 8 |
| form submit 默认行为 | `src/learning/react/chapter-06-forms/01-form-submit-default-behavior/form-submit-default-behavior.tsx` | 真实练习文件 | 9.1 |
| controlled text input | `src/learning/react/chapter-06-forms/02-controlled-text-input/controlled-text-input.tsx` | 真实练习文件 | 9.2 |
| 只写 value 的只读错误 | `Snippet: value without onChange` | 概念 snippet | 9.2 |
| controlled / uncontrolled 边界 | `src/learning/react/chapter-06-forms/03-controlled-uncontrolled-boundary/controlled-uncontrolled-boundary.tsx` | 真实练习文件 | 9.3 |
| object form state | `src/learning/react/chapter-06-forms/04-object-form-state/object-form-state.tsx` | 真实练习文件 | 9.4 |
| textarea / select | `src/learning/react/chapter-06-forms/05-controlled-textarea-select/controlled-textarea-select.tsx` | 真实练习文件 | 9.5 |
| checkbox / radio | `src/learning/react/chapter-06-forms/06-controlled-checkbox-radio/controlled-checkbox-radio.tsx` | 真实练习文件 | 9.6 |
| validation feedback | `src/learning/react/chapter-06-forms/07-form-validation/form-validation-feedback.tsx` | 真实练习文件 | 9.7 |
| submit status | `src/learning/react/chapter-06-forms/08-submit-status-model/submit-status-model.tsx` | 真实练习文件 | 9.8 |
| typed form fields | `src/learning/react/chapter-06-forms/09-typed-form-fields/typed-form-fields.tsx` | 真实练习文件 | 9.9 |
| mini project 类型模型 | `src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-types.ts` | 最终小项目文件 | 9.10、12 |
| mini project validation | `src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-validation.ts` | 最终小项目文件 | 12 |
| mini project derived preview | `src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-preview.tsx` | 最终小项目文件 | 12 |
| mini project form owner | `src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form.tsx` | 最终小项目文件 | 12 |
| mini project styles | `src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form-mini-project.css` | 最终小项目文件 | 12 |
| Vite app 挂载 adapter | `src/App.tsx` | 已更新入口文件 | 8 |

## 0. 文件定位

本文件是当前 React + TypeScript 学习路线的第六章，主题以 `README.md` 的 Chapter Progress 为准：**Forms and Controlled Components**。README 原先的 Learning Outline 把第六章写成 effects/refs，与 Chapter Progress 冲突；本次已把 Learning Outline 调整为第五章 rendering data、第六章 forms、第七章 effects/refs、第八章 state architecture，使编号和已完成章节一致。

本章承接三层已经建立的能力：

- 第三章：props 是 parent 传给 child 的组件输入，callback props 可以把操作意图传回 state owner。
- 第四章：event handler 是 callback；state 是 render snapshot；object state 要创建新 object；`preventDefault()` 属于 browser event API。
- 第五章：根据数据选择 UI branch；loading、error、empty、success 表达不同事实；派生值不应重复存入 state。

本章不实现真实 SellerHub，不引入 React Hook Form、Zod、router、backend API、TanStack Query、Prisma 或任何新依赖。最终小项目只模拟本地提交等待，用来学习状态边界。

## 1. 本章解决的问题

真实表单不是“放几个 input”这么简单。它同时包含 browser、JavaScript、React、TypeScript 和 tooling 五层：

1. browser 决定 form submit、输入控件内部值和默认导航行为。
2. JavaScript event callback 读取 DOM event object，并计算 next values 和 validation errors。
3. React 决定哪些值由 state 控制、setter 如何触发下一次 render、当前 handler 看到哪个 snapshot。
4. TypeScript 检查 event element type、form values shape、field name 和 setter 输入，但运行时不会替你校验用户输入。
5. ESLint、`tsc` 和 Vite 分别检查静态规则、类型边界与 production bundling。

本章要建立的核心模型不是“表单模板”，而是：**明确每个字段的值由谁拥有，明确 submit 的 browser 默认动作是否保留，再把 validation 和 submission lifecycle 建模成互不矛盾的状态。**

## 2. 前置概念

| Concept | Why It Is Required |
| --- | --- |
| JavaScript function value | `onChange`、`onSubmit` 接收 callback，而不是立即执行结果。 |
| Browser event | submit、change、default action 属于 browser platform。 |
| Props | 表单 field component 可以通过 props 接收 value 与 callback。 |
| State snapshot | handler 读取创建它的那次 render 中的 values。 |
| Object spread | 更新一个字段时保留其他字段并创建 next object。 |
| Conditional rendering | 显示 validation、pending 与 success feedback。 |
| Stable list key | select options 或动态 fields 需要稳定 identity。 |
| TypeScript union | category、condition 和 submission status 需要有限集合。 |

## 3. 学习目标

完成本章后，你应该能够：

- 解释 browser 为什么会提交 form，以及 `preventDefault()` 实际阻止哪一层行为。
- 用 `value` / `onChange` 和 `checked` / `onChange` 建立 controlled loop。
- 解释 controlled 与 uncontrolled 不是“好坏”，而是当前值所有权不同。
- 用 render snapshot 预测 input handler 和 submit handler 读取到的 values。
- 用 object state 表达相关字段，并保持 immutable update。
- 正确控制 `textarea`、`select`、checkbox 与 radio group。
- 从 current form values 计算 field errors，而不是把所有状态揉成一个 boolean。
- 区分 validation error、pending、success 三类事实。
- 为 input、textarea、select、form event 和 field names 写出合理类型。
- 把同一机制映射到 `LoginForm`、`RegisterForm`、`SellerProductForm`、`ShopForm`、`CheckoutForm` 和 `AdminCategoryForm`。

## 4. 推荐学习顺序

1. 先观察纯 browser form submit，再引入 React `onSubmit` 和 `preventDefault()`。
2. 学习 text input 的 `value -> render -> user edit -> onChange -> setter -> render` loop。
3. 对比 `defaultValue`，明确 uncontrolled input 的后续值由 DOM 保存。
4. 把两个相关字段组合成 object state，并复用第四章 immutable update。
5. 把同一 controlled model 扩展到 textarea、select、checkbox、radio。
6. 从 values 计算 validation errors。
7. 再加入 pending 和 success，避免互相覆盖。
8. 最后补 TypeScript field names 和 element-specific event types，并在 Seller Product Form 集成。

这个顺序先解决运行时所有权，再解决静态类型。若先写复杂 generic handler，容易把 type annotation 误认为表单运行机制。

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| Form default action | browser 根据 form 属性执行提交与导航 | Browser platform | 忘记取消时会离开当前页面。 |
| Submit event | form 被提交时发出的 event | Browser / React event | Enter 与 submit button 都能触发。 |
| Controlled input | 当前值由 React prop 决定的 input | React framework | UI 与 state snapshot 保持一致。 |
| Uncontrolled input | JSX 只给 initial value，后续值由 DOM 保存 | Browser DOM | 不会在每次编辑时进入 React state。 |
| `value` | text、textarea、select 的 current controlled value | React DOM prop | 必须配合同步 `onChange`。 |
| `checked` | checkbox / radio 的 current boolean state | React DOM prop | 不能用 `value` 替代 selection state。 |
| `defaultValue` | uncontrolled control 的 initial value | React DOM prop | 不是后续 current value。 |
| Validation errors | 由 current values 推导的字段问题 | Application state | 与 network pending 不是同一事实。 |
| Pending state | submit operation 尚未结束 | Application state | 用于禁用重复提交和提供反馈。 |
| Field name type | 允许更新的 object key union | TypeScript type system | 防止拼错字段名。 |

## 6. 底层心智模型

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">底层心智模型</span>
  </div>

```txt
render snapshot
  -> React writes value or checked to the DOM control
  -> user edits the control
  -> browser creates an event
  -> React calls the registered handler
  -> handler reads event.currentTarget
  -> setter queues the next form object
  -> React renders with the next snapshot
  -> DOM control receives the next value or checked prop
```
</div>

五层边界必须分开：

- **JavaScript runtime behavior**：event handler 是 function；spread 创建 new object；closure 捕获当前 render bindings；`Number()` 和 string method 执行 validation 计算。
- **React framework behavior**：React 保存 state，调用 handler，处理 queued update，并在 commit 时把 `value` / `checked` 写给 DOM control。
- **Browser platform behavior**：form submit default action、DOM input internal value、event propagation、focus、native constraint validation 都属于 browser。
- **TypeScript type-system behavior**：`ChangeEvent<HTMLInputElement>`、`ProductFormValues` 和 key union 只在编辑器与 compile time 存在，emit 后不会验证输入。
- **Tooling behavior**：`tsc -b` 检查类型，ESLint 检查代码规则，Vite 转换 TSX 并构建 browser bundle。

## 7. 推荐目录结构

目录按照“先 browser submit，再字段 ownership，再多控件，再 validation/status/type”排序。每个目录只承担一个主要学习目标；最终小项目单独组合这些机制。

### 当前项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">当前项目结构</span>
  </div>

```txt
README.md
package.json
src/
  App.tsx
  sudoku/
    main.tsx
  learning/
    react/
      chapter-04-state-and-events/
      chapter-05-rendering-data/
      chapter-06-forms/
docs/
  react/
    chapter-04-state-and-events/
    chapter-05-rendering-data/
    chapter-06-forms/
```
</div>

### 本章文档结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">本章文档结构</span>
  </div>

```txt
docs/react/chapter-06-forms/
  react-chapter-06-learning-guide.md
references/books/react/
  the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf
```
</div>

### 真实练习结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">真实练习结构</span>
  </div>

```txt
src/learning/react/chapter-06-forms/
  chapter-06-practice-root.tsx
  chapter-06-practice.css
  01-form-submit-default-behavior/
    form-submit-default-behavior.tsx
  02-controlled-text-input/
    controlled-text-input.tsx
  03-controlled-uncontrolled-boundary/
    controlled-uncontrolled-boundary.tsx
  04-object-form-state/
    object-form-state.tsx
  05-controlled-textarea-select/
    controlled-textarea-select.tsx
  06-controlled-checkbox-radio/
    controlled-checkbox-radio.tsx
  07-form-validation/
    form-validation-feedback.tsx
  08-submit-status-model/
    submit-status-model.tsx
  09-typed-form-fields/
    typed-form-fields.tsx
```
</div>

### 概念示例结构

以下 logical snippets 只解释错误和修正，不需要创建文件：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">概念示例结构</span>
  </div>

```txt
Snippet: value without onChange
Snippet: checkbox value mistake
Snippet: direct form state mutation
Snippet: mixed validation and pending state
Template: typed immutable field update
Template: controlled checkbox
```
</div>

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/learning/react/chapter-06-forms/seller-product-form-mini-project/
  product-form-types.ts
  product-form-validation.ts
  product-form-preview.tsx
  seller-product-form.tsx
  seller-product-form-mini-project.css
```
</div>

## 8. 示例运行方式

根级 `src/App.tsx` 延续前两章约定，只作为 thin adapter 挂载 `Chapter06PracticeRoot`。`index.html` 仍通过 `src/sudoku/main.tsx` 创建 React root，而该文件导入根级 `src/App.tsx`；本章没有修改 `src/sudoku/`。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/App.tsx</span>
  </div>

```tsx
import { Chapter06PracticeRoot } from './learning/react/chapter-06-forms/chapter-06-practice-root'

function App() {
  return <Chapter06PracticeRoot />
}

export default App
```
</div>

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

浏览器将显示九张独立机制练习卡片和一个 Seller Product Form。验证源码使用：

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Terminal</span>
  </div>

```bash
npm run lint
npm run build
```
</div>

## 9. 分节教学与练习

### 9.1 browser form 默认提交与 preventDefault

**技术意义：** form submit 把“用户完成一组输入”表达为 form 级事件，而不是某个 button 的偶然 click。理解默认提交与 `preventDefault()` 的边界，才能在不丢失 keyboard submit 和 browser 语义的前提下，把提交流程交给 React handler。

**概念解释：** browser 先负责识别一次提交意图并创建 submit event；React 负责让 JSX 中的 `onSubmit` handler 响应该事件；handler 再决定是否取消默认导航以及是否更新 state。这三步不是同一层行为。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** JavaScript runtime 执行 `handleSubmit` 和 setter 调用；React framework 注册 handler、排队 state update 并重新 render；browser API 创建 submit event、提供 `preventDefault()` 并决定默认 action；TypeScript type system 只检查 `FormEvent<HTMLFormElement>` 的静态用法，不会在 runtime 取消提交。

**底层机制：** `<button type="submit">`、字段内 Enter 或 `requestSubmit()` 都可能让 browser 向 form 派发 cancelable submit event。React 调用本次 render 创建的 handler；`preventDefault()` 把 event 的 default-prevented flag 设为 true，handler 随后的 state update 则进入 React update queue。

**API / 语法规则：** 把 `onSubmit={handleSubmit}` 写在 `<form>` 上；在需要 client-side 接管时调用 `event.preventDefault()`；不要把 `return false` 当成 React event handler 的取消方式。

**固定属性名 / 参数签名：** 固定属性名是 `onSubmit` 和 submit button 的 `type="submit"`；本例 handler 签名是 `function handleSubmit(event: FormEvent<HTMLFormElement>): void`，`preventDefault(): void` 来自 event API。

**结论：** `submit` 是 form 的 browser event。React `onSubmit` 注册 handler；`event.preventDefault()` 调用 browser Event API，取消该次 cancelable event 的默认提交动作，但不会停止 event propagation，也不会自动更新 React state。

**本节解决的问题：** 点击 submit button 或在字段中按 Enter 时，为什么页面可能导航或刷新？为什么 handler 应挂在 form 而不是只监听 button click？

**层级边界：**

- Browser：决定什么操作触发 submit，以及默认 action。
- React：把 `onSubmit` callback 接到 form event 上。
- JavaScript：handler function 调用 event method 和 setter。
- TypeScript：`FormEvent<HTMLFormElement>` 描述 parameter。

MDN 明确指出 submit event 触发在 `<form>` 自身；submit button click、字段内 Enter、`requestSubmit()` 都可能触发。`preventDefault()` 只取消默认动作，event 仍照常传播。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/01-form-submit-default-behavior/form-submit-default-behavior.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'

export function FormSubmitDefaultBehavior() {
  const [submissionMessage, setSubmissionMessage] = useState('No submission yet.')

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setSubmissionMessage('React handled the submit event without a page navigation.')
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Browser boundary</p>
      <h3>Form submit default behavior</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Search term
          <input defaultValue="wireless keyboard" name="searchTerm" />
        </label>
        <button type="submit">Submit search</button>
      </form>
      <p aria-live="polite">{submissionMessage}</p>
    </section>
  )
}

```
</div>

**逐行与执行过程：** form render 后，browser 认识 submit button。用户点击或按 Enter，browser 创建 submit event；React 调用 `handleSubmit`；`preventDefault()` 取消默认 navigation；setter queue message update；handler 结束后 React 重新 render 并 commit 新文本。

**常见错误为什么错：** 忘记 `preventDefault()` 时，默认 action 可能离开当前 document，使本地 state feedback 来不及成为稳定 UI。只在 button 上写 `onClick` 还会漏掉 form 的 keyboard submit 语义。

**逐行解释：** 两条 import 分别引入 runtime hook 与 type-only event type。`useState` 保存反馈文本；`handleSubmit` 先取消 browser 默认动作，再排队新的 message；JSX 把 handler 交给 form，并通过 `aria-live` 暴露下一次 render 的反馈。`practice-card`、label 和 heading 是真实练习文件的展示结构，不改变 submit 机制。

**运行方式：** 在项目根目录执行 `npm run dev`，打开第六章入口，在本练习中点击 submit button；也可以让焦点停在输入框中按 Enter，观察两种操作都进入 form handler。

**预期输出或交互结果：** 页面不导航，初始 `No submission yet.` 更新为 `React handled the submit event without a page navigation.`；地址栏和组件挂载状态保持不变。

**执行过程：** React 先 commit form；用户产生提交意图；browser 创建 submit event；React 调用 `handleSubmit`；handler 取消默认 action 并排队 message update；handler 返回后 React 重新 render，最后 commit 新 paragraph text。

**变量与引用变化：** 本次 handler closure 中的 `submissionMessage` 仍是旧 snapshot；`setSubmissionMessage` 不修改该 string binding，而是记录 next state。event object 只在这次派发中代表当前 submit，新的 render 会创建新的 handler closure。

**为什么得到这个结果：** 没有导航是因为 browser default action 被明确取消；反馈变化是因为 React 独立处理了 state update。取消默认行为本身不会产生新文本，setter 也不会自动取消 browser 行为。

**对比情况：** 如果删除 `preventDefault()`，handler 仍可能先运行并排队 update，但 browser 随后可以提交并离开当前 document；如果只监听 button `onClick`，字段内 Enter 等 form submit 路径不会被同一逻辑可靠覆盖。`form.requestSubmit()` 会沿用正常提交过程并派发 submit event，而直接调用 `form.submit()` 不会派发该 event，因此也不会进入 React `onSubmit` handler。

**常见错误为什么错：** 把 `preventDefault()` 理解成“停止冒泡”违反 event 模型；停止 propagation 需要另一套 API。把 handler 只挂在 button 上则违反 form-level submission 语义，也会削弱 keyboard 和辅助技术行为。

**与 SellerHub 的关系：** `LoginForm`、`SellerProductForm` 和 `CheckoutForm` 都需要先保留 form 语义，再在 submit handler 中取消默认导航、执行 validation，并进入 pending 或 error 分支。

**最终记忆模型：** browser 产生 submit 和默认 action，React 连接 handler 与 render，JavaScript handler 分别调用 browser API 和 React setter；三者必须分别推理。

### 9.2 controlled text input 与 render snapshot

**技术意义：** controlled input 让当前字段值成为 React render 的显式输入，使 preview、validation、button 状态和其他 UI 能从同一个 snapshot 派生。

**概念解释：** `value` 描述本次 render 希望 DOM control 显示什么；`onChange` 描述用户提出新值时如何请求下一次 state。它不是双向绑定语法，而是 event -> setter -> render -> commit 的单向循环。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** browser API 保存并暴露用户刚输入的候选 DOM value；React framework 调用 `onChange`、保存 hook state 并在 commit 时同步 `value`；JavaScript runtime 执行 handler 并读取 `currentTarget.value`；TypeScript 检查 `ChangeEvent<HTMLInputElement>` 和 string state，但不保存输入值。

**底层机制：** 每次 render 都产生固定的 `productName` binding。setter 只排队 next string；React 再次调用 component 后才得到新的 binding，并把新 JSX `value` commit 给 input 和 preview paragraph。

**API / 语法规则：** 可编辑 controlled text input 必须同时提供 string `value` 和同步更新该值的 `onChange`。空值使用 `''`，不要用 `undefined` 或 `null` 在 controlled 与 uncontrolled 之间切换。

**固定属性名 / 参数签名：** 固定属性名是 `value` 与 `onChange`；handler 签名为 `function handleProductNameChange(event: ChangeEvent<HTMLInputElement>): void`；候选值从 `event.currentTarget.value` 读取。

**结论：** controlled text input 的 current DOM value 来自本次 render 的 `value` prop；用户编辑触发 `onChange`，handler queue next state，下一次 render 再把 next value 写回 DOM。

**底层机制：** 这不是 input “直接绑定变量”。JavaScript string binding 在一次 render 内不变；setter 不会回写它。React 重新调用 component 后产生新 binding，新的 JSX `value` 才进入 commit。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/02-controlled-text-input/controlled-text-input.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent } from 'react'

export function ControlledTextInput() {
  const [productName, setProductName] = useState('Desk Lamp')

  function handleProductNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setProductName(event.currentTarget.value)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Controlled value</p>
      <h3>Text input follows React state</h3>
      <label>
        Product name
        <input onChange={handleProductNameChange} value={productName} />
      </label>
      <p>
        Current render snapshot: <strong>{productName || 'Empty value'}</strong>
      </p>
    </section>
  )
}

```
</div>

**执行过程：** 初次 render 写入 `Desk Lamp`。每次 keystroke 产生 change-like event；handler 从 `currentTarget.value` 读取 browser control 的候选值；setter queue string；下一次 render 同时更新 input 和 paragraph，因此二者来自同一个 snapshot。

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: value without onChange</span>
  </div>

```tsx
function ReadOnlyByMistake() {
  const [name] = useState('Desk Lamp')
  return <input value={name} />
}
```
</div>

React 每次都强制 DOM value 等于 `name`，但没有 handler 更新 `name`，所以输入会被恢复并出现 read-only warning。若字段应编辑，提供同步 `onChange`；若只想给 uncontrolled initial value，使用 `defaultValue`；若确实只读，显式加 `readOnly`。

**逐行解释：** `useState('Desk Lamp')` 建立初始 snapshot；typed handler 从当前 input 读取 string 并调用 setter；input 同时接收 `value` 和 `onChange`；paragraph 读取同一 `productName`，空 string 时显示 fallback。真实文件中的 class、label 和 heading 只负责练习页面呈现。

**运行方式：** 执行 `npm run dev`，在 `Text input follows React state` 卡片中连续输入、删除并清空 Product name。

**预期输出或交互结果：** input 与 `Current render snapshot` 始终显示同一个值；清空 input 时 paragraph 显示 `Empty value`，输入任意字符后两处同步更新。

**执行过程：** browser 接受一次 edit 并产生 change-like event；React 调用当前 snapshot 的 handler；handler读取 `currentTarget.value` 并排队 state；React 重新 render；commit 将 next value 同时写入 input 和 paragraph。

**变量与引用变化：** string 是 primitive value，旧 render 中的 `productName` 不会被修改。下一次 render 创建新的 string binding；event 的 `currentTarget` 指向本次 handler 所属 input，setter identity 保持稳定。

**为什么得到这个结果：** 两处 UI 都读取同一个 render snapshot，所以不存在两份需要手工同步的数据。输入能够继续编辑，是因为每次候选值都会通过 handler 成为下一次 `value`。

**对比情况：** `defaultValue="Desk Lamp"` 只设置 uncontrolled initial value，后续 DOM edits 不进入 React state；只有 `value` 没有同步 `onChange` 时，React 会在 commit 中把 DOM 恢复成旧 snapshot。

**常见错误为什么错：** 把 `setProductName` 当成直接改变量，会错误预测 handler 内的读取结果；setter 只安排下一次 render。遗漏 `onChange` 又继续传 `value`，则违反 controlled input 必须同步更新 backing value 的规则。

**与 SellerHub 的关系：** SellerHub 商品名、登录邮箱、店铺名称和收货地址都需要 controlled loop，才能让 validation、preview 与 submit payload 读取同一份 state。

**最终记忆模型：** DOM edit 是候选值，state 是 React 保存的值，`value` 是本次 render 的 UI 描述；只有下一次 render 才产生新 snapshot。

### 9.3 controlled 与 uncontrolled 的所有权边界

**技术意义：** ownership boundary 决定谁保存字段的 current value，也决定 render 时能否直接读取、校验和组合该值。先明确所有权，才能避免 controlled/uncontrolled 切换与同步错觉。

**概念解释：** controlled input 把 current value 放在 React state，并在每次 render 通过 `value` 回写；uncontrolled input 只从 `defaultValue` 获得 initial value，之后由 DOM control 自己保存 edits。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** browser control 始终有 DOM value；React framework 仅在 controlled 模式下把 state value持续 commit 给它；JavaScript handler 决定是否把 edit 送入 state；TypeScript 能检查 prop 和 event 类型，却不能证明组件生命周期内没有切换 ownership。

**底层机制：** `value` 每次 commit 都参与同步，`defaultValue` 只用于初始化。React 根据 props 观察 control 的 ownership 是否稳定；从 `undefined` 变成 string 会改变模式并触发 warning。

**API / 语法规则：** controlled 使用 `value` + `onChange`；uncontrolled 使用 `defaultValue`，需要 submit 时可通过 form data 或 ref 读取 DOM。一个 control 在生命周期内应选择一种模式。

**固定属性名 / 参数签名：** controlled text 固定使用 `value`，uncontrolled initial value 使用 `defaultValue`；本例 handler 为 `ChangeEvent<HTMLInputElement>`，从 `currentTarget.value` 读取 string。

**结论：** controlled input 的 current value 在 React state；uncontrolled input 的 current value 在 DOM control。`defaultValue` 只写 initial value，之后修改 state 不会让它变成 controlled。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/03-controlled-uncontrolled-boundary/controlled-uncontrolled-boundary.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent } from 'react'

export function ControlledUncontrolledBoundary() {
  const [controlledValue, setControlledValue] = useState('React owns this value')

  function handleControlledChange(event: ChangeEvent<HTMLInputElement>): void {
    setControlledValue(event.currentTarget.value)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Ownership boundary</p>
      <h3>Controlled and uncontrolled inputs</h3>
      <div className="stacked-fields">
        <label>
          Controlled input
          <input onChange={handleControlledChange} value={controlledValue} />
        </label>
        <label>
          Uncontrolled input
          <input defaultValue="The browser owns later edits" />
        </label>
      </div>
      <p>Only the first value is available in this component render: {controlledValue}</p>
    </section>
  )
}

```
</div>

**对比：** 第一项每次 edit 都进入 React state，因此 render 可以立即派生 preview 或 validation。第二项在 mount 时接收 initial value，后续 edits 不请求 React 保存 current value；若 submit 时需要它，可以让 browser 通过 form data 提供，而不是假装 state 已同步。

**常见错误为什么错：** controlled control 在生命周期内不能切换为 uncontrolled，反之亦然。text value 应始终是 string；不要先传 `undefined`，数据回来后再传 string。初始化为空时用 `''`。本地 PDF 物理页 73 建议用 `null` 清空 controlled input，这与当前 React 官方文档冲突；本章采用 `''`。

**逐行解释：** `useState` 保存 controlled input 的 string；named handler把 browser value 送回 setter；第一个 input 使用 `value`，所以由 React state 控制；第二个只使用 `defaultValue`，所以 mount 后由 browser 保存 edits；paragraph 只能直接显示 React 已知的第一项。

**运行方式：** 执行 `npm run dev`，分别编辑 Controlled input 与 Uncontrolled input，再观察下方 paragraph。

**预期输出或交互结果：** 两个 input 都能编辑，但 paragraph 只随第一个 input 更新；第二个 input 的文字改变不会触发本组件 state 或 render。

**执行过程：** controlled edit 进入 handler、setter、render、commit；uncontrolled edit 由 browser 直接写入 DOM value，没有 React setter，因此没有对应 state transition。

**变量与引用变化：** `controlledValue` 在下一次 render 取得新 string；uncontrolled DOM node 内部 value 改变，但组件没有新的 JavaScript binding 指向该值。两者可见 UI 相似，数据所有权不同。

**为什么得到这个结果：** paragraph 只能读取 component render scope 中的 state，不能自动读取 DOM node 的内部 value。`defaultValue` 没有建立持续同步关系。

**对比情况：** controlled 模式适合实时 preview 和 validation；uncontrolled 模式适合只在 submit 时读取、无需让其他 UI跟随的简单字段。模式选择是 ownership 决策，不是优劣排名。

**常见错误为什么错：** 先传 `value={undefined}`、数据到达后再传 string 会切换 ownership；用 `null` 清空 text input 也不是稳定 string value。应从 `''` 开始 controlled，或始终使用 `defaultValue` 保持 uncontrolled。

**与 SellerHub 的关系：** SellerHub 的商品编辑和 checkout summary 需要实时派生 UI，适合 controlled；某些只在原生 form submit 时读取的辅助字段才可能使用 uncontrolled，但必须明确读取边界。

**最终记忆模型：** `value` 表示 React 持续拥有 current value；`defaultValue` 只交付 initial value，之后 browser 拥有 edits。

### 9.4 多字段表单与 object state

**技术意义：** object state 用一个 domain shape 表达一组共同提交、校验或重置的字段，使 field name、field value 和 payload 边界可以被统一推理。

**概念解释：** object state 不是让多个 input 共享一个可变 object，而是让每次 field edit 基于 previous snapshot 创建 next object。computed property name 只替换被编辑的 property，其余 properties 通过 spread 保留。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** browser API 从 input 暴露 `name` 和 `value` strings；JavaScript runtime 执行 spread、computed property 和 object allocation；React framework 排队并保存 next object reference；TypeScript 用 `ShopFormValues` 与 `keyof` 限制合法字段，但 assertion 在 runtime 不会验证 name。

**底层机制：** `setFormValues((currentValues) => ({ ...currentValues, [fieldName]: fieldValue }))` 先读取 React 提供的 current object，再分配新 object。React 可以把新 reference 视为 next state，旧 render snapshot 仍保持不变。

**API / 语法规则：** related values 可使用一个 typed object state；更新时使用 functional updater、object spread 和 computed property；不要直接写 `formValues[fieldName] = fieldValue`。

**固定属性名 / 参数签名：** DOM field 使用固定 `name` property；handler 是 `ChangeEvent<HTMLInputElement>`；`ShopTextFieldName = keyof ShopFormValues`；setter callback 接收 `ShopFormValues` 并返回完整 `ShopFormValues`。

**结论：** 当多个字段共同描述一个 domain object，并且经常一起 reset、validate、submit 时，object state 能让边界更清楚。它不是“字段多就必须 object”，而是让相关 values 共享一个明确 shape。

**JavaScript 与 React 机制：** `formValues.shopName = nextValue` 会修改当前 snapshot 引用。正确做法是 setter callback 接收 previous object，并用 spread 创建 next object。computed property name 选择这次更新的 key。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/04-object-form-state/object-form-state.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent } from 'react'

type ShopFormValues = {
  shopName: string
  supportEmail: string
}

type ShopTextFieldName = keyof ShopFormValues

const initialShopFormValues: ShopFormValues = {
  shopName: 'Northstar Goods',
  supportEmail: 'support@example.com',
}

export function ObjectFormState() {
  const [formValues, setFormValues] = useState(initialShopFormValues)

  function handleTextChange(event: ChangeEvent<HTMLInputElement>): void {
    const fieldName = event.currentTarget.name as ShopTextFieldName
    const fieldValue = event.currentTarget.value

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: fieldValue,
    }))
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Object state</p>
      <h3>Related fields update immutably</h3>
      <div className="stacked-fields">
        <label>
          Shop name
          <input name="shopName" onChange={handleTextChange} value={formValues.shopName} />
        </label>
        <label>
          Support email
          <input
            name="supportEmail"
            onChange={handleTextChange}
            type="email"
            value={formValues.supportEmail}
          />
        </label>
      </div>
      <p>
        {formValues.shopName} · {formValues.supportEmail}
      </p>
    </section>
  )
}

```
</div>

**逐行解释：** `keyof ShopFormValues` 产生 `'shopName' | 'supportEmail'`。DOM `name` 在 runtime 仍只是 string，所以示例在已知 field 集合边界做 assertion。setter callback 保证从 React 提供的 current object 计算；spread 复制 untouched field；computed key 覆盖一个 property。

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: direct form state mutation</span>
  </div>

```tsx
formValues.shopName = event.currentTarget.value
setFormValues(formValues)
```
</div>

这段代码修改旧 snapshot 指向的 object，并把同一 reference 交回 setter。它破坏 snapshot 可推理性，也不能可靠表达 next state。字段很多时也不要机械创建十几个无组织 `useState`；先判断它们是否属于同一个 submit payload 和 validation boundary。

**逐行解释：** types 定义 object shape 和允许的 keys；initial object 提供稳定初值；handler 分别读取 `name` 与 `value`；functional updater 展开 current object 并覆盖 computed key；两个 inputs 的 `name` 与 object keys 一致；paragraph 从同一 object snapshot 组合显示。

**运行方式：** 执行 `npm run dev`，在 `Related fields update immutably` 卡片中分别编辑 Shop name 与 Support email。

**预期输出或交互结果：** 编辑任一字段时，另一字段保持原值；下方 `shopName · supportEmail` summary 立即反映 current object snapshot。

**执行过程：** browser event 提供 field name/value；handler 把 name 收窄为允许的 key；React 调用 updater 并传入 current state；JavaScript 创建 next object；下一次 render 从 next object 读取两个字段。

**变量与引用变化：** `fieldName` 和 `fieldValue` 是本次 event 的 local bindings；`currentValues` 指向旧 state object；spread 返回不同 reference；未编辑 property 的 primitive value 被复制，旧 object 没有被 mutation。

**为什么得到这个结果：** computed key 只覆盖目标字段，spread 保留其他字段；新 reference 让 next state 与 previous snapshot 的边界明确，因此 summary 能稳定反映更新。

**对比情况：** 多个独立 `useState` 也能实现两个字段，但共同 reset、validate、submit 时需要重新组装；直接 mutation 虽可能改变旧 object 内容，却把同一 reference 交回 setter并破坏 snapshot 模型。

**常见错误为什么错：** `as ShopTextFieldName` 不是 runtime validation。若 `name` 来自不受控配置，拼写错误会写入额外 property；真实项目应让 JSX names 来自受控常量或先做 runtime guard。

**与 SellerHub 的关系：** `SellerProductForm` 的 name、description、category、condition、price 和 publish flag 共同形成 product draft，适合一个 `ProductFormValues` object 和 typed update boundary。

**最终记忆模型：** object state 的关键不是“少写 hook”，而是每次从 current snapshot 创建完整 next object，并让 field key 与 domain type 对齐。

### 9.5 controlled textarea 与 select

**技术意义：** textarea 与 select 虽然是不同 browser controls，但都能通过相同 controlled loop 加入统一 form state，从而参与 preview、validation 和 submit payload。

**概念解释：** textarea current text 使用 `value`，不是 children；single select current choice 也使用 `value`，不是在某个 option 上写 `selected`。两者的 edit 都通过各自的 `onChange` handler 生成 next state。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** browser API 分别提供 `HTMLTextAreaElement.value` 与 `HTMLSelectElement.value`；React framework 把 state value commit 到 control；JavaScript runtime 创建 next details object；TypeScript 保留 `ProductCategory` union，但 browser value 的静态类型仍是 string。

**底层机制：** textarea edit 和 select selection 都先改变 browser 的候选 control state，然后 handler读取 value、排队 next object，React 再 render 并把 canonical value 写回。select assertion 安全与否取决于 options 是否受组件控制。

**API / 语法规则：** textarea 使用 `<textarea value={...} onChange={...} />`；select 使用 `<select value={...} onChange={...}>`；option 的 `value` 必须与 state union 的 literals 完全一致。

**固定属性名 / 参数签名：** 固定属性名是 `value`、`onChange` 和 `<option value>`；handlers 分别使用 `ChangeEvent<HTMLTextAreaElement>` 与 `ChangeEvent<HTMLSelectElement>`；category updater 返回 `ProductCategory`。

**结论：** React 中 textarea 与 single select 都使用 `value` / `onChange` controlled loop。textarea 不用 children 表示内容；select 不在 option 上写 `selected`，而在 select 上写 current `value`。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/05-controlled-textarea-select/controlled-textarea-select.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent } from 'react'

type ProductCategory = 'electronics' | 'home' | 'office'

type ProductDetails = {
  description: string
  category: ProductCategory
}

const initialProductDetails: ProductDetails = {
  description: 'A compact lamp for focused desk lighting.',
  category: 'home',
}

export function ControlledTextareaSelect() {
  const [details, setDetails] = useState(initialProductDetails)

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setDetails((currentDetails) => ({
      ...currentDetails,
      description: event.currentTarget.value,
    }))
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    setDetails((currentDetails) => ({
      ...currentDetails,
      category: event.currentTarget.value as ProductCategory,
    }))
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Text area and select</p>
      <h3>Different controls use the same value loop</h3>
      <div className="stacked-fields">
        <label>
          Description
          <textarea onChange={handleDescriptionChange} value={details.description} />
        </label>
        <label>
          Category
          <select onChange={handleCategoryChange} value={details.category}>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
            <option value="office">Office</option>
          </select>
        </label>
      </div>
      <p>
        {details.category}: {details.description.length} characters
      </p>
    </section>
  )
}

```
</div>

**TypeScript 边界：** DOM `HTMLSelectElement.value` 的标准 type 是 string，不会自动从 option literals 推导 union。因此 assertion 的安全前提是 options 完全受本组件控制。若 options 来自外部或 URL，先做 runtime guard 再写入 union state。

**常见错误为什么错：** state 为 `'home'`，option 却使用 `value="Home"`，大小写不一致时没有 matching option；UI 和业务 union 会分离。应让 state union 与 option value 使用同一组 canonical values。

**逐行解释：** `ProductCategory` 限制三个 canonical choices；`ProductDetails` 把 description 与 category 组成一个 object；两个 handlers 都用 spread 创建 next object；textarea 读写 description；select 读写 category；summary 同时显示 category 和 description length。

**运行方式：** 执行 `npm run dev`，修改 Description 并切换 Category 下拉选项。

**预期输出或交互结果：** textarea 内容保持可编辑，category 在三个选项间切换；summary 的 category 和字符数在每次 render 后同步变化。

**执行过程：** 对应 control 产生 event；element-specific handler 读取 string；updater 创建 next details object；React render 新 JSX；commit 同步 textarea/select 并更新 summary。

**变量与引用变化：** `currentDetails` 指向旧 object，next object 使用新 reference；description 或 category 只替换其中一个 property。`event.currentTarget.value as ProductCategory` 不转换 runtime string，只影响 TypeScript checking。

**为什么得到这个结果：** 两个 control 都从同一个 `details` snapshot 读取，handler 又保留未编辑 property，所以切换 category 不会清空 description，编辑 description 也不会丢失 selection。

**对比情况：** textarea children 只适合普通 HTML initial content 心智模型，不是 React controlled current value；在 option 上写 `selected` 会把 ownership 分散到 children，React 推荐由 select 的 `value` 统一控制。

**常见错误为什么错：** option 使用 `value="Home"`、state 使用 `'home'` 时没有精确 match；把任意外部 string 直接 assertion 为 union 会绕过 type protection。外部值必须先做 runtime validation。

**与 SellerHub 的关系：** 商品 description、category，店铺简介与 shipping method 都需要不同 control 共享一个 typed form object；canonical option values 还会进入后端 payload。

**最终记忆模型：** textarea 和 select 的 DOM 接口不同，但 controlled 机制相同：读取 browser value，生成 next state，再由 React commit canonical value。

### 9.6 controlled checkbox 与 radio group

**技术意义：** checkbox 表达独立 boolean，radio group 表达互斥 choice。正确区分 `checked` 与 `value`，才能让 UI selection 与 domain state 保持同一种数据类型。

**概念解释：** checkbox current selection 来自 boolean `checked`；radio 的 `value` 表示该选项代表什么，boolean `checked` 表示它当前是否被选中。共享 `name` 让 browser 把 radios 识别为一组。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** browser input 提供 boolean `checked` 和 string `value`；React framework commit 每个 control 的 `checked`；JavaScript handler 把这些 primitive values 送入 setter；TypeScript 用 boolean 和 `ProductCondition` union 检查 state shape，但不会验证任意 runtime radio value。

**底层机制：** checkbox edit 从 `currentTarget.checked` 取得 next boolean。radio edit 从被触发 input 的 `value` 取得 domain literal；下一次 render 用 `condition === option` 分别计算每个 radio 的 `checked`。

**API / 语法规则：** checkbox 必须使用 `checked` + `onChange`；radio group 的 controls 共享 `name`，每个有唯一 `value`，并使用 boolean expression 控制 `checked`。

**固定属性名 / 参数签名：** 固定属性名是 `type="checkbox"`、`type="radio"`、`checked`、`name`、`value` 和 `onChange`；两个 handlers 都使用 `ChangeEvent<HTMLInputElement>`，但分别读取 `checked` 与 `value`。

**结论：** checkbox 的 selection state 是 boolean `checked`，不是 `value`。radio 的每个 input 用 boolean expression 控制 `checked`，共享 `name` 形成 group，并用 `value` 表示被选中时代表哪个 domain choice。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/06-controlled-checkbox-radio/controlled-checkbox-radio.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent } from 'react'

type ProductCondition = 'new' | 'used'

export function ControlledCheckboxRadio() {
  const [isPublished, setIsPublished] = useState(false)
  const [condition, setCondition] = useState<ProductCondition>('new')

  function handlePublishedChange(event: ChangeEvent<HTMLInputElement>): void {
    setIsPublished(event.currentTarget.checked)
  }

  function handleConditionChange(event: ChangeEvent<HTMLInputElement>): void {
    setCondition(event.currentTarget.value as ProductCondition)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Boolean and choice controls</p>
      <h3>Checkbox and radio state</h3>
      <label className="inline-choice">
        <input checked={isPublished} onChange={handlePublishedChange} type="checkbox" />
        Publish immediately
      </label>
      <fieldset>
        <legend>Condition</legend>
        <label className="inline-choice">
          <input
            checked={condition === 'new'}
            name="condition"
            onChange={handleConditionChange}
            type="radio"
            value="new"
          />
          New
        </label>
        <label className="inline-choice">
          <input
            checked={condition === 'used'}
            name="condition"
            onChange={handleConditionChange}
            type="radio"
            value="used"
          />
          Used
        </label>
      </fieldset>
      <p>
        {condition} · {isPublished ? 'Published' : 'Draft'}
      </p>
    </section>
  )
}

```
</div>

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: checkbox value mistake</span>
  </div>

```tsx
<input
  onChange={(event) => setPublished(Boolean(event.currentTarget.value))}
  type="checkbox"
  value={String(isPublished)}
/>
```
</div>

checkbox `value` 通常是 form submission payload string；它不描述当前勾选状态。非空 string `'false'` 转 boolean 仍为 `true`。应读取 `currentTarget.checked` 并传 boolean `checked`。

**逐行解释：** 第一个 state 是 publish boolean，第二个是 condition union；checkbox handler 读取 `checked`；radio handler 读取 `value`；checkbox 的 JSX 直接接收 boolean；两个 radios 用 equality 计算 checked 并共享 name；paragraph 从同一 snapshot 派生 status。

**运行方式：** 执行 `npm run dev`，勾选 Publish immediately，并在 New 与 Used 之间切换。

**预期输出或交互结果：** checkbox 在 Draft/Published 间切换；radio group 同时只选择一个 condition；summary 始终显示 current condition 与 publish status。

**执行过程：** browser 改变候选 selection 并派发 event；React 调用对应 handler；setter 排队 boolean 或 union literal；next render 重新计算每个 `checked`；commit 把 canonical selection 写回 controls。

**变量与引用变化：** boolean 与 string literal 都是 primitive snapshot values；旧 handler closure 不会被 setter 改写。radio inputs 是不同 DOM nodes，但都由同一个 `condition` binding 派生 checked。

**为什么得到这个结果：** 每个 radio 的 checked 都来自同一互斥 equality，故不可能在 React description 中同时为 true；checkbox 则有独立 boolean，不依赖 radio value。

**对比情况：** `Boolean(event.currentTarget.value)` 会把非空 `'false'` 也变成 true；读取 `checked` 才得到 browser 的实际 selection boolean。radio 若使用不同 names，browser 也不会把它们视为一个 group。

**常见错误为什么错：** 把 checkbox 的 string `value` 当 selection state 混淆了“提交时代表什么”和“现在是否选中”两种 browser properties；radio omission of shared `name` 还会破坏原生 group semantics。

**与 SellerHub 的关系：** publish flag、terms agreement 和 gift option 使用 checkbox boolean；product condition、shipping option 与 payment choice 使用 radio union。

**最终记忆模型：** checkbox 读写 `checked: boolean`；radio 用 `value` 标识 choice、用 `checked: boolean` 表示 current selection，并由一个 union state 控制整组。

### 9.7 form validation 的最小模型

**技术意义：** 最小 validation 把“values 是否满足 application rules”建模为 pure calculation，使规则可以独立理解、复用和测试，而不会与 DOM event 或 async submission 混成一个过程。

**概念解释：** submit handler 读取 current values snapshot，创建 fresh error object，并为失败字段添加 message。errors 描述本次 validation result；它不是 input value，也不是 request status。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** JavaScript runtime 执行 string checks 和 object mutation（仅 mutation 新建的 local errors object）；React framework 保存 errors state 并条件渲染 feedback；browser API 提供 submit event，并可能另有 constraint validation；TypeScript 检查 optional error properties，但不能证明 email 真实有效。

**底层机制：** `nextErrors` 在每次 submit 中新建，validation rules 只根据当前 closure 的 email/password 计算。`setErrors(nextErrors)` 用一个新 reference 替换 previous result，React 下一次 render 再决定哪些 error paragraphs 存在。

**API / 语法规则：** submit 时先 `preventDefault()`，再从 current values 派生 errors；field errors 使用明确 object shape；不要用 effect 监听 values 来实现本可同步计算的 submit validation。

**固定属性名 / 参数签名：** handler 是 `FormEvent<HTMLFormElement>`；`LoginFormErrors` 固定包含 optional `email` 与 `password`；text input 从 `currentTarget.value` 取得 string。

**结论：** 最小 validation 是一个 pure calculation：输入 current form values，输出 field-error object。它不需要 effect，也不需要 validation library。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/07-form-validation/form-validation-feedback.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'

type LoginFormErrors = {
  email?: string
  password?: string
}

export function FormValidationFeedback() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginFormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const nextErrors: LoginFormErrors = {}

    if (!email.includes('@')) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (password.length < 8) {
      nextErrors.password = 'Use at least 8 characters.'
    }

    setErrors(nextErrors)
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Validation model</p>
      <h3>Validation derives field errors</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input onChange={(event) => setEmail(event.currentTarget.value)} value={email} />
        </label>
        {errors.email && <p className="field-error">{errors.email}</p>}
        <label>
          Password
          <input
            onChange={(event) => setPassword(event.currentTarget.value)}
            type="password"
            value={password}
          />
        </label>
        {errors.password && <p className="field-error">{errors.password}</p>}
        <button type="submit">Validate login</button>
      </form>
    </section>
  )
}

```
</div>

**执行过程：** submit handler 读取本次 render 的 email/password snapshot；创建 fresh errors object；逐条添加问题；一次 setter 替换 errors。没有 error 并不等于 server 已接受，只表示 client-side rules 通过。

**边界：** HTML `required`、`minLength` 等是 browser constraint validation；本例使用 `noValidate` 的 mini project 是为了显式观察 application validation，不代表真实项目应关闭 native validation。TypeScript 只能检查 values 是 string，不能证明 string 是有效 email。

**逐行解释：** error type 允许两个字段独立存在 message；三个 states 分别保存 source values 与 derived validation result；submit handler 取消默认 action、新建 errors、执行 email/password rules 并一次替换 errors；JSX 通过 truthy check 条件渲染 field feedback。

**运行方式：** 执行 `npm run dev`，先提交空表单，再输入无 `@` 的 email 和短 password，最后输入符合本地规则的值重新提交。

**预期输出或交互结果：** 无效 email 显示 `Enter a valid email address.`，短 password 显示 `Use at least 8 characters.`；修正字段并再次提交后，对应 messages 消失，页面不导航。

**执行过程：** browser 派发 submit；handler 读取当前 render snapshot；JavaScript 创建并填充 next errors；React 排队 errors state；next render 根据 optional properties创建或移除 paragraphs。

**变量与引用变化：** `email` 与 `password` 是 submit closure 中的 primitive snapshots；`nextErrors` 是每次 submit 的 fresh object；setter 不修改旧 errors reference，而是让下一次 render 接收新 object。

**为什么得到这个结果：** error UI 完全由 `errors.email` 和 `errors.password` 是否存在决定；相同 values 会经过相同规则得到相同 result。通过 client rules 只表示本地 calculation 没有发现问题。

**对比情况：** browser 的 `required`、`type="email"` 和 `minLength` 属于 constraint validation；本例显式写 application rules 便于观察 state flow。两者可以组合，但不能把 TypeScript 类型检查当成 runtime value validation。

**常见错误为什么错：** validation function 中直接发 request、调用 setter 或读取 DOM 会让 pure rule 与副作用纠缠；把没有 errors 等同于 server success，则混淆 client validation 与 persistence 结果。

**与 SellerHub 的关系：** LoginForm、SellerProductForm 和 CheckoutForm 都需要先产生 field-specific errors，再决定是否进入 request lifecycle；server validation 后续还要作为独立 error source 合并。

**最终记忆模型：** values 是输入，validation 是 pure calculation，errors 是输出；“没有本地 error”只是允许继续 submit，不代表服务器已经成功。

### 9.8 validation、pending 与 success 状态建模

**技术意义：** discriminated union 让 submission lifecycle 的互斥状态显式化，避免一个 boolean 同时被解释为 validation error、request pending 和 success。

**概念解释：** field validation 与 submission lifecycle 是两组事实：前者说明输入哪里不合法，后者说明一次有效提交进行到哪一步。`status` discriminant 决定当前分支允许携带哪些 data。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** JavaScript async function 与 Promise 决定 `await` 前后执行顺序；React framework 保存 union state并根据 status render；browser API 提供 `window.setTimeout` 作为本地 delay；TypeScript 通过 discriminated union narrowing 限制 `submittedEmail` 只在 success 分支读取。

**底层机制：** submit snapshot 先过 validation；有效时排队 pending state，`await` 暂停该 async function，timer 到期后 continuation 仍闭包捕获 submit 时的 email，再排队 success state。

**API / 语法规则：** 使用互斥 union 表达 `idle | pending | success`；pending 时禁用重复提交；validation 失败应提前 return，不进入 pending。本例 timer 只是模拟，不代表 network persistence。

**固定属性名 / 参数签名：** union 的固定 discriminant 是 `status`；handler 签名是 `async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void>`；delay 使用 `window.setTimeout(resolve, 400)`。

**结论：** validation error、pending operation、success result 是不同事实。validation errors 用 field map；submission lifecycle 用 discriminated union。不要用一个 `isLoadingOrError` boolean 表达多个互斥含义。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/08-submit-status-model/submit-status-model.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'

type SubmissionState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; submittedEmail: string }

export function SubmitStatusModel() {
  const [email, setEmail] = useState('seller@example.com')
  const [validationError, setValidationError] = useState('')
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!email.includes('@')) {
      setValidationError('Enter a valid email address.')
      return
    }

    setValidationError('')
    setSubmission({ status: 'pending' })
    await new Promise((resolve) => window.setTimeout(resolve, 400))
    setSubmission({ status: 'success', submittedEmail: email })
  }

  return (
    <section className="practice-card">
      <p className="practice-label">Submission state</p>
      <h3>Validation and request status stay separate</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Seller email
          <input
            disabled={submission.status === 'pending'}
            onChange={(event) => setEmail(event.currentTarget.value)}
            value={email}
          />
        </label>
        {validationError && <p className="field-error">{validationError}</p>}
        <button disabled={submission.status === 'pending'} type="submit">
          {submission.status === 'pending' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submission.status === 'success' && (
        <p className="success-message" role="status">
          Saved locally for {submission.submittedEmail}.
        </p>
      )}
    </section>
  )
}

```
</div>

**Async 与 snapshot：** `await` 前后的 closure 仍持有 submit 时的 `email` snapshot。用户若在 pending 期间还能编辑，success message 可能显示旧提交值而 input 已显示新值。本练习通过 disabled 控制减少歧义；真实 request 还要处理 race、abort 和 server error，但那些属于后续 async data 章节。

**常见错误为什么错：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: mixed validation and pending state</span>
  </div>

```tsx
const [hasProblem, setHasProblem] = useState(false)
```
</div>

这个 boolean 无法说明问题是 invalid input、pending request 还是 failed request，也无法携带 field message 或 success data。应按业务事实拆分，并用 union 限制 impossible states。

**逐行解释：** union 为每个 status 定义合法 payload；三个 states 分别保存 email、validation error 与 lifecycle；handler 先取消 default、验证 email、清空 error、进入 pending、等待 timer，再用 captured email 进入 success；JSX 用 status narrowing 控制 disabled、button text 和 success message。

**运行方式：** 执行 `npm run dev`，先输入无效 email 提交，再改为有效 email 提交并观察 button 与 feedback 的时间顺序。

**预期输出或交互结果：** 无效值只显示 validation message；有效值提交后 input 与 button 暂时 disabled，button 显示 `Submitting...`，约 400ms 后显示 `Saved locally for ...`。

**执行过程：** submit event进入 handler；validation failure 直接 return，或 success path 排队 pending；React commit disabled UI；timer resolve 后 microtask continuation 恢复；success state排队并触发最终 render。

**变量与引用变化：** `email` 在该 async invocation 中是 submit snapshot；后续 render 可以创建新的 email binding，但 closure 不会自动换成它。每个 union update 都创建新的 object reference，status 决定可读 payload。

**为什么得到这个结果：** UI 分支只读取一个明确 status，因此 pending 与 success 不会同时成立；disabled controls 降低重复 submit 和 snapshot 与 UI 值分离的歧义。

**对比情况：** 单个 `hasProblem` boolean 无法携带 field message、pending 或 submitted data，也允许解释冲突。多个互不约束的 booleans 还可能产生 `isPending && isSuccess` 之类 impossible state。

**常见错误为什么错：** validation 失败后忘记 return 会让 invalid form 进入 pending；把 local timer 写成“已保存到服务器”虚构了不存在的 persistence。真实 request 还需 server error、race 和 cancellation 模型。

**与 SellerHub 的关系：** SellerProductForm、checkout 和 authentication 都需要区分 validation error、pending、success 与后续 server error；union 是这些页面扩展 async flow 的基础。

**最终记忆模型：** field errors 解释“输入哪里错”，submission union 解释“有效提交走到哪”；async closure 捕获 submit snapshot，不是始终读取最新 state。

### 9.9 TypeScript event、form values 与 field name 类型

**技术意义：** 分开 event type、values type 与 field-name type，可以让每一层只承担自己的约束：DOM element 能读什么、domain object 有什么字段、generic updater允许更新哪些 key。

**概念解释：** `ChangeEvent<HTMLInputElement>` 描述 handler 参数；`RegisterFormValues` 描述 state object；`keyof RegisterFormValues` 产生允许的 field-name union。三者有关联，但不是同一个类型。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** browser runtime 仍只提供 string `name` 和 `value`；React framework 调用 handler 并保存 next object；JavaScript runtime 执行 property access 与 spread；TypeScript 在编译期检查 element generic、object shape 和 keys，emit 后这些 annotations 全部擦除。

**底层机制：** JSX 中的 literal names 与 TypeScript union 没有自动 runtime连接，所以 handler 在受控边界做 assertion。updater 用 computed key 创建 next object；如果 runtime name 拼错，TypeScript assertion 本身不会阻止它。

**API / 语法规则：** named handlers 应写具体 React event generic；从 handler 所属 element 读取 `currentTarget`；用 `keyof` 表达合法 keys；外部 field names 进入 typed state 前要 runtime guard。

**固定属性名 / 参数签名：** input 固定使用 `name`、`value`、`onChange`；handler 是 `ChangeEvent<HTMLInputElement>`；`RegisterTextFieldName = keyof RegisterFormValues`；state updater 返回完整 `RegisterFormValues`。

**结论：** 三种类型解决不同问题：event type 决定 `currentTarget` 有哪些 DOM properties；values type 决定 form object shape；field name type 决定哪些 keys 可以被更新。它们都会在 emit 后擦除。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/09-typed-form-fields/typed-form-fields.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent } from 'react'

type RegisterFormValues = {
  displayName: string
  email: string
}

type RegisterTextFieldName = keyof RegisterFormValues

const initialRegisterFormValues: RegisterFormValues = {
  displayName: '',
  email: '',
}

export function TypedFormFields() {
  const [formValues, setFormValues] = useState(initialRegisterFormValues)

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>): void {
    const fieldName = event.currentTarget.name as RegisterTextFieldName

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: event.currentTarget.value,
    }))
  }

  return (
    <section className="practice-card">
      <p className="practice-label">TypeScript boundary</p>
      <h3>Event, values, and field names have different types</h3>
      <div className="stacked-fields">
        <label>
          Display name
          <input name="displayName" onChange={handleFieldChange} value={formValues.displayName} />
        </label>
        <label>
          Email
          <input
            name="email"
            onChange={handleFieldChange}
            type="email"
            value={formValues.email}
          />
        </label>
      </div>
      <p>
        {formValues.displayName || 'Unnamed seller'} · {formValues.email || 'No email'}
      </p>
    </section>
  )
}

```
</div>

**`target` 与 `currentTarget`：** React event type 能描述两者，但 handler 挂载元素的稳定边界是 `currentTarget`。event bubbling 时 `target` 可能是更深的 descendant；本章优先从 `currentTarget` 读取 field property。

**Tooling 行为：** inline handler 通常能被 TypeScript inference；抽取成 named function 时要显式写 `ChangeEvent<HTMLInputElement>`、`ChangeEvent<HTMLTextAreaElement>`、`ChangeEvent<HTMLSelectElement>` 或 `FormEvent<HTMLFormElement>`。IDE hover 是确认类型的最快方式。

**逐行解释：** values type 声明两个 string fields；`keyof` 派生 field-name union；initial object提供稳定 controlled values；handler 从 currentTarget 读取 name，并用 functional updater 创建 next object；两个 input names 与 union members 精确匹配；summary 从同一 snapshot 显示 fallback。

**运行方式：** 执行 `npm run dev`，编辑 Display name 与 Email，并用 IDE hover 查看 named handler、`fieldName` 和 state 的推导类型。

**预期输出或交互结果：** 两个 inputs 独立更新且不会覆盖彼此；summary 显示 current values，空字段分别回退为 `Unnamed seller` 与 `No email`；TypeScript 对不存在的 field key 报错。

**执行过程：** browser event 提供 runtime strings；handler assertion 建立受控边界；updater 接收 current object、复制并覆盖目标 key；React render next object；TypeScript checking 只发生在构建或编辑阶段。

**变量与引用变化：** event object 和 `fieldName` 只存在于一次 handler invocation；current state object 保持旧 reference；next object 获得新 reference；type aliases 在 emitted JavaScript 中不存在。

**为什么得到这个结果：** 两个 JSX names 与 domain keys 对齐，所以 computed update覆盖正确 property；spread 保留另一个 field；React 从 next reference 产生同步 summary。

**对比情况：** 使用 `event.target` 时，bubbling 场景的 target 可能不是注册 handler 的 element；`currentTarget` 稳定表示 handler 所属 input。把 field name 写成普通 string 会失去 key约束。

**常见错误为什么错：** assertion 不是 validation；如果 names 来自 server schema 或 URL，直接 `as RegisterTextFieldName` 会掩盖非法值。应先检查该 string 是否属于允许 keys。

**与 SellerHub 的关系：** SellerHub 的 register、shop、product 和 checkout forms 都需要 typed values 与 field keys；不同 input element 还需要各自准确的 event generic。

**最终记忆模型：** event type 管 DOM 接口，values type 管 domain shape，field-name type 管合法更新键；它们在 TypeScript 中协作，在 runtime 仍是普通 objects 和 strings。

### 9.10 SellerHub 表单场景映射

**技术意义：** 场景映射把本章的 browser、React、JavaScript 和 TypeScript 机制迁移到真实页面职责，防止学习者把某个 demo 的字段名称误当成只能用于该 demo 的固定模板。

**概念解释：** Login、register、product、shop 与 checkout forms 共享 controlled loop、submit boundary 和 status model，但它们有不同 values shape 与 validation rules。复用的是机制和建模方法，不是把一份 form component复制到所有页面。

**边界：JavaScript runtime / React framework / browser API / TypeScript type system：** JavaScript runtime 仍处理 values objects、validation functions 和 async control flow；React framework 管 state、render 与 conditional feedback；browser API 管 form controls、events 和 default action；TypeScript type system 为每个 domain 建立不同 values、errors 和 submission unions。

**底层机制：** 每个真实表单都把 browser edit 转成 typed state update，再从 current snapshot 派生 preview 或 errors。submit 时先处理 default action 和 validation，之后才可能进入 async request；后续 library 只封装其中部分步骤，不会消除这些底层边界。

**API / 语法规则：** 为每个 domain 定义明确 values type；用受控 controls 表达需要实时派生的字段；让 validation 接收 values 并返回 errors；用 union 表达互斥 submission states。

**固定属性名 / 参数签名：** form 仍使用 `onSubmit`，controls 使用 `value`/`checked` 与 `onChange`；Seller product domain 使用 `ProductFormValues`、`ProductFormErrors` 和 `ProductFormSubmission`，option lists 通过 `as const` 保留 literal members。

**示例代码：** 下列真实类型文件完整展示 Seller Product Form 的 runtime option data、TypeScript unions、values、errors、submission state 与 initial values。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-types.ts</span>
  </div>

```ts
export const productCategories = ['electronics', 'home', 'office'] as const
export const productConditions = ['new', 'used'] as const

export type ProductCategory = (typeof productCategories)[number]
export type ProductCondition = (typeof productConditions)[number]

export type ProductFormValues = {
  name: string
  description: string
  category: ProductCategory
  condition: ProductCondition
  price: string
  isPublished: boolean
}

export type ProductFormFieldName = keyof ProductFormValues
export type ProductFormErrors = Partial<Record<ProductFormFieldName, string>>

export type ProductFormSubmission =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; submittedName: string }

export const initialProductFormValues: ProductFormValues = {
  name: 'Aurora Desk Lamp',
  description: 'A compact task light with adjustable brightness.',
  category: 'home',
  condition: 'new',
  price: '49.00',
  isPublished: false,
}
```
</div>

**逐行解释：** 两个 const arrays 是 runtime options，`as const` 保留 literal members；indexed access 从 arrays 派生 category/condition unions；`ProductFormValues` 描述 source values；`keyof` 与 `Partial<Record<...>>` 建模 field errors；submission union 限制互斥 lifecycle；initial object提供所有 controlled fields 的稳定初值。

**运行方式：** 执行 `npm run dev`，打开最终 `Seller Product Form`，同时在编辑器中查看该类型文件如何被 form、preview 与 validation modules import。

**预期输出或交互结果：** category 和 condition 只能从给定 options 选择；price 在 input state 中保持 string；publish checkbox 使用 boolean；有效 submit 可从 idle 进入 pending 和 success。

**执行过程：** runtime arrays 生成 option nodes；用户选择后 handler 把 string 收窄到对应 union；values object进入 validation；errors map 控制 field feedback；submission union控制 button 与 success message。

**变量与引用变化：** const arrays 的 references 在 module 初始化后稳定；每次 field edit 创建新的 values object；error calculation 创建新的 errors object；submission transition 创建带不同 `status` 的新 object。所有 type aliases 在 emit 后擦除。

**为什么得到这个结果：** runtime options 与 type unions 来自同一 const data，减少二者漂移；完整 initial object 避免 controlled fields 从 undefined 开始；union 让 status-specific data 只出现在合法分支。

**对比情况：** 如果 options array 与手写 union 分开维护，新增 category 时可能只改一边；如果 price 直接存 number，空输入与小数输入的中间状态难以表达；如果 submission 只用 boolean，则无法携带 submitted name。

**常见错误为什么错：** 把所有 SellerHub forms 共享成一个过宽 `Record<string, unknown>` 会丢失 domain props 和 field keys；把前端 validation type 当成 server guarantee 也混淆了 type checking 与 runtime trust boundary。

**与 SellerHub 的关系：** 该 type model 直接对应 Seller Product Form；LoginForm、ShopForm 和 CheckoutForm 应复用同一建模方法，但分别定义自己的 values、errors 与 submission payload。

**最终记忆模型：** SellerHub 表单复用的是 controlled loop、immutable update、pure validation 和 explicit status，不是复用一个万能 values type；每个 domain 都应保留自己的边界。

本章机制会在 SellerHub 中重复出现，但不同表单的 domain rules 不同：

| Form | Core Values | Controlled Mechanism | Validation Focus | Later Connection |
| --- | --- | --- | --- | --- |
| `LoginForm` | email, password | text/password input | required、email shape | authentication request |
| `RegisterForm` | name, email, password, agreement | object state + checkbox | password、agreement | account creation |
| `SellerProductForm` | name, description, category, price, condition, publish | all chapter controls | product rules | product mutation |
| `ShopForm` | shop name, description, support email | text + textarea | identity/contact | seller onboarding |
| `CheckoutForm` | address, shipping, payment choice | object state + select/radio | address completeness | order submission |
| `AdminCategoryForm` | label, slug, active | text + checkbox | uniqueness/format | admin mutation |

本章只实现 `SellerProductForm` 的 client-only learning version，因为它能覆盖全部控件而不需要伪造 authentication、payment 或 backend behavior。未来接入 React Hook Form、Zod 或 request library 时，browser submission、field ownership、state snapshot 和 type erasure 仍然存在；library 只是改变代码组织和 validation 能力。

## 10. API / 语法索引

| API / Syntax | Layer | Purpose | Input | Output / Effect | Common Mistake |
| --- | --- | --- | --- | --- | --- |
| `<form onSubmit>` | React DOM prop | 注册 submit callback | function | submit 时调用 | 只监听 button click |
| `preventDefault()` | Browser Event API | 取消 cancelable default action | event | 不执行默认 action | 误以为停止 propagation |
| `value` | React DOM prop | 控制 text/textarea/select current value | string | commit 到 DOM control | 不配 `onChange` |
| `checked` | React DOM prop | 控制 checkbox/radio selection | boolean | commit selection | 使用 string `value` 代替 |
| `defaultValue` | React DOM prop | 设置 uncontrolled initial value | string | 只影响初始值 | 后续想用 state 控制 |
| `defaultChecked` | React DOM prop | 设置 uncontrolled initial selection | boolean | 只影响初始值 | 与 `checked` 混用 |
| `event.currentTarget.value` | DOM / React event | 读取 text-like control candidate value | event | string | 假设自动是 union/number |
| `event.currentTarget.checked` | DOM / React event | 读取 checkbox candidate state | event | boolean | 读取 `value` |
| object spread | JavaScript syntax | 创建 next form object | current object | new reference | direct mutation |
| `keyof` | TypeScript type operator | 生成 field key union | object type | compile-time union | 以为验证 runtime string |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| `value` without `onChange` | React warning / behavior bug | controlled value 没有同步 update path | 加 handler、`readOnly` 或改 `defaultValue` | 输入立即回弹 |
| `defaultValue` 后改用 state | ownership bug | lifecycle 中切换 controlled mode | 从初次 render 就选定 ownership | uncontrolled-to-controlled warning |
| submit 忘记 `preventDefault` | Browser behavior bug | 保留默认 navigation | client handler 中取消 default | 页面刷新或 URL 改变 |
| checkbox 读取 `value` | data bug | selection state 在 `checked` | 使用 boolean checked | `'false'` 仍 truthy |
| select union 与 option value 不同 | state/UI mismatch | canonical values 不一致 | 共用 literal values | 没有 matching option |
| direct mutation object state | React state bug | 修改旧 snapshot reference | spread 创建 next object | 旧 snapshot 被连带改变 |
| validation 与 pending 混合 | state-model bug | 不同事实共用一个 flag | errors map + status union | UI 无法解释当前状态 |
| event target type 模糊 | TypeScript boundary error | 没说明 handler element | 用 element-specific event type | `value` / `checked` 报错 |
| 大量无组织 state | maintainability issue | 同一 payload 没有 shape | 相关字段组成 object | reset/submit 需手动拼很多变量 |

## 12. 最终小项目

### 项目目标

创建一个 client-only `SellerProductForm`：seller 编辑商品名称、描述、category、condition、price 和 publish choice；页面即时显示 derived preview；submit 时执行 basic validation、显示 pending，最后给出 local success feedback。

### 为什么适合本章

它集成 controlled text input、textarea、select、checkbox、radio、object state、immutable update、field validation、pending/success branch 和 TypeScript form model。它与后续 SellerHub product mutation 直接相关，但没有伪造 backend persistence。

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终小项目结构</span>
  </div>

```txt
src/learning/react/chapter-06-forms/seller-product-form-mini-project/
  product-form-types.ts
  product-form-validation.ts
  product-form-preview.tsx
  seller-product-form.tsx
  seller-product-form-mini-project.css
```
</div>

### 文件职责

| File | Responsibility |
| --- | --- |
| `product-form-types.ts` | 定义 option literals、form values、errors、submission union 和 initial values。 |
| `product-form-validation.ts` | pure validation calculation 与 error existence check。 |
| `product-form-preview.tsx` | 从 current values 派生 preview，不保存重复 state。 |
| `seller-product-form.tsx` | 拥有 values/errors/submission state，处理 events 和 submit flow。 |
| `seller-product-form-mini-project.css` | 小项目布局、字段、feedback 与 responsive 样式。 |

### 完整代码

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-types.ts</span>
  </div>

```ts
export const productCategories = ['electronics', 'home', 'office'] as const
export const productConditions = ['new', 'used'] as const

export type ProductCategory = (typeof productCategories)[number]
export type ProductCondition = (typeof productConditions)[number]

export type ProductFormValues = {
  name: string
  description: string
  category: ProductCategory
  condition: ProductCondition
  price: string
  isPublished: boolean
}

export type ProductFormFieldName = keyof ProductFormValues
export type ProductFormErrors = Partial<Record<ProductFormFieldName, string>>

export type ProductFormSubmission =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; submittedName: string }

export const initialProductFormValues: ProductFormValues = {
  name: 'Aurora Desk Lamp',
  description: 'A compact task light with adjustable brightness.',
  category: 'home',
  condition: 'new',
  price: '49.00',
  isPublished: false,
}
```
</div>

`as const` 让 option arrays 保留 literal members；indexed access type 从同一 runtime data 推导 union，减少 option values 与 TypeScript union 漂移。price 保持 string，因为 DOM number input 的 `value` 仍是 string；validation 时才显式转换。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-validation.ts</span>
  </div>

```ts
import type { ProductFormErrors, ProductFormValues } from './product-form-types'

export function validateProductForm(values: ProductFormValues): ProductFormErrors {
  const errors: ProductFormErrors = {}
  const numericPrice = Number(values.price)

  if (values.name.trim().length < 3) {
    errors.name = 'Use at least 3 characters.'
  }

  if (values.description.trim().length < 20) {
    errors.description = 'Use at least 20 characters.'
  }

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    errors.price = 'Enter a price greater than zero.'
  }

  return errors
}

export function hasProductFormErrors(errors: ProductFormErrors): boolean {
  return Object.keys(errors).length > 0
}
```
</div>

validation function 不读取 DOM、不调用 setter、没有 effect；相同 values 总得到相同 errors。它适合后续单独测试，但本章不引入 test framework。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-preview.tsx</span>
  </div>

```tsx
import type { ProductFormValues } from './product-form-types'

type ProductFormPreviewProps = {
  values: ProductFormValues
}

export function ProductFormPreview({ values }: ProductFormPreviewProps) {
  const numericPrice = Number(values.price)
  const displayPrice = Number.isFinite(numericPrice) ? numericPrice.toFixed(2) : '0.00'

  return (
    <aside className="product-preview" aria-labelledby="product-preview-title">
      <p className="preview-label">Derived preview</p>
      <h3 id="product-preview-title">{values.name.trim() || 'Untitled product'}</h3>
      <p>{values.description.trim() || 'Add a description to preview the listing.'}</p>
      <dl>
        <div>
          <dt>Category</dt>
          <dd>{values.category}</dd>
        </div>
        <div>
          <dt>Condition</dt>
          <dd>{values.condition}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>${displayPrice}</dd>
        </div>
        <div>
          <dt>Visibility</dt>
          <dd>{values.isPublished ? 'Published' : 'Draft'}</dd>
        </div>
      </dl>
    </aside>
  )
}

```
</div>

preview 没有自己的 state。它从 parent 的 current values 每次 render 计算，因此不会出现“form 已更新但 preview 还是旧值”的同步问题。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form.tsx</span>
  </div>

```tsx
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { ProductFormPreview } from './product-form-preview'
import {
  initialProductFormValues,
  productCategories,
  productConditions,
} from './product-form-types'
import type {
  ProductCategory,
  ProductCondition,
  ProductFormErrors,
  ProductFormSubmission,
  ProductFormValues,
} from './product-form-types'
import { hasProductFormErrors, validateProductForm } from './product-form-validation'
import './seller-product-form-mini-project.css'

export function SellerProductForm() {
  const [formValues, setFormValues] = useState(initialProductFormValues)
  const [validationErrors, setValidationErrors] = useState<ProductFormErrors>({})
  const [submission, setSubmission] = useState<ProductFormSubmission>({ status: 'idle' })

  function updateField<FieldName extends keyof ProductFormValues>(
    fieldName: FieldName,
    fieldValue: ProductFormValues[FieldName],
  ): void {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: fieldValue,
    }))

    setValidationErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[fieldName]
      return nextErrors
    })

    if (submission.status === 'success') {
      setSubmission({ status: 'idle' })
    }
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('name', event.currentTarget.value)
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    updateField('description', event.currentTarget.value)
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    updateField('category', event.currentTarget.value as ProductCategory)
  }

  function handleConditionChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('condition', event.currentTarget.value as ProductCondition)
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('price', event.currentTarget.value)
  }

  function handlePublishedChange(event: ChangeEvent<HTMLInputElement>): void {
    updateField('isPublished', event.currentTarget.checked)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const nextErrors = validateProductForm(formValues)
    setValidationErrors(nextErrors)

    if (hasProductFormErrors(nextErrors)) {
      setSubmission({ status: 'idle' })
      return
    }

    setSubmission({ status: 'pending' })
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    setSubmission({ status: 'success', submittedName: formValues.name.trim() })
  }

  const isPending = submission.status === 'pending'

  return (
    <section className="seller-product-project" aria-labelledby="seller-product-form-title">
      <header className="project-header">
        <div>
          <p className="project-eyebrow">SellerHub learning connection</p>
          <h2 id="seller-product-form-title">Seller Product Form</h2>
          <p>
            Practice a local product draft flow before adding routing, validation libraries,
            or a backend.
          </p>
        </div>
        <span className="project-status">{formValues.isPublished ? 'Published' : 'Draft'}</span>
      </header>

      <div className="product-form-layout">
        <form className="product-form" noValidate onSubmit={handleSubmit}>
          <label>
            Product name
            <input
              aria-describedby={validationErrors.name ? 'product-name-error' : undefined}
              aria-invalid={Boolean(validationErrors.name)}
              disabled={isPending}
              name="name"
              onChange={handleNameChange}
              value={formValues.name}
            />
          </label>
          {validationErrors.name && (
            <p className="field-error" id="product-name-error">
              {validationErrors.name}
            </p>
          )}

          <label>
            Description
            <textarea
              aria-describedby={
                validationErrors.description ? 'product-description-error' : undefined
              }
              aria-invalid={Boolean(validationErrors.description)}
              disabled={isPending}
              name="description"
              onChange={handleDescriptionChange}
              rows={5}
              value={formValues.description}
            />
          </label>
          {validationErrors.description && (
            <p className="field-error" id="product-description-error">
              {validationErrors.description}
            </p>
          )}

          <div className="product-form-row">
            <label>
              Category
              <select
                disabled={isPending}
                name="category"
                onChange={handleCategoryChange}
                value={formValues.category}
              >
                {productCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Price
              <input
                aria-describedby={validationErrors.price ? 'product-price-error' : undefined}
                aria-invalid={Boolean(validationErrors.price)}
                disabled={isPending}
                inputMode="decimal"
                min="0.01"
                name="price"
                onChange={handlePriceChange}
                step="0.01"
                type="number"
                value={formValues.price}
              />
            </label>
          </div>
          {validationErrors.price && (
            <p className="field-error" id="product-price-error">
              {validationErrors.price}
            </p>
          )}

          <fieldset disabled={isPending}>
            <legend>Condition</legend>
            <div className="condition-options">
              {productConditions.map((condition) => (
                <label className="inline-choice" key={condition}>
                  <input
                    checked={formValues.condition === condition}
                    name="condition"
                    onChange={handleConditionChange}
                    type="radio"
                    value={condition}
                  />
                  {condition}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="publish-option">
            <input
              checked={formValues.isPublished}
              disabled={isPending}
              name="isPublished"
              onChange={handlePublishedChange}
              type="checkbox"
            />
            Publish after saving
          </label>

          <button disabled={isPending} type="submit">
            {isPending ? 'Saving product...' : 'Save product'}
          </button>

          {submission.status === 'success' && (
            <p className="success-message" role="status">
              {submission.submittedName} passed local validation and was saved in this demo.
            </p>
          )}
        </form>

        <ProductFormPreview values={formValues} />
      </div>
    </section>
  )
}

```
</div>

上面的代码就是 `seller-product-form.tsx` 的完整内容。`aria-describedby` 与对应 error IDs 把 visible message 关联到 control；class names 同时连接完整 CSS。阅读这一文件时，应把 state ownership、typed field update、validation、submission union、accessibility attributes 与布局 hooks 视为同一真实 component 的不同职责。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
<span class="macos-code-title">src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form-mini-project.css</span>
  </div>

```css
.seller-product-project {
  overflow: hidden;
  margin-top: 64px;
  border: 1px solid #cfd7e3;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 18px 52px rgb(16 24 40 / 9%);
}

.project-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  padding: 30px;
  color: #ffffff;
  background: #14213d;
}

.project-eyebrow,
.preview-label {
  margin: 0;
  color: #93c5fd;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-header h2 {
  margin: 8px 0 0;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
}

.project-header div > p:last-child {
  max-width: 680px;
  margin: 12px 0 0;
  color: #cbd5e1;
  line-height: 1.6;
}

.project-status {
  padding: 7px 12px;
  border: 1px solid rgb(255 255 255 / 28%);
  border-radius: 999px;
  font-weight: 800;
}

.product-form-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 0;
}

.product-form {
  display: grid;
  gap: 16px;
  padding: 30px;
}

.product-form label:not(.inline-choice, .publish-option) {
  display: grid;
  gap: 7px;
  color: #344054;
  font-weight: 750;
}

.product-form input:not([type='checkbox'], [type='radio']),
.product-form textarea,
.product-form select {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 12px;
  color: #101828;
  border: 1px solid #98a2b3;
  border-radius: 8px;
  background: #ffffff;
  font: inherit;
}

.product-form textarea {
  resize: vertical;
}

.product-form input:focus,
.product-form textarea:focus,
.product-form select:focus {
  border-color: #2563eb;
  outline: 3px solid rgb(37 99 235 / 18%);
}

.product-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.product-form fieldset {
  margin: 0;
  padding: 14px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
}

.product-form legend {
  padding: 0 6px;
  color: #344054;
  font-weight: 800;
}

.condition-options {
  display: flex;
  gap: 18px;
}

.publish-option,
.inline-choice {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #344054;
  font-weight: 700;
}

.product-form button {
  padding: 12px 18px;
  color: #ffffff;
  border: 1px solid #2563eb;
  border-radius: 8px;
  background: #2563eb;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

.product-form button:disabled {
  cursor: wait;
  opacity: 0.62;
}

.product-preview {
  padding: 30px;
  border-left: 1px solid #e4e7ec;
  background: #f8fafc;
}

.product-preview .preview-label {
  color: #2563eb;
}

.product-preview h3 {
  margin: 12px 0 0;
  color: #101828;
  font-size: 1.7rem;
}

.product-preview > p:not(.preview-label) {
  color: #667085;
  line-height: 1.65;
}

.product-preview dl {
  display: grid;
  gap: 10px;
  margin: 26px 0 0;
}

.product-preview dl div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d0d5dd;
}

.product-preview dt {
  color: #667085;
}

.product-preview dd {
  margin: 0;
  color: #101828;
  font-weight: 800;
  text-transform: capitalize;
}

@media (max-width: 780px) {
  .project-header {
    align-items: start;
    flex-direction: column;
  }

  .product-form-layout {
    grid-template-columns: 1fr;
  }

  .product-preview {
    border-top: 1px solid #e4e7ec;
    border-left: 0;
  }
}

@media (max-width: 520px) {
  .product-form-row {
    grid-template-columns: 1fr;
  }
}

```
</div>

上面的代码就是 `seller-product-form-mini-project.css` 的完整内容，包含 header、focus、error、success、radio group 与两个 responsive breakpoints。CSS 不改变 controlled form 机制，但这些 selectors 说明 JSX class names 如何映射到最终布局、状态反馈和 mobile presentation。

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

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Output</span>
  </div>

```txt
Editing any field updates the product preview.
Invalid name, description, or price displays field feedback.
Valid submit changes the button to Saving product...
Success feedback appears without page navigation.
The publish checkbox switches the preview between Draft and Published.
```
</div>

### 核心执行流程

1. `SellerProductForm` 用一个 typed object 保存 source values。
2. 每个 control 从相应 property 接收 `value` 或 `checked`。
3. browser event 进入 element-specific handler。
4. `updateField` 创建 next object，并只清除当前 field 的旧 error。
5. React render 后 `ProductFormPreview` 从同一 values snapshot 派生 UI。
6. submit handler 取消 browser default action，pure validation 产生 errors。
7. 有 error 时停在 idle；没有 error 时进入 pending 并禁用 controls。
8. local delay 结束后进入 success，feedback 携带 submit snapshot 中的 name。

### 常见错误

- 把 preview 单独存 state：制造重复数据和同步问题。
- 把 price state 过早存 number：空 input 和中间输入状态难以表达；保持 string，validate 时转换。
- 在 `updateField` 里修改 current object：破坏 immutable snapshot。
- validation 失败后仍进入 pending：让 UI 同时说 invalid 和 saving。
- pending 时允许重复 submit：产生多个并发 completion；本项目禁用 button 和 controls。
- 把 local delay 描述成真实 persistence：本项目没有 backend，success 只代表 demo flow 完成。

### 可选扩展

- 增加 SKU text field，并扩展 `ProductFormValues` 与 pure validation。
- 增加 image URL preview，但必须验证 scheme，不能直接信任任意 external URL。
- 增加 reset button，使用 `initialProductFormValues` 一次替换整个 form object。
- 后续接 backend 时增加 server error union 和 request cancellation；不要在本章提前引入 query library。

## 13. 额外速查表

### 一句话概念总结

Controlled form 把 current field values 放在 React state 中，用 `value` / `checked` 把 snapshot 写入 DOM control，再用 event handler 把用户 edit 转成 immutable next state。

### 常用 API 表

| API / Syntax | Layer | Purpose | Required Inputs | Output / Effect | Common Mistake |
| --- | --- | --- | --- | --- | --- |
| `onSubmit` | React prop | 接收 form submit | handler | React 调用 callback | 放在 button 而不是 form |
| `preventDefault()` | Browser API | 取消默认 action | cancelable event | default action canceled | 当成 React setter |
| `value` + `onChange` | React controlled model | 控制 text-like field | string + handler | state owns current value | value without handler |
| `checked` + `onChange` | React controlled model | 控制 checkbox/radio | boolean + handler | state owns selection | 读取 `value` 判断勾选 |
| `defaultValue` | React DOM prop | 初始化 uncontrolled field | string | DOM owns later edits | 后续切 controlled |
| `FormEvent<HTMLFormElement>` | TypeScript type | 描述 form handler event | element type | compile-time checking | 以为 runtime validation |
| `ChangeEvent<HTMLInputElement>` | TypeScript type | 描述 input change event | element type | typed currentTarget | textarea 仍用 input type |
| `keyof FormValues` | TypeScript operator | 约束 field names | object type | key union | 以为会检查 DOM string |

### 相似概念对照表

| Concept A | Concept B | Key Difference | Use A | Use B |
| --- | --- | --- | --- | --- |
| controlled | uncontrolled | React state vs DOM owns current value | live preview/validation | simple native submission |
| `value` | `defaultValue` | current value vs initial value | controlled | uncontrolled |
| `checked` | `value` on checkbox | selection boolean vs submitted string | UI selection | payload label |
| validation error | pending | invalid input vs operation in progress | block submit | disable repeat submit |
| event type | values type | DOM callback boundary vs domain object shape | handler | state/payload |
| source state | derived preview | user-owned values vs computed UI | store | calculate during render |

### 错误类型表

| Error | Error Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| field cannot type | React warning | controlled field lacks update | add synchronous handler | keystroke reverts |
| page reloads | Browser behavior | submit default remains | call `preventDefault` | state feedback disappears |
| checkbox always true | JavaScript data bug | non-empty string coerced | read `checked` | `'false'` becomes true |
| old field disappears | object update bug | replacement omitted spread | copy current object | sibling property resets |
| option not selected | domain mismatch | state and option values differ | canonical literal set | select has no matching value |
| impossible feedback | state-model bug | facts merged into booleans | errors map + status union | invalid and success coexist |

### 真实项目使用表

| Scenario | Why It Appears | Mechanism Used | Risk | Practical Rule |
| --- | --- | --- | --- | --- |
| login | credentials submit | controlled text + validation | expose password/logging | never log password |
| registration | related fields | object state + checkbox | impossible agreement state | type the payload |
| product editor | live listing preview | all controlled controls | duplicated preview state | derive preview |
| shop onboarding | long description | textarea + object state | premature abstractions | keep fields explicit |
| checkout | address and delivery | select/radio + validation | confusing pending/error | separate lifecycle |
| admin category | small CRUD form | text + checkbox | backend uniqueness | client check is not authority |

### 最小代码模板

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: typed immutable field update</span>
  </div>

```tsx
type FormValues = {
  title: string
  isActive: boolean
}

function updateField<FieldName extends keyof FormValues>(
  fieldName: FieldName,
  fieldValue: FormValues[FieldName],
) {
  setFormValues((currentValues) => ({
    ...currentValues,
    [fieldName]: fieldValue,
  }))
}
```
</div>

这个 template 让 field name 和 field value 关联：`updateField('isActive', 'yes')` 会在 compile time 报错。它不验证 browser event string，event-to-domain conversion 仍应在 handler boundary 完成。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Template: controlled checkbox</span>
  </div>

```tsx
<input
  checked={formValues.isActive}
  onChange={(event) => updateField('isActive', event.currentTarget.checked)}
  type="checkbox"
/>
```
</div>

## 14. 最终文件清单

### 本章学习指导文件

| File | Role | Status |
| --- | --- | --- |
| `docs/react/chapter-06-forms/react-chapter-06-learning-guide.md` | 第六章完整学习指导。 | 已创建并保留。 |

### 本章普通练习文件

| File | Role | Status |
| --- | --- | --- |
| `src/learning/react/chapter-06-forms/chapter-06-practice-root.tsx` | 汇总九个练习和最终小项目。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/chapter-06-practice.css` | 第六章共享练习样式。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/01-form-submit-default-behavior/form-submit-default-behavior.tsx` | browser submit 与 `preventDefault`。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/02-controlled-text-input/controlled-text-input.tsx` | controlled text 与 snapshot。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/03-controlled-uncontrolled-boundary/controlled-uncontrolled-boundary.tsx` | controlled / uncontrolled ownership。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/04-object-form-state/object-form-state.tsx` | immutable object form state。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/05-controlled-textarea-select/controlled-textarea-select.tsx` | textarea 与 select。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/06-controlled-checkbox-radio/controlled-checkbox-radio.tsx` | checkbox 与 radio group。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/07-form-validation/form-validation-feedback.tsx` | basic validation feedback。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/08-submit-status-model/submit-status-model.tsx` | pending 与 success 状态。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/09-typed-form-fields/typed-form-fields.tsx` | event、values、field name 类型。 | 已创建并保留。 |

### 最终小项目文件

| File | Role | Status |
| --- | --- | --- |
| `src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-types.ts` | 小项目 type model 与 initial values。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-validation.ts` | 小项目 pure validation。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/seller-product-form-mini-project/product-form-preview.tsx` | derived product preview。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form.tsx` | 小项目 form state owner。 | 已创建并保留。 |
| `src/learning/react/chapter-06-forms/seller-product-form-mini-project/seller-product-form-mini-project.css` | 小项目样式。 | 已创建并保留。 |

### 入口与路线更新文件

| File | Role | Status |
| --- | --- | --- |
| `README.md` | 修正路线冲突并标记第六章完成。 | 已更新。 |
| `src/App.tsx` | 按当前学习入口约定挂载第六章。 | 已更新。 |

概念错误示例和短对比示例已经集中列在 `7. 推荐目录结构 -> 概念示例结构`，它们使用 `Snippet:` 或 `Template:` 逻辑标题，不是需要创建的文件，因此不进入最终文件清单。

## 15. 如何转换成个人笔记

建议整理成三张图和四组错误复现：

1. 画 `DOM edit -> event -> setter -> render -> value commit` controlled loop。
2. 画 browser default action 与 React state update 两条独立路径。
3. 画 values object、validation errors、submission union 三个 state boundary。
4. 复现 `value` without `onChange`，观察 console warning 和输入回弹。
5. 复现 `defaultValue` 到 `value` 的切换 warning。
6. 复现 checkbox 读取 `value` 后的 truthy bug。
7. 复现 direct object mutation，再用 spread 修正。

## 16. 必须能回答的问题

1. form submit 的 default action 属于 browser 还是 React？
2. `preventDefault()` 为什么不会停止 event propagation？
3. 为什么 handler 挂在 form 能覆盖 click 与 Enter submit？
4. controlled input 的 current value 在哪里？
5. `value` without `onChange` 为什么让 input 不能输入？
6. `defaultValue` 与 `value` 的时间语义有什么不同？
7. setter 后当前 handler 为什么仍看到旧 snapshot？
8. 什么时候多个 fields 适合组成 object state？
9. textarea 为什么使用 `value` 而不是 children？
10. select 为什么在 select 上控制 `value` 而不是 option `selected`？
11. checkbox 为什么读取 `checked`？
12. radio group 的 `checked` expression 和 `value` 各自负责什么？
13. validation errors 与 pending state 为什么不能合并？
14. `ChangeEvent<HTMLInputElement>` 在 runtime 是否存在？
15. DOM select value 为什么仍是 string，而不是自动成为 union？
16. derived preview 为什么不应保存第二份 state？
17. Seller Product Form 的 success 为什么不等于 backend 已保存？

## 17. 最终记忆模型

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">最终记忆模型</span>
  </div>

```txt
Browser form semantics
  + explicit React ownership
  + immutable values object
  + pure validation result
  + explicit submission union
  + compile-time event and field types
  = predictable form behavior
```
</div>

最短版本：browser 负责 form 和 DOM controls；React 用 state 决定 controlled current value；JavaScript handler 把 event value 转成 immutable next object；TypeScript 只检查边界，不替代 runtime validation；validation、pending、success 必须表达成不同事实。

## 18. 官方文档阅读清单

1. [React `<input>` reference](https://react.dev/reference/react-dom/components/input)：先读 controlled / uncontrolled caveats，再读 text、checkbox、radio troubleshooting。重点记住 controlled text 使用 string `value`，checkbox/radio 使用 boolean `checked`，并且生命周期内不能切换模式。
2. [React `<textarea>` reference](https://react.dev/reference/react-dom/components/textarea)：确认 `value` / `onChange`、`defaultValue`，以及 textarea 不接受 children 表示内容。
3. [React `<select>` reference](https://react.dev/reference/react-dom/components/select)：确认 select-level `value`、option canonical values、single/multiple value shape 和 controlled caveats。
4. [React: Using TypeScript](https://react.dev/learn/typescript)：阅读 DOM event typing；inline handler 可推导，抽取 handler 时需要 element-specific event type。
5. [TypeScript: `keyof` Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)：确认 `keyof` 从 object type 产生 property-key literal union。
6. [TypeScript: Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)：确认 indexed access 如何从 property、union 或 array element 取得对应 type。
7. [TypeScript: Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)：确认 assertion 会在编译后移除，不提供 runtime validation，也不会在 assertion 错误时自动抛出异常。
8. [TypeScript: Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)：确认共同 literal property 如何成为 discriminant，并让 TypeScript narrowing 到合法 union member。
9. [MDN: Event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)：确认 default action、cancelable 与 propagation 是不同概念。
10. [MDN: HTMLFormElement submit event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)：确认 submit event 在 form 上触发，可由 button、Enter 或 `requestSubmit()` 触发；直接调用 `form.submit()` 不会派发 submit event。

本地补充资料：

- `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf` 物理页 71-72（书内页 66-67）说明 browser input internal state 与 React controlled value loop。
- 物理页 154-156（书内页 149-151）说明 form、submit button、Enter 和 `preventDefault()`。
- 物理页 73（书内页 68）建议通过 empty 或 `null` 清空 controlled input；当前 React 官方文档要求 controlled text value 保持 string，不能从 string 切换到 `null` / `undefined`。本章因此使用 empty string，并把 PDF 的 `null` 建议标记为不适用于当前 React 规则。
