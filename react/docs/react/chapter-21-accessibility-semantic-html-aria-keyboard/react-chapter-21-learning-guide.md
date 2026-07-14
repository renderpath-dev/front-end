# React 第 21 章：Accessibility、Semantic HTML、ARIA 与 Keyboard Interaction

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
  - [9.1 Accessibility boundary：React component、DOM tree 与 accessibility tree](#section-9-1)
  - [9.2 Semantic HTML first：button、link、heading、list、table、form](#section-9-2)
  - [9.3 Accessible name and description：label、htmlFor、ARIA 关系](#section-9-3)
  - [9.4 Form errors and validation messages：invalid、errormessage、summary](#section-9-4)
  - [9.5 Keyboard operation：Tab、Enter、Space、Escape 与 arrow keys](#section-9-5)
  - [9.6 Focus management：refs、focus restore、validation focus 与 focus visible](#section-9-6)
  - [9.7 Skip links and landmarks：main、nav、search、header、footer](#section-9-7)
  - [9.8 Button vs link vs custom role：activation semantics 与误用边界](#section-9-8)
  - [9.9 Disabled vs aria-disabled：行为、focusability 与 event guard](#section-9-9)
  - [9.10 Disclosure and popover-like UI：expanded state、focus 与 Escape](#section-9-10)
  - [9.11 Modal dialog accessibility：portal、dialog role、focus trap 与 focus return](#section-9-11)
  - [9.12 Live regions：loading、async status、toast、alert 与 polite/assertive](#section-9-12)
  - [9.13 Data table and list semantics：caption、scope、empty state 与 sortable header](#section-9-13)
  - [9.14 Roving tabindex and composite widgets：tabs、listbox、menu button boundary](#section-9-14)
  - [9.15 Testing accessibility：role/name queries、keyboard、focus 与 manual checklist](#section-9-15)
  - [9.16 SellerHub accessibility mapping：catalog、filters、orders、dialog、toast](#section-9-16)
  - [9.17 最终小项目：SellerHub Accessibility Interaction Lab](#section-9-17)
- [10. API / 语法索引](#10-api--语法索引)
- [11. 常见错误表](#11-常见错误表)
- [12. 最终小项目](#12-最终小项目)
  - [12.1 项目目标](#121-项目目标)
  - [12.2 为什么适合本章](#122-为什么适合本章)
  - [12.3 最终小项目结构](#123-最终小项目结构)
  - [12.4 文件职责](#124-文件职责)
  - [12.5 运行方式](#125-运行方式)
  - [12.6 预期交互结果](#126-预期交互结果)
  - [12.7 核心执行流程](#127-核心执行流程)
  - [12.8 常见错误](#128-常见错误)
  - [12.9 可选扩展](#129-可选扩展)
- [13. 额外速查表](#13-额外速查表)
- [14. 工程迁移与代码审查要点](#14-工程迁移与代码审查要点)
- [15. 如何转换成个人笔记](#15-如何转换成个人笔记)
- [16. 必须能回答的问题](#16-必须能回答的问题)
- [17. 最终记忆模型](#17-最终记忆模型)
- [18. 官方文档阅读清单](#18-官方文档阅读清单)

## 本章机制地图

| Mechanism | Owner / Boundary | Runtime Layer | Project Scenario | Source Reading Path |
| --- | --- | --- | --- | --- |
| Semantic DOM output | React component returns native elements | Browser DOM and accessibility tree | Catalog form exposes searchbox, button, and status | `sellerhub-accessibility-interaction-lab/accessible-filter-form.tsx` |
| Accessible name and description | Field component and generated IDs | React render snapshot plus browser name computation | Search input uses label and help text | `03-accessible-name-description/accessible-name-description-panel.tsx` |
| Validation error relationship | Validation state owner | React state, DOM attributes, accessibility API | Settings form marks invalid field and focuses it | `sellerhub-accessibility-interaction-lab/settings-error-summary.tsx` |
| Keyboard operation | Interactive component owner | Browser keyboard events and React event handlers | Disclosure opens with button activation and closes with Escape | `sellerhub-accessibility-interaction-lab/keyboard-disclosure-filter.tsx` |
| Focus repair | Component refs | DOM focus API and React effects | Help dialog restores focus to opener after close | `sellerhub-accessibility-interaction-lab/help-desk-dialog.tsx` |
| Live region update | Async status owner | DOM text mutation and ARIA live semantics | Dashboard announces meaningful loading, success, and error states | `sellerhub-accessibility-interaction-lab/dashboard-status-region.tsx` |
| Composite widget focus | Active index state owner | React state, refs, tabIndex, keyboard events | Roving tabIndex keeps one tab stop in a tablist | `14-roving-tabindex/roving-tabindex-panel.tsx` |
| Accessibility evidence | Test and review boundary | Testing Library role/name queries plus manual review | SellerHub review table maps feature to evidence | `sellerhub-accessibility-interaction-lab/accessibility-review-table.tsx` |

## 0. 本章工程问题与边界

Accessibility 不是“把 UI 做得看起来清楚”或“给元素补几个 `aria-*` 属性”。React 组件返回 JSX，React DOM 把它提交成 DOM；浏览器再基于 DOM 语义、文本、attribute、可聚焦性和状态生成 accessibility tree。辅助技术读取的是这个平台输出，不是 TypeScript 类型，也不是组件名。

语义 HTML 是默认解法。`button`、`a href`、`label`、`input`、`table`、`main`、`nav` 等元素自带 role、状态、默认键盘行为和浏览器约束。ARIA 可以改变 accessibility semantics，但不会自动创建 native behavior：给 `div` 加 `role="button"` 不会自动获得 Space activation、form submission、disabled behavior 或焦点样式。

键盘交互和 focus management 是 runtime 行为。TypeScript 可以检查 `KeyboardEvent` 类型和 ref 类型，但不会证明 Tab 顺序正确、Escape 能关闭、focus 能返回 opener，也不会证明 screen reader 体验完整。

自动化检查和 Testing Library role/name 断言能提供工程证据，但不能证明完整 accessibility。本章不伪造 screen reader 输出，不安装浏览器扩展，不加入 axe、jest-axe、react-aria、Radix UI、Headless UI 或其它 accessibility package。最终判断仍需要语义检查、键盘手测、浏览器 accessibility tree 检查和 code review。

## 1. 本章解决的问题

- 把 React accessibility 从“属性清单”转成 DOM、accessibility tree、keyboard 和 focus 的工程机制。
- 解释 native semantic HTML 为什么优先于 ARIA。
- 让 form label、description、error 和 status message 形成可验证关系。
- 让 disclosure、dialog、composite widget 等交互组件支持键盘。
- 让 focus 在 validation、dialog close、route-like updates 后有明确 owner。
- 让 tests 断言 role/name/focus/ARIA state，而不是 class name。
- 把 SellerHub catalog、orders、dashboard、settings、toast、dialog 映射到 accessibility evidence。

## 2. 前置概念

- JSX attribute 与 DOM attribute 的关系：React 使用 `htmlFor`、`tabIndex`，但 `aria-*` 保持小写。
- React state snapshot：当前 render 读到的是当前 state，事件后更新会触发下一次 render。
- React refs：`ref.current` 可以指向 DOM node，focus repair 依赖它。
- HTML form 基础：label、input、button、submit、disabled、validation。
- DOM focus 基础：`document.activeElement`、Tab 顺序、`focus()`。
- Testing Library 基础：通过 role、label、text 查询用户可感知输出。

## 3. 学习目标

学完后你应该能：

1. 解释 React component tree、DOM tree 和 accessibility tree 的边界。
2. 判断何时使用 native element，何时才需要 ARIA。
3. 给表单控件建立 accessible name、description 和 error relationship。
4. 设计 keyboard-operable disclosure、dialog 和 composite widget。
5. 处理 validation focus、dialog focus trap、focus return 和 focus visible。
6. 选择 `disabled` 或 `aria-disabled` 并补齐 event guard。
7. 用 Testing Library role/name/focus 断言提供证据。
8. 完成 SellerHub accessibility code review mapping。

## 4. 机制依赖图

| First Understand | Then Understand | Dependency Reason | Failure If Skipped |
| --- | --- | --- | --- |
| DOM semantics | Accessibility tree | Browser derives role, name, state, and relationship from DOM | Treats React component names as accessibility output |
| Native element behavior | ARIA boundary | ARIA changes semantics but does not add all native behavior | Builds `div role="button"` without keyboard support |
| Accessible name | Role/name tests | Tests locate controls the way users identify them | Uses class selectors and misses unlabeled controls |
| Description and error IDs | Form validation UI | Relationships require stable unique IDs | Error text is visible but not associated |
| Focus order | Focus management | Runtime focus movement depends on DOM order and refs | Modal opens but keyboard focus remains behind it |
| Keyboard events | Composite widgets | Arrow keys belong inside specific widget boundaries | All options become separate Tab stops |
| Live region politeness | Async status announcements | DOM text changes need appropriate urgency | Every keystroke becomes noisy announcement |
| Manual review boundary | Automated tests | Tests provide evidence, not complete proof | Claims full accessibility from unit tests |

## 5. 核心术语表

| Term | 中文说明 | Layer | Why It Matters |
| --- | --- | --- | --- |
| DOM tree | 浏览器实际节点树 | Browser platform | accessibility tree 的输入之一 |
| Accessibility tree | 浏览器暴露给辅助技术的语义树 | Browser / accessibility API | 用户听到或导航到的是这里的 role/name/state |
| Semantic HTML | 自带语义和行为的 HTML 元素 | Browser platform | 优先于 ARIA，因为行为和语义同时存在 |
| ARIA role | 改变或补充元素语义 | Accessibility API | 只改语义，不自动补齐行为 |
| ARIA state | 表达动态状态，如 `aria-expanded` | Accessibility API | 必须跟 React state 同步 |
| Accessible name | 控件被识别的名称 | Accessibility API | role/name 查询和用户识别都依赖它 |
| Accessible description | 辅助说明关系 | Accessibility API | `aria-describedby` 连接 help/error 等文本 |
| Focus order | Tab 到达元素的顺序 | Browser runtime | 必须符合 DOM 顺序和任务流 |
| Roving tabindex | 复合组件只保留一个 Tab stop | Widget runtime | Arrow keys 在组件内部移动 focus |
| Live region | 动态内容更新通知区域 | Accessibility API | async 状态需要可感知但不过度打扰 |

## 6. 底层心智模型

本章的核心模型是：

1. React 组件返回 JSX。
2. React DOM 把 JSX 提交成真实 DOM。
3. 浏览器根据 DOM、文本、属性、状态、focusability 生成 accessibility tree。
4. 用户用键盘、指针或辅助技术操作 DOM 所暴露的交互。
5. React state 负责同步 `aria-expanded`、`aria-invalid`、live region text、active index、dialog open state 等动态语义。
6. TypeScript 只能检查事件和 ref 的类型，不能替你证明 DOM 语义、焦点顺序或 screen reader 体验。

## 7. 推荐目录结构

### 当前项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Current project structure</span>
  </div>

```txt
D:/vite_ts/
  README.md
  src/App.tsx
  src/site/data/learning-manifest.ts
  src/learning/react/
```
</div>

### 本章文档结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Chapter document structure</span>
  </div>

```txt
docs/react/chapter-21-accessibility-semantic-html-aria-keyboard/
  react-chapter-21-learning-guide.md
```
</div>

### 概念示例结构

下面的 `Snippet:` 只用于解释机制，不代表需要创建真实文件。

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Concept snippets</span>
  </div>

```txt
Snippet: native button semantics
Snippet: custom role button boundary
Snippet: accessible field relationship
Snippet: modal focus trap
Snippet: roving tabIndex
```
</div>

### 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Final mini project structure</span>
  </div>

```txt
src/learning/react/chapter-21-accessibility-semantic-html-aria-keyboard/
  chapter-21-practice-root.tsx
  sellerhub-accessibility-interaction-lab/
    accessible-filter-form.tsx
    help-desk-dialog.tsx
    keyboard-disclosure-filter.tsx
    settings-error-summary.tsx
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
npm run dev
```
</div>

打开 `/react/chapter-21`。用 Tab、Shift+Tab、Enter、Space、Escape、ArrowLeft、ArrowRight 操作页面；再用浏览器 DevTools 的 accessibility tree 检查 role、name、description 和 state。

## 9. 分节教学与练习

<a id="section-9-1"></a>

### 9.1 Accessibility boundary：React component、DOM tree 与 accessibility tree

**结论：**

React 组件不是 accessibility tree。组件只负责返回 JSX；浏览器从提交后的 DOM 推导 role、name、state 和可聚焦性。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: native and custom button boundary</span>
  </div>

```tsx
<button type="button" onClick={saveOrder}>
  Save order
</button>

<div role="button" tabIndex={0} onKeyDown={handleRoleButtonKeyDown}>
  Save order
</div>
```
</div>

**逐行解释：**

1. 第 1 行使用 native `button`，浏览器自动给它 button role、Tab focus、Enter/Space activation。
2. 第 2 行的 visible text 参与 accessible name。
3. 第 5 行用 `div` 伪装 button，只通过 ARIA 表达语义。
4. 第 5 行必须加 `tabIndex={0}` 才能进入 Tab 顺序。
5. 第 5 行必须补 `onKeyDown`，否则键盘用户无法等价操作。

**机制证据链：**

触发动作是用户 Tab 到控件并按 Space。JavaScript runtime 对 native button 不需要额外 key handler；浏览器自己触发 click。对 custom role button，React render snapshot 只提交 `role`、`tabIndex` 和 handler reference，TypeScript 只检查 handler 类型，不会创建键盘语义。观察结果是 native button 可直接操作，而 custom control 必须手写 Enter/Space。违反的规则是“ARIA 增加语义，不自动创建 native behavior”。真实项目中看到 `div onClick`、`role="button"`、无 key handler 时，就应立即审查。

**常见错误与修正：**

错误是只给 `div` 加 `onClick`。修正优先级是：能用 native `button` 就用 `button`；只有 native element 不可能满足需求时，才用 ARIA role 并补齐 keyboard/focus behavior。

<a id="section-9-2"></a>

### 9.2 Semantic HTML first：button、link、heading、list、table、form

**结论：**

Semantic HTML 同时提供语义和行为。ARIA 主要补充语义，不应替代可用的 native element。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: semantic table and list</span>
  </div>

```tsx
<ul>
  <li>Catalog</li>
  <li>Orders</li>
</ul>

<table>
  <caption>Orders by status</caption>
  <tbody>
    <tr>
      <th scope="row">Ready</th>
      <td>18</td>
    </tr>
  </tbody>
</table>
```
</div>

**逐行解释：**

1. 第 1-4 行让浏览器知道这是 list 和 list item，不需要 `role="list"`。
2. 第 6 行使用 table，表示二维数据关系。
3. 第 7 行 caption 给表格一个整体说明。
4. 第 10 行 `th scope="row"` 把 `Ready` 绑定为行 header。
5. 第 11 行数据 cell 可以被理解为属于 `Ready` 这一行。

**机制证据链：**

触发动作是浏览器解析 DOM。JavaScript runtime 没有额外对象；React snapshot 只提交元素类型和子节点；TypeScript 不验证表格语义是否正确。浏览器 accessibility tree 因元素类型得到 list/table/header relationships。错误形式是用一堆 `div` 模拟 list/table，违反“native semantic first”。真实项目中如果订单表用 div grid 却没有复杂 grid 交互，应该改回 table。

**常见错误与修正：**

错误是把所有布局都写成 `div`，再补 role。修正是先问“HTML 有没有 native element 已经提供语义和行为”。有就用 native element。

<a id="section-9-3"></a>

### 9.3 Accessible name and description：label、htmlFor、ARIA 关系

**结论：**

Accessible name 让用户知道控件是什么；description 提供补充说明。React 中用 `htmlFor`、`id`、`aria-describedby` 和 `useId` 建立稳定关系。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: accessible field relationship</span>
  </div>

```tsx
const id = useId()
const helpId = `${id}-help`

<label htmlFor={id}>Seller email</label>
<input id={id} aria-describedby={helpId} type="email" />
<p id={helpId}>Use the address for order alerts.</p>
```
</div>

**逐行解释：**

1. 第 1 行生成与当前 component call 绑定的 unique ID。
2. 第 2 行派生 description ID，避免硬编码重复。
3. 第 4 行 `htmlFor` 在 JSX 中对应 HTML `for`。
4. 第 5 行 input 的 accessible name 来自 label 关系。
5. 第 5-6 行 `aria-describedby` 把 help text 作为 description。

**机制证据链：**

触发动作是 React render field component。JavaScript 创建 `id` 和 `helpId` string；React hook call position 绑定 `useId`；TypeScript 只检查这些 props 是 string，不检查 ID 是否真的存在。浏览器根据 `htmlFor` 和 `aria-describedby` 在 accessibility tree 中计算 name/description。错误是只写 placeholder 或重复 hardcoded ID。真实项目中如果 `getByRole('textbox', { name })` 找不到字段，优先检查 label/name 关系。

**常见错误与修正：**

Placeholder 不是 label；重复 ID 会把多个控件指向同一说明。修正是给每个 field component 使用稳定唯一 ID，并让 visible label 成为 accessible name。

<a id="section-9-4"></a>

### 9.4 Form errors and validation messages：invalid、errormessage、summary

**结论：**

可访问的 validation 不是只把错误文字变红，而是让 invalid state、error message、summary 和 focus repair 形成同一个 state-driven 关系。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: field error relationship</span>
  </div>

```tsx
<input
  aria-errormessage={error ? errorId : undefined}
  aria-invalid={error ? 'true' : undefined}
  id={fieldId}
/>
{error ? <p id={errorId}>{error}</p> : null}
```
</div>

**逐行解释：**

1. 第 1 行渲染实际 form control。
2. 第 2 行只有存在错误时才连接 error message。
3. 第 3 行把 invalid state 暴露给 accessibility tree。
4. 第 4 行保留控件 ID，供 label 或 summary link 指向。
5. 第 6 行错误文本有 ID，能被 `aria-errormessage` 引用。

**机制证据链：**

触发动作是 submit。JavaScript handler 计算 `error` string；React state owner 保存错误；下一次 render 让 input 获得 `aria-invalid` 和 `aria-errormessage`。TypeScript 只能检查 prop value 形状，不会验证错误是否被用户感知。观察结果是 role/name 查询仍能找到字段，并能检测 invalid state。错误是显示一段没有 ID、没有关联、甚至 `display:none` 的错误文本。真实项目中若用户看得到错误但测试无法通过 role/name/invalid 找到关系，就说明语义关系断了。

**常见错误与修正：**

错误是只渲染红色错误文字。修正是用 validation state 同时驱动 field attribute、error text、summary 和 focus target。

<a id="section-9-5"></a>

### 9.5 Keyboard operation：Tab、Enter、Space、Escape 与 arrow keys

**结论：**

Keyboard operation 是组件行为的一部分。Tab/Shift+Tab 负责跨控件移动；Enter/Space 激活动作；Escape 关闭 dismissible UI；arrow keys 属于 composite widget 内部。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: escape closes disclosure content</span>
  </div>

```tsx
function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
  if (event.key === 'Escape') {
    event.preventDefault()
    setIsOpen(false)
  }
}
```
</div>

**逐行解释：**

1. 第 1 行 handler owner 是 disclosure panel，不是全局 window。
2. 第 2 行只处理 Escape，避免吞掉普通输入。
3. 第 3 行阻止 Escape 继续触发其它默认或外层行为。
4. 第 4 行更新 React open state。
5. 下一次 render 移除 panel，`aria-expanded` 同步为 false。

**机制证据链：**

触发动作是用户在 panel 内按 Escape。JavaScript event object 携带 `key`；React handler closure 读取当前 `setIsOpen`；state update 改变 open snapshot；TypeScript 只知道 event 是 keyboard event，不保证按键策略。结果是 panel 关闭，button state 同步。错误是只实现 outside click，违反键盘等价操作。真实项目中如果 popover 只能鼠标点外部关闭，键盘用户会被遮挡内容困住。

**常见错误与修正：**

不要把 `onClick` 当作完整交互。每个可 dismiss 的 UI 都要回答：Tab 如何进入和离开，Escape 是否关闭，focus 留在哪里。

<a id="section-9-6"></a>

### 9.6 Focus management：refs、focus restore、validation focus 与 focus visible

**结论：**

Focus management 是 DOM runtime 修复机制。React ref 提供 DOM node，component state 决定何时修复 focus；CSS 不能移除 outline 而不提供替代。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: focus invalid field</span>
  </div>

```tsx
const fieldRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  if (error) {
    fieldRef.current?.focus()
  }
}, [error])
```
</div>

**逐行解释：**

1. 第 1 行 ref object 在 renders 之间保持同一 identity。
2. 第 3 行 effect 在 commit 后运行，此时 DOM node 已经存在。
3. 第 4 行只在错误存在时修复 focus。
4. 第 5 行调用浏览器 DOM `focus()`。
5. 第 7 行依赖 `error`，避免每次 render 都抢焦点。

**机制证据链：**

触发动作是 validation submit。JavaScript 计算 error；React commit invalid field 和 error text；effect 再读 `ref.current`。TypeScript 只确认 ref 可能是 input 或 null，不证明 focus 位置合理。结果是 `document.activeElement` 变成 invalid input。错误是 render 期间调用 focus、使用 positive `tabIndex` 重排，或 CSS `outline: none` 没替代。真实项目中识别信号是 modal 打开后 focus 仍在背后，或错误出现后键盘用户不知道去哪修。

**常见错误与修正：**

Focus repair 应该修复被状态变化打断的流程，不应预测用户想去哪里。使用 DOM 顺序和 `:focus-visible`，避免 positive `tabIndex`。

<a id="section-9-7"></a>

### 9.7 Skip links and landmarks：main、nav、search、header、footer

**结论：**

Skip link 和 landmark 让用户绕过重复导航，直接到主要内容或功能区域。SPA route change 后也要考虑 heading 或 main focus。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: semantic page shell</span>
  </div>

```tsx
<a href="#main-content">Skip to main content</a>
<header>SellerHub</header>
<nav aria-label="Primary navigation">...</nav>
<main id="main-content" tabIndex={-1}>
  <h1>Orders</h1>
</main>
```
</div>

**逐行解释：**

1. 第 1 行给键盘用户一个跳过导航的目标。
2. 第 2 行 header 标记页面头部区域。
3. 第 3 行 nav 通过 label 区分导航区域。
4. 第 4 行 main 是主要内容 landmark。
5. 第 4 行 `tabIndex={-1}` 允许程序 focus，但不加入普通 Tab 顺序。
6. 第 5 行 h1 给页面内容一个结构标题。

**机制证据链：**

触发动作是用户按 Tab 到 skip link 并激活。浏览器根据 hash 找到 `main-content`；React 不需要额外 state；TypeScript 不验证 landmark 结构。结果是焦点或阅读位置进入 main region。错误是全页面 `div` 布局、重复 nav 无 label、main 不存在。真实项目中如果键盘用户每个 route 都必须穿过长导航，应该加 skip link 和 landmark。

**常见错误与修正：**

不要用 CSS-only 视觉区块代替语义区块。页面 shell 至少应有 main，复杂页面还应有 nav/search/aside 等清晰 landmarks。

<a id="section-9-8"></a>

### 9.8 Button vs link vs custom role：activation semantics 与误用边界

**结论：**

按钮执行动作，链接导航。`a` 没有 `href` 就不是可靠链接；`div role="button"` 是最后手段。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: action navigation and custom role</span>
  </div>

```tsx
<button type="button" onClick={saveSettings}>
  Save settings
</button>

<a href="/orders">View orders</a>
```
</div>

**逐行解释：**

1. 第 1 行 button 是 action owner，不改变 URL。
2. 第 1 行 `type="button"` 避免在 form 内误触发 submit。
3. 第 5 行 anchor 有 `href`，浏览器把它暴露为 link。
4. 第 5 行 link 的默认行为是导航，不应被用作普通按钮。

**机制证据链：**

触发动作是用户激活控件。Native button 触发 action callback；anchor 触发 navigation；React 只绑定 handler 或渲染 href。TypeScript 不知道业务意图。错误是 `<a onClick>` 做保存或 `<button>` 做导航。真实项目中判断标准是“这个交互是否改变位置”。改变位置用 link；提交、保存、打开弹层用 button。

**常见错误与修正：**

不要用 `href="#"` 假装按钮。要么用真实 link，要么用 button。自定义 role button 需要 focus、Enter、Space、pressed/disabled state 和测试证据。

<a id="section-9-9"></a>

### 9.9 Disabled vs aria-disabled：行为、focusability 与 event guard

**结论：**

`disabled` 会让 native form control 不可交互、不可聚焦且不提交。`aria-disabled` 只表达语义，不阻止事件；必须加 event guard。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: aria-disabled guard</span>
  </div>

```tsx
function handleAction() {
  if (isUnavailable) {
    return
  }

  runAction()
}
```
</div>

**逐行解释：**

1. 第 1 行 action handler 仍会被调用。
2. 第 2 行检查 React state 中的 disabled condition。
3. 第 3 行直接返回，阻止业务动作。
4. 第 6 行只在可用状态执行真实 action。

**机制证据链：**

触发动作是用户点击带 `aria-disabled` 的 control。JavaScript handler 仍进入调用栈；React state snapshot 提供 `isUnavailable`；TypeScript 只检查 boolean，不会阻止 click。结果依赖 event guard。错误是写 `aria-disabled="true"` 却继续执行 action。真实项目中凡是使用 `aria-disabled`，code review 必须找 guard。

**常见错误与修正：**

普通 submit button 不可用时优先用 `disabled`。如果为了可发现性保留 focus，再用 `aria-disabled`，并在 click、keydown、submit path 都 guard。

<a id="section-9-10"></a>

### 9.10 Disclosure and popover-like UI：expanded state、focus 与 Escape

**结论：**

Disclosure 是 button 控制一块内容。`aria-expanded` 必须跟 open state 同步；关闭机制不能只有 pointer outside click。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: disclosure button</span>
  </div>

```tsx
<button
  aria-controls={panelId}
  aria-expanded={isOpen}
  onClick={() => setIsOpen((current) => !current)}
>
  Toggle filters
</button>
```
</div>

**逐行解释：**

1. 第 1 行用 native button 获取 keyboard activation。
2. 第 2 行可选地指向受控 panel。
3. 第 3 行把 React open state 暴露成 accessibility state。
4. 第 4 行点击后基于当前 state 切换。
5. 第 6 行 button text 是 accessible name。

**机制证据链：**

触发动作是 Enter/Space/click 激活 button。JavaScript updater 读取 previous boolean；React 下一次 render 同步 `aria-expanded` 和 panel presence；TypeScript 不检查 `panelId` 是否真实存在。结果是 accessibility state 与 UI 可见性一致。错误是 `aria-expanded` hardcoded 或只用 outside click。真实项目中如果 button 显示关闭但 accessibility state 仍 true，应检查 state owner。

**常见错误与修正：**

普通导航下拉不要滥用 `role="menu"`。如果只是显示额外链接，disclosure 往往更合适；若是应用命令菜单，再参考 APG menu button。

<a id="section-9-11"></a>

### 9.11 Modal dialog accessibility：portal、dialog role、focus trap 与 focus return

**结论：**

Portal 只改变 DOM placement，不自动满足 dialog accessibility。Modal 需要 name、modal state、初始 focus、Tab containment、Escape close、visible close button、focus return，并让外部内容不可操作。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: modal dialog shell</span>
  </div>

```tsx
<div
  aria-labelledby={titleId}
  aria-modal="true"
  role="dialog"
>
  <h3 id={titleId}>SellerHub help desk</h3>
  <button onClick={closeDialog}>Close help desk dialog</button>
</div>
```
</div>

**逐行解释：**

1. 第 1 行 dialog container 是 modal behavior owner。
2. 第 2 行把 dialog name 连接到 heading。
3. 第 3 行声明外部内容在 modal 打开时不应被交互。
4. 第 4 行暴露 dialog role。
5. 第 6 行提供 accessible name source。
6. 第 7 行提供可见关闭动作。

**机制证据链：**

触发动作是 opener button 设置 `isOpen=true`。React render 创建 portal content；effect 把 focus 移到 close button；keydown handler 管理 Escape 和 Tab wrap；close 后 timeout 把 focus 还给 opener ref。TypeScript 检查 ref 可能为 null，不证明 trap 正确。错误是只写 `aria-modal` 但 focus 留在背景内容。真实项目中打开 modal 后按 Tab，如果能进入背景页面，就是 modal 行为没有实现。

**常见错误与修正：**

`aria-modal` 有承诺含义；如果没有 focus containment 和外部 inertness，就不要声称它是 modal。短消息确认弹层可能需要 `alertdialog`，普通 help panel 则是 `dialog`。

<a id="section-9-12"></a>

### 9.12 Live regions：loading、async status、toast、alert 与 polite/assertive

**结论：**

Live region 用于动态内容变化。普通状态用 polite；时间敏感错误用 alert/assertive；不要每个 keystroke 都公告。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: status and alert region</span>
  </div>

```tsx
<p aria-busy={isLoading} role={hasError ? 'alert' : 'status'}>
  {message}
</p>
```
</div>

**逐行解释：**

1. 第 1 行同一个 DOM node 表达 async status owner。
2. 第 1 行 loading 时 `aria-busy` 告知更新尚未完成。
3. 第 1 行错误时使用 `alert`，普通状态使用 `status`。
4. 第 2 行 text content 是实际被更新的消息。

**机制证据链：**

触发动作是 async state 从 loading 变成 saved 或 failed。JavaScript setState 写入 message source；React commit 更新 DOM text；browser live region semantics 决定通知优先级；TypeScript 不验证公告是否恰当。错误是把搜索输入每次 keypress 都写进 assertive alert。真实项目中 toast、保存状态、加载完成、请求失败都应先判断 urgency。

**常见错误与修正：**

不要伪造 screen reader 输出。你只能实现语义和状态，再通过浏览器 accessibility tree、手测和必要的真实辅助技术测试验证。

<a id="section-9-13"></a>

### 9.13 Data table and list semantics：caption、scope、empty state 与 sortable header

**结论：**

静态订单数据应该用 table；列表数据应该用 list。Interactive ARIA grid 是另一种复杂 widget，不应为了样式替代 table。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: accessible orders table</span>
  </div>

```tsx
<table>
  <caption>SellerHub orders awaiting review</caption>
  <thead>
    <tr>
      <th scope="col">Status</th>
    </tr>
  </thead>
</table>
```
</div>

**逐行解释：**

1. 第 1 行选择 table，因为数据有行列关系。
2. 第 2 行 caption 给整体表格命名。
3. 第 3 行开始 column header group。
4. 第 5 行 `scope="col"` 建立 column header 关系。
5. 后续 body cell 会继承这个列上下文。

**机制证据链：**

触发动作是用户导航到表格。浏览器解析 caption、thead、th scope；React 只是提交这些节点；TypeScript 不检查行列语义。结果是 accessibility tree 可以表达表格名称和 header 关系。错误是用 div 模拟 table，或把 sortable header 写成不可聚焦 text。真实项目中如果用户需要比较订单行列，优先 table；如果需要单元格级 keyboard navigation，才考虑 grid pattern。

**常见错误与修正：**

空状态不应删除整个 region 后只显示图标。保留语义容器，并显示清晰 empty state text；sortable column 用 header 内的 button。

<a id="section-9-14"></a>

### 9.14 Roving tabindex and composite widgets：tabs、listbox、menu button boundary

**结论：**

Composite widget 不是“每个选项都 Tab 到”。通常外部 Tab 只进入组件一次，内部用 arrow keys 移动 active item，这就是 roving tabindex。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: roving tabIndex</span>
  </div>

```tsx
<button
  aria-selected={index === activeIndex}
  role="tab"
  tabIndex={index === activeIndex ? 0 : -1}
>
  {label}
</button>
```
</div>

**逐行解释：**

1. 第 1 行每个 tab 仍然是可 focus 的 button。
2. 第 2 行把 selected state 暴露给 accessibility tree。
3. 第 3 行 role 表示 composite widget 内的 tab item。
4. 第 4 行只有 active tab 是 Tab stop。
5. 第 6 行 label 参与 accessible name。

**机制证据链：**

触发动作是用户在 tablist 内按 ArrowRight。JavaScript handler 计算 next index；React state 保存 `activeIndex`；refs 让新 active tab 获得 DOM focus；TypeScript 只检查 index 是 number，不证明越界处理正确。结果是一个 tab `tabIndex=0`，其它为 `-1`。错误是所有 option 都 `tabIndex=0`，导致 Tab 顺序爆炸。真实项目中只有当 native select、radio group 或 buttons 不够表达交互时，才构建 custom composite widget。

**常见错误与修正：**

不要为了视觉 chips 直接上 listbox/menu。先判断是否只是普通 filter buttons；只有需要 APG 定义的复合键盘模型时，才实现 roving tabindex。

<a id="section-9-15"></a>

### 9.15 Testing accessibility：role/name queries、keyboard、focus 与 manual checklist

**结论：**

Accessibility tests 应验证用户可感知行为：role、accessible name、description、focus、ARIA state、keyboard interaction。它们不是完整 accessibility 证明。

**示例代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Snippet: role name keyboard test</span>
  </div>

```tsx
const user = userEvent.setup()
const button = screen.getByRole('button', { name: /toggle filters/i })

button.focus()
await user.keyboard('{Enter}')

expect(button).toHaveAttribute('aria-expanded', 'true')
```
</div>

**逐行解释：**

1. 第 1 行创建 user-event 实例。
2. 第 2 行按 role 和 accessible name 找控件。
3. 第 4 行让测试从 keyboard focus 开始。
4. 第 5 行模拟真实 keyboard activation。
5. 第 7 行断言 accessibility state，而不是 class name。

**机制证据链：**

触发动作是 test 调用 keyboard。Testing Library 发出 keyboard events；React handler 更新 open state；DOM attribute 更新后 assertion 读取实际 DOM。TypeScript 不证明测试覆盖完整键盘矩阵。结果是测试能证明这个按钮有 name、能聚焦、Enter 后状态同步。错误是 `container.querySelector('.open')`。真实项目中测试证据要覆盖 role/name、focus return、Escape、invalid state，但仍保留 manual keyboard checklist。

**常见错误与修正：**

不要测试 screen reader “会读什么”。测试你能控制的 DOM 语义和交互，然后用手测或真实辅助技术验证体验。

<a id="section-9-16"></a>

### 9.16 SellerHub accessibility mapping：catalog、filters、orders、dialog、toast

**结论：**

SellerHub accessibility review 应把 feature 映射到 owner、semantic output、keyboard behavior、focus behavior、live update 和 test strategy。

**边界示例：**

| Scenario | Owner | Evidence |
| --- | --- | --- |
| Catalog search form | Form field owner | label、description、status |
| Filter disclosure | Disclosure button | `aria-expanded`、Escape close |
| Orders table | Table semantics | caption、th scope、sort button |
| Help desk dialog | Modal controller | role dialog、focus trap、return |
| Settings validation | Validation state owner | alert summary、aria-invalid、focus |

**机制证据链：**

触发动作是 code review。Reviewer 读取 JSX 和 tests；React state owner 决定 dynamic ARIA state；browser output 决定 role/name；TypeScript 不证明 feature 可操作。结果是每个 SellerHub UI 都有可验证 evidence。错误是只写“已支持无障碍”却没有 role/name/focus/keyboard 证据。真实项目中 review comment 应指向具体 owner 和缺失关系，而不是泛泛要求“加 aria”。

**常见错误与修正：**

不要把所有问题交给自动 audit。自动工具能发现缺少 label 等静态问题，但无法完全证明 modal focus、workflow wording、manual keyboard path 或 screen reader 体验。

<a id="section-9-17"></a>

### 9.17 最终小项目：SellerHub Accessibility Interaction Lab

**结论：**

最终小项目把本章机制组合到一个 SellerHub client-side Vite React lab 中：filter form、orders table、help dialog、live status、disclosure、settings validation 和 review table。

**组合代码：**

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">src/learning/react/chapter-21-accessibility-semantic-html-aria-keyboard/sellerhub-accessibility-interaction-lab/sellerhub-accessibility-interaction-lab.tsx</span>
  </div>

```tsx
export function SellerHubAccessibilityInteractionLab() {
  return (
    <section aria-labelledby="sellerhub-a11y-lab-title">
      <h2 id="sellerhub-a11y-lab-title">SellerHub Accessibility Interaction Lab</h2>
      <AccessibleFilterForm />
      <OrdersTableAccessibility />
      <HelpDeskDialog />
      <DashboardStatusRegion />
      <KeyboardDisclosureFilter />
      <SettingsErrorSummary />
      <AccessibilityReviewTable />
    </section>
  )
}
```
</div>

**逐行解释：**

1. 第 1 行导出最终 lab root。
2. 第 3-4 行给 lab section 一个 heading relationship。
3. 第 5 行训练 label、description 和 status。
4. 第 6 行训练 caption、scope 和 sortable header。
5. 第 7 行训练 modal dialog focus management。
6. 第 8 行训练 live region status。
7. 第 9 行训练 disclosure keyboard behavior。
8. 第 10 行训练 validation error relationship 和 focus repair。
9. 第 11 行训练 review evidence mapping。

**机制证据链：**

触发动作是用户打开 `/react/chapter-21` 并操作 lab。React route lazy-loads practice root；每个 component owns its own state/ref；browser exposes DOM semantics；tests assert role/name/focus/ARIA state。TypeScript 不证明 full accessibility；它只检查 props、events、refs。结果是可运行 lab 提供 client evidence，但不伪造 screen reader 输出、不安装 accessibility libraries、不声称 automated tests 证明完整 accessibility。

## 10. API / 语法索引

| API / Syntax | Layer | Meaning | Common Mistake |
| --- | --- | --- | --- |
| `htmlFor` | React DOM JSX prop | 连接 label 与 form control | 写成 `for` 或 ID 不唯一 |
| `useId()` | React Hook | 生成 accessibility relationships 用的 unique ID | 用它生成 list keys |
| `aria-describedby` | ARIA property | 连接说明文本 | 指向不存在或重复 ID |
| `aria-errormessage` | ARIA property | 连接错误文本 | 没有同步 `aria-invalid` |
| `aria-invalid` | ARIA state | 表示字段当前无效 | 永远 hardcode true |
| `aria-expanded` | ARIA state | 表示 disclosure/composite open state | 与 visible state 不同步 |
| `aria-modal` | ARIA property | 声明 modal outside content 不可交互 | 没有 focus trap 却声称 modal |
| `role="status"` | Live region role | polite 状态更新 | 用于紧急错误 |
| `role="alert"` | Live region role | assertive 错误或重要通知 | 每个 keystroke 都 alert |
| `tabIndex={0}` | DOM focus | 加入自然 Tab 顺序 | 滥用 positive tabIndex |
| `tabIndex={-1}` | DOM focus | 允许 programmatic focus | 用它隐藏真实可操作控件 |

## 11. 常见错误表

| Error | Type | Violated Rule | Correction | How to Recognize Later |
| --- | --- | --- | --- | --- |
| `div onClick` pretending to be button | Runtime / accessibility | Pointer interaction lacks keyboard semantics | Use native button first | Tab cannot reach or Space cannot activate |
| Placeholder-only input | Accessible name | Placeholder is not a label | Use visible label with `htmlFor` | `getByRole('textbox', { name })` fails |
| Duplicate hardcoded IDs | DOM relationship | ID relationships must be unique | Use `useId` or unique data IDs | Description points to wrong field |
| Red text error only | Validation semantics | Error text is not associated | Use invalid state and error relationship | Field has no invalid evidence |
| `aria-disabled` without guard | Runtime behavior | ARIA does not block events | Add event guard or use native disabled | Disabled-looking action still runs |
| Modal without focus trap | Dialog behavior | Modal promise is not implemented | Trap Tab, Escape close, focus return | Tab reaches page behind dialog |
| `outline: none` only | Focus visible | Focus indicator removed | Use `:focus-visible` replacement | Keyboard user loses current location |
| All tabs `tabIndex=0` | Composite widget | One widget should not create many Tab stops | Use roving tabindex | Tab key walks every option |
| Class selector accessibility test | Test boundary | Tests should observe user-facing semantics | Query by role/name/focus/state | Test passes while control is unnamed |

## 12. 最终小项目

最终小项目只用于整合本章机制，不替代前面的分节教学。它把每个核心 accessibility 机制放进可运行的 SellerHub client lab。

### 12.1 项目目标

目标是让学习者用一个页面操作并验证：label/name/description、table semantics、dialog focus、live region、disclosure keyboard、settings validation、review evidence。

### 12.2 为什么适合本章

SellerHub 是多区域业务界面：catalog search、orders table、help dialog、dashboard status 和 settings form 都会产生 accessibility 边界。它比孤立按钮更接近真实项目 review。

### 12.3 最终小项目结构

<div class="macos-code-window">
  <div class="macos-code-titlebar">
    <span class="macos-code-dot macos-code-dot-red"></span>
    <span class="macos-code-dot macos-code-dot-yellow"></span>
    <span class="macos-code-dot macos-code-dot-green"></span>
    <span class="macos-code-title">Final mini project structure</span>
  </div>

```txt
sellerhub-accessibility-interaction-lab/
  sellerhub-accessibility-interaction-lab.tsx
  sellerhub-accessibility-data.ts
  accessible-filter-form.tsx
  orders-table-accessibility.tsx
  help-desk-dialog.tsx
  dashboard-status-region.tsx
  keyboard-disclosure-filter.tsx
  settings-error-summary.tsx
  accessibility-review-table.tsx
```
</div>

### 12.4 文件职责

- `accessible-filter-form.tsx`：visible label、description、searchbox、status。
- `orders-table-accessibility.tsx`：caption、scoped headers、sortable header button。
- `help-desk-dialog.tsx`：portal、dialog role、focus movement、Escape、focus return。
- `dashboard-status-region.tsx`：status/alert live region boundary。
- `keyboard-disclosure-filter.tsx`：button-controlled disclosure、`aria-expanded`、Escape。
- `settings-error-summary.tsx`：validation state、`aria-invalid`、error summary、focus repair。
- `accessibility-review-table.tsx`：把功能映射到 review evidence。

### 12.5 运行方式

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

打开 `/react/chapter-21`。

### 12.6 预期交互结果

- Catalog search input 能通过 label 查找，并有 description。
- Help desk dialog 打开后 focus 进入 dialog，Escape 或 close button 关闭后 focus 回到 opener。
- Disclosure button 的 `aria-expanded` 跟随 open state。
- Settings submit 后 summary 出现，invalid field 获得 focus。
- Live status 只在有意义的 async state change 时更新。

### 12.7 核心执行流程

1. Route 加载 Chapter 21 practice root。
2. Practice root 渲染机制面板和最终 lab。
3. 每个 lab component 通过自己的 state/ref 管理动态语义。
4. React commit DOM attribute 和 text。
5. Browser 基于 DOM 输出 role、name、state、focus、live region。
6. Tests 使用 role/name/focus/ARIA state 验证关键行为。

### 12.8 常见错误

- Dialog 使用 `aria-modal` 但没有 focus trap。
- Disclosure button visible open 了，但 `aria-expanded` 没同步。
- Error text 可见但没有关联到 invalid field。
- Table header 可见但缺少 `scope`。
- Test 只查询 text，不验证 role/name/focus。

### 12.9 可选扩展

- 增加 route change heading focus。
- 为 toast 加入去重和 live region politeness review。
- 用真实浏览器 DevTools 截图记录 accessibility tree inspection。
- 在不新增依赖的前提下补充 manual keyboard checklist 文档。

## 13. 额外速查表

| Concept | One-sentence summary |
| --- | --- |
| Semantic HTML first | 有 native element 就先用 native element。 |
| Accessible name | 用户识别控件的名称，通常来自 label 或 button text。 |
| Accessible description | 用 `aria-describedby` 提供辅助说明。 |
| Focus repair | 用 ref 和 DOM focus API 修复被 UI 状态变化打断的焦点路径。 |
| Roving tabindex | Composite widget 内只保留一个 Tab stop，其余用 arrow keys。 |

| Native pattern | Prefer | Avoid |
| --- | --- | --- |
| Action | `<button type="button">` | `<a href="#">` |
| Navigation | `<a href="/path">` | button that changes location without link semantics |
| Select one option | native radio/select when enough | custom listbox without keyboard model |
| Data table | `<table>` with caption and headers | div grid for static data |
| Modal dialog | role dialog plus behavior | `aria-modal` without focus management |

| Test evidence | Example |
| --- | --- |
| Role and name | `getByRole('button', { name: /save/i })` |
| Description | `toHaveAccessibleDescription(...)` |
| Focus | `toHaveFocus()` |
| ARIA state | `toHaveAttribute('aria-expanded', 'true')` |
| Keyboard | `user.tab()` and `user.keyboard('{Escape}')` |

## 14. 工程迁移与代码审查要点

- Semantic HTML review：能用 native element 时不要先上 ARIA。
- Accessible name review：每个 interactive control 是否能通过 role/name 被找到。
- Form label and error review：`htmlFor`、`aria-describedby`、`aria-invalid`、`aria-errormessage` 是否由同一 state owner 驱动。
- Keyboard operation review：Tab、Shift+Tab、Enter、Space、Escape、arrow keys 是否符合该组件 pattern。
- Focus management review：modal、validation、route-like update 后 focus 是否可预测，是否保留 focus visible。
- Modal/dialog review：`aria-modal` 是否和 focus trap、Escape、focus return、outside inertness 一起实现。
- Live region review：status/alert 是否只用于有意义的动态更新，是否避免过度公告。
- Table/list review：静态数据是否保留 list/table semantics，sortable header 是否用 button。
- Custom widget review：是否真的需要 composite widget；是否实现 roving tabindex。
- Disabled state review：`aria-disabled` 是否有 event guard；native disabled 是否更合适。
- Testing evidence review：是否有 role/name、keyboard、focus、ARIA state tests。
- Automated audit boundary review：自动检查只是 evidence，不是完整 accessibility 证明。

## 15. 如何转换成个人笔记

建议把本章整理成五张卡片：

1. DOM tree 到 accessibility tree 的边界。
2. Native HTML vs ARIA 的决策顺序。
3. Label、description、error、status 的 ID 关系。
4. Keyboard/focus pattern：disclosure、dialog、roving tabindex。
5. Evidence：role/name tests、manual keyboard checklist、browser accessibility tree inspection。

## 16. 必须能回答的问题

1. 为什么 React component tree 不等于 accessibility tree？
2. 为什么 semantic HTML 优先于 ARIA？
3. Accessible name 和 visible label 有什么关系？
4. `aria-describedby` 与 `aria-errormessage` 的用途有什么不同？
5. 为什么 `aria-disabled` 不会阻止 click handler？
6. Dialog 为什么不能只写 `aria-modal`？
7. Roving tabindex 解决了什么 Tab 顺序问题？
8. Live region 什么时候用 `status`，什么时候用 `alert`？
9. Testing Library role/name 查询为什么比 class selector 更可靠？
10. 为什么 automated tests 不能证明完整 accessibility？

## 17. 最终记忆模型

React accessibility 的最终模型是：

React state 和 JSX 产生 DOM；browser 从 DOM 产生 accessibility tree；用户通过 keyboard、pointer 和 assistive technology 操作该平台输出。Native HTML 同时给语义和行为，所以优先使用。ARIA 只在 native HTML 不足时补语义，并且必须由 React state、event handler、ref 和 tests 证明行为同步。自动测试提供 evidence，但最终还需要 manual keyboard review 和 accessibility tree inspection。

## 18. 官方文档阅读清单

- React `useId`：重点看 accessibility attributes 的 unique ID 关系。
- React DOM common components：重点看 `aria-*`、`role`、`tabIndex`、keyboard/focus event props。
- React `<input>`：重点看 label、controlled value、`disabled`、`onChange`、`onInvalid`。
- React legacy accessibility：重点看 labeling、focus control、skip links、pointer-only caveat。
- W3C Using ARIA / APG：重点看 native HTML first、keyboard-operable ARIA widgets、dialog/disclosure/listbox/tabs patterns。
- W3C WCAG 2.2 Quick Reference：重点看 keyboard access、focus visible、labels、status messages、name/role/value。
- MDN ARIA live regions：重点看 polite/assertive、status、alert、aria-busy。
- Testing Library ByRole 与 user-event keyboard/tab：重点看 accessible name query、keyboard input、Tab focus assertions。
