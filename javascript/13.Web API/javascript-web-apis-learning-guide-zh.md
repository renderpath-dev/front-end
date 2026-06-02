# JavaScript Web APIs 学习指导文件

> 定位：这是《JavaScript 权威指南》第 15 章“浏览器中的 JavaScript（JavaScript in Web Browsers）”的学习指导文件，不是最终学习笔记。  
> 目标：你按照这份文件创建练习目录、写代码、运行页面、观察浏览器行为和控制台输出，再把每节整理成最终学习笔记。  
> 参考范围：书上第 15 章 + MDN Web APIs 文档。  
> 语言规则：正文统一中文；必要技术术语保留 English term。  
> 代码规则：代码命名和代码注释统一英文；代码和代码注释不使用中文字符。  
> 链接规则：MDN 链接使用正常 Markdown 链接，不放进 `txt` 代码块。

---

## 目录

1. [本文件怎么用](#1-本文件怎么用)
2. [第 15 章 Web API 的完整学习顺序](#2-第-15-章-web-api-的完整学习顺序)
3. [本章先要建立的底层模型](#3-本章先要建立的底层模型)
4. [00：浏览器运行环境模型](#4-00浏览器运行环境模型)
5. [01：脚本加载、模块脚本和全局对象](#5-01脚本加载模块脚本和全局对象)
6. [02：DOM 查询和节点模型](#6-02dom-查询和节点模型)
7. [03：DOM 创建、插入、删除和文本更新](#7-03dom-创建插入删除和文本更新)
8. [04：事件、事件对象和事件传播](#8-04事件事件对象和事件传播)
9. [05：表单、输入事件和默认行为](#9-05表单输入事件和默认行为)
10. [06：CSSOM、classList、computed style](#10-06cssomclasslistcomputed-style)
11. [07：文档几何、尺寸和滚动](#11-07文档几何尺寸和滚动)
12. [08：Web Components 基础](#12-08web-components-基础)
13. [09：SVG 基础和命名空间创建](#13-09svg-基础和命名空间创建)
14. [10：Canvas 2D 绘图](#14-10canvas-2d-绘图)
15. [11：Audio API 基础预习](#15-11audio-api-基础预习)
16. [12：Location、History 和导航状态](#16-12locationhistory-和导航状态)
17. [13：Fetch、Request、Response 和 AbortController](#17-13fetchrequestresponse-和-abortcontroller)
18. [14：Web Storage、Cookie 和 IndexedDB 预习](#18-14web-storagecookie-和-indexeddb-预习)
19. [15：Worker 和消息传递](#19-15worker-和消息传递)
20. [16：小项目整合](#20-16小项目整合)
21. [最终文件清单](#21-最终文件清单)
22. [最终学习笔记转换要求](#22-最终学习笔记转换要求)
23. [本章最终要能回答的问题](#23-本章最终要能回答的问题)
24. [MDN 阅读清单](#24-mdn-阅读清单)

---

## 1. 本文件怎么用

### 结论

这一章不能靠“看 API 名称”学。Web API 的学习方式必须是：打开浏览器，写页面，触发交互，观察 DOM、事件、网络请求、存储状态和线程消息。

这章的本质是：

```text
JavaScript core language
  talks to
browser host environment
  through
Web APIs
```

### 每节固定学习步骤

每一节都按这个顺序做：

```text
1. Read the conclusion.
2. Read the keyword explanations.
3. Create the directory and files.
4. Run a local server.
5. Open the page in a browser.
6. Interact with the page if needed.
7. Observe the DOM, console, network panel, storage panel, or worker behavior.
8. Explain the execution process.
9. Create one intentional mistake and explain the error.
10. Convert the section into final learning notes.
```

### 推荐运行方式

浏览器章节不要直接用 `file://` 打开。统一用本地服务器：

```bash
python3 -m http.server 5173
```

然后打开：

```text
http://localhost:5173
```

如果你使用 VS Code，也可以用 Live Server。

### 代码注释模板

每个 JS 文件顶部写英文注释：

```js
// Goal:
// Verify how this browser API example works.

// Expected behavior:
// Replace this block with the observed browser behavior.
```

---

## 2. 第 15 章 Web API 的完整学习顺序

### 结论

本章按这个顺序学：

```text
browser environment model
  -> script loading
  -> DOM query
  -> DOM mutation
  -> events
  -> forms
  -> CSSOM
  -> geometry and scrolling
  -> Web Components
  -> SVG
  -> Canvas
  -> Audio
  -> Location and History
  -> Fetch
  -> Storage
  -> Workers
  -> integrated browser project
```

### 技术意义

书上第 15 章覆盖的范围很大，包括 Web 编程基础、事件、DOM、CSS、文档几何与滚动、Web Components、SVG、Canvas、Audio API、位置导航与历史、网络、存储、工作线程与消息传递。

这不是一章“语法学习”，而是从核心 JavaScript 进入真实浏览器工程的入口。

### 本章不是简单 API 列表

本章难点不是记住：

```text
document.querySelector
addEventListener
fetch
localStorage
Worker
canvas.getContext
```

真正难点是理解：

- 浏览器如何把 HTML 文档暴露成 DOM tree。
- 事件如何从用户行为进入 JavaScript。
- DOM 修改为什么会影响页面。
- CSS 规则、inline style、computed style 有什么区别。
- `fetch()` 为什么是 Promise-based API。
- `localStorage` 为什么只能存字符串。
- Worker 为什么不能直接操作 DOM。
- History API 为什么只改变会话历史状态，不等于重新加载页面。

---

## 3. 本章先要建立的底层模型

### 结论

Web API 是浏览器宿主环境（browser host environment）提供给 JavaScript 的对象和函数。它们不是 ECMAScript 核心语言本身，但它们是前端工程真正工作的主要接口。

### 关键术语先解释

| 中文术语 | English term | 解释 |
|---|---|---|
| 浏览器宿主环境 | browser host environment | 提供 DOM、事件、网络、存储、图形等能力的运行环境。 |
| Web API | Web API | 浏览器暴露给网页代码使用的接口。 |
| DOM | Document Object Model | 浏览器把 HTML 文档表示成对象树的模型。 |
| 节点 | node | DOM tree 中的基本单位，元素、文本、注释都可以是节点。 |
| 元素 | element | HTML 标签对应的 DOM 对象，比如 `div`、`button`。 |
| 事件 | event | 用户行为或浏览器状态变化产生的通知对象。 |
| 事件目标 | event target | 接收事件的对象，比如 button、document、window。 |
| 事件传播 | event propagation | 事件在 DOM tree 中捕获、到达目标、冒泡的过程。 |
| CSSOM | CSS Object Model | 浏览器把 CSS 暴露给 JavaScript 操作的对象模型。 |
| 视口 | viewport | 浏览器窗口中显示网页内容的区域。 |
| Fetch API | Fetch API | 浏览器提供的 Promise-based 网络请求 API。 |
| Web Storage | Web Storage | `localStorage` 和 `sessionStorage` 这类键值存储 API。 |
| Worker | Web Worker | 在后台线程运行脚本的浏览器 API。 |
| 消息传递 | message passing | 主线程和 worker 之间通过 `postMessage()` 发送数据。 |

### 底层机制总图

```text
HTML document
  -> parsed into DOM tree
  -> exposed through document object
  -> changed by JavaScript DOM APIs
  -> rendered by browser engine

User action
  -> browser creates event object
  -> event travels through DOM
  -> event listener callback runs
  -> JavaScript changes state or DOM

Network request
  -> fetch returns Promise
  -> response is parsed
  -> DOM updates with received data
```

### 和你当前学习的关系

你已经学过模块、标准库、迭代器、异步、元编程。Web API 会把这些全部串起来：

- 事件处理器本质是 callback function。
- `fetch()` 返回 Promise。
- DOM 集合有 iterable-like 行为。
- Web Components 用 class、prototype、custom elements。
- Worker 用消息传递处理并发。
- 模块脚本用 `type="module"` 组织浏览器项目。

---

## 4. 00：浏览器运行环境模型

### 结论

浏览器不是只运行 JavaScript。浏览器同时解析 HTML、构建 DOM、计算 CSS、布局、绘制页面，并把这些能力通过 Web APIs 暴露给 JavaScript。

### 新关键字和新概念

#### `window`

`window` 是浏览器窗口对象（Window object），也是浏览器主线程中的全局对象（global object）。

#### `document`

`document` 是当前页面的 DOM 文档对象（Document object），是操作 HTML 内容的入口。

#### `navigator`

`navigator` 暴露浏览器、设备、平台相关信息和能力。

#### `location`

`location` 表示当前页面 URL。

### 文件结构

```text
00-browser-environment-model/
  index.html
  environmentInspector.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Browser Environment Model</title>
  </head>
  <body>
    <h1 id="page-title">Browser Environment Model</h1>
    <script type="module" src="./environmentInspector.js"></script>
  </body>
</html>
```

### `environmentInspector.js`

```js
// Goal:
// Inspect important browser host objects.

console.log(window === globalThis);
console.log(document.title);
console.log(location.href);
console.log(typeof navigator.userAgent);
console.log(document.querySelector('#page-title').textContent);
```

### 运行方式

```bash
python3 -m http.server 5173
```

打开：

```text
http://localhost:5173/00-browser-environment-model/
```

### 预期输出

```text
true
Browser Environment Model
http://localhost:5173/00-browser-environment-model/
string
Browser Environment Model
```

`location.href` 具体值取决于你的本地地址。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 浏览器加载 HTML。 |
| 2 | 解析 `<h1>`，创建对应 DOM element。 |
| 3 | 遇到 `script type="module"`，加载模块脚本。 |
| 4 | 模块脚本访问 `window`、`document`、`location`、`navigator`。 |
| 5 | `querySelector()` 从 DOM tree 中找到元素。 |
| 6 | `textContent` 读取元素内部文本。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 以为 `document` 是 JavaScript 核心对象 | 它是浏览器提供的 Web API 对象。 |
| 以为 `window` 在 Node 里也存在 | Node 没有浏览器窗口对象。 |
| 以为 HTML 标签就是 JS 对象 | 浏览器解析 HTML 后创建对应 DOM object。 |

### 和项目开发的关系

任何前端框架最终都要落到浏览器对象模型：React、Vue、Svelte 只是帮你组织 UI 更新，真正显示页面的仍然是 DOM、CSSOM、事件系统和渲染引擎。

---

## 5. 01：脚本加载、模块脚本和全局对象

### 结论

浏览器中的普通脚本（classic script）和模块脚本（module script）有不同的作用域和加载规则。现代前端项目应优先使用模块脚本。

### 新关键字和新概念

#### 普通脚本（classic script）

普通脚本通过下面方式加载：

```html
<script src="./classicScript.js"></script>
```

它不能使用静态 `import` / `export`。

#### 模块脚本（module script）

模块脚本通过下面方式加载：

```html
<script type="module" src="./moduleEntry.js"></script>
```

它有模块作用域（module scope），可以使用 `import` / `export`，并且默认延迟执行。

### 文件结构

```text
01-script-loading/
  index.html
  classicScript.js
  moduleEntry.js
  messageTools.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Script Loading Demo</title>
  </head>
  <body>
    <div id="output"></div>
    <script src="./classicScript.js"></script>
    <script type="module" src="./moduleEntry.js"></script>
  </body>
</html>
```

### `classicScript.js`

```js
// Goal:
// Verify how a classic script can write to globalThis.

globalThis.classicScriptLabel = 'classic-ready';
console.log(globalThis.classicScriptLabel);
```

### `messageTools.js`

```js
// Goal:
// Export a helper for a browser module script.

export function createBrowserMessage(sourceLabel) {
  return `message-from-${sourceLabel}`;
}
```

### `moduleEntry.js`

```js
// Goal:
// Verify that module scripts can import values.

import { createBrowserMessage } from './messageTools.js';

const outputElement = document.querySelector('#output');
outputElement.textContent = createBrowserMessage('module');

console.log(globalThis.classicScriptLabel);
console.log(createBrowserMessage('module'));
```

### 预期结果

页面显示：

```text
message-from-module
```

控制台输出：

```text
classic-ready
classic-ready
message-from-module
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 普通脚本执行，把 `classicScriptLabel` 写到 `globalThis`。 |
| 2 | 模块脚本加载 `messageTools.js`。 |
| 3 | 模块脚本导入 `createBrowserMessage`。 |
| 4 | 模块脚本查询 DOM 并写入文本。 |
| 5 | 模块脚本仍然可以读取全局对象上的属性。 |

### 常见错误

错误：

```html
<script src="./moduleEntry.js"></script>
```

如果 `moduleEntry.js` 里有 `import`，普通脚本不能解析。

### 和项目开发的关系

真实项目里，浏览器入口文件通常是模块入口（module entry）。打包工具会从入口文件建立依赖图（dependency graph）。

---

## 6. 02：DOM 查询和节点模型

### 结论

DOM 查询的核心是：从 `document` 或某个元素开始，用 selector 找到 DOM element，然后读取或修改它的属性、文本和结构。

### 新关键字和新概念

| 术语 | English term | 说明 |
|---|---|---|
| DOM tree | DOM tree | 文档对象树。 |
| Node | Node | DOM 中的通用节点类型。 |
| Element | Element | HTML 或 SVG 元素节点。 |
| CSS selector | CSS selector | 用 CSS 选择器语法定位元素。 |
| `querySelector()` | query selector | 返回第一个匹配元素。 |
| `querySelectorAll()` | query selector all | 返回所有匹配元素的静态 NodeList。 |

### 文件结构

```text
02-dom-query/
  index.html
  domQueryDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>DOM Query Demo</title>
  </head>
  <body>
    <main id="app-root">
      <h1 class="page-heading">Products</h1>
      <ul class="product-list">
        <li class="product-item" data-sku="KB-01">Keyboard</li>
        <li class="product-item" data-sku="MS-02">Mouse</li>
        <li class="product-item" data-sku="MN-03">Monitor</li>
      </ul>
    </main>
    <script type="module" src="./domQueryDemo.js"></script>
  </body>
</html>
```

### `domQueryDemo.js`

```js
// Goal:
// Query DOM elements and inspect their text and dataset values.

const rootElement = document.querySelector('#app-root');
const headingElement = rootElement.querySelector('.page-heading');
const productItemElements = document.querySelectorAll('.product-item');

console.log(headingElement.textContent);
console.log(productItemElements.length);

for (const productItemElement of productItemElements) {
  console.log(productItemElement.dataset.sku, productItemElement.textContent);
}
```

### 预期输出

```text
Products
3
KB-01 Keyboard
MS-02 Mouse
MN-03 Monitor
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `document.querySelector('#app-root')` 找到根元素。 |
| 2 | 在根元素内部继续查询 `.page-heading`。 |
| 3 | `querySelectorAll('.product-item')` 返回静态 NodeList。 |
| 4 | `for...of` 遍历 NodeList。 |
| 5 | `dataset.sku` 读取 `data-sku` 属性。 |
| 6 | `textContent` 读取元素文本。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 忘记 `#` 查询 id | `querySelector('app-root')` 会查 `<app-root>` 标签，不是 id。 |
| 忘记 `.` 查询 class | `querySelector('product-item')` 会查自定义标签，不是 class。 |
| 直接操作可能为 `null` 的结果 | 查询不到元素时 `querySelector()` 返回 `null`。 |

### 和项目开发的关系

DOM 查询是所有 UI 操作的基础。即使使用 React，测试、调试、浏览器插件、自动化脚本、原生小组件仍然会大量使用 DOM 查询。

---

## 7. 03：DOM 创建、插入、删除和文本更新

### 结论

DOM 修改（DOM mutation）就是通过 JavaScript 改变 DOM tree。页面随之变化，是因为浏览器根据新的 DOM 和 CSSOM 重新渲染。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| `document.createElement()` | create element | 创建 HTML element。 |
| `append()` | append child nodes | 把节点或字符串插入到末尾。 |
| `prepend()` | prepend child nodes | 插入到开头。 |
| `remove()` | remove element | 从 DOM 中移除当前元素。 |
| `replaceChildren()` | replace children | 替换全部子节点。 |
| `textContent` | text content | 设置或读取文本内容。 |

### 文件结构

```text
03-dom-mutation/
  index.html
  domMutationDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>DOM Mutation Demo</title>
  </head>
  <body>
    <section>
      <h1>Cart Items</h1>
      <ul id="cart-list"></ul>
      <button id="reset-button">Reset</button>
    </section>
    <script type="module" src="./domMutationDemo.js"></script>
  </body>
</html>
```

### `domMutationDemo.js`

```js
// Goal:
// Create, insert, and replace DOM content.

const cartListElement = document.querySelector('#cart-list');
const resetButtonElement = document.querySelector('#reset-button');

function createCartItemElement(productName, quantityCount) {
  const itemElement = document.createElement('li');
  itemElement.textContent = `${productName}: ${quantityCount}`;
  return itemElement;
}

cartListElement.append(createCartItemElement('Keyboard', 2));
cartListElement.append(createCartItemElement('Mouse', 1));
cartListElement.prepend(createCartItemElement('Monitor', 1));

resetButtonElement.addEventListener('click', () => {
  cartListElement.replaceChildren();
  cartListElement.append(createCartItemElement('Empty cart', 0));
});
```

### 预期行为

页面初始显示：

```text
Monitor: 1
Keyboard: 2
Mouse: 1
```

点击 `Reset` 后显示：

```text
Empty cart: 0
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 查询列表和按钮。 |
| 2 | 调用 `createElement('li')` 创建列表项。 |
| 3 | 设置 `textContent`。 |
| 4 | 用 `append()` 和 `prepend()` 插入 DOM。 |
| 5 | 点击按钮时触发 callback。 |
| 6 | `replaceChildren()` 清空列表。 |
| 7 | 添加新的空购物车元素。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 用字符串拼接大量 HTML | 容易产生注入风险和结构错误。 |
| 混用 `innerHTML` 和用户输入 | 未转义内容可能造成 XSS。 |
| 修改 DOM 后还以为旧 NodeList 自动更新 | `querySelectorAll()` 返回的是静态 NodeList。 |

### 和项目开发的关系

框架的渲染本质上也是把状态映射成 DOM 变化。你学原生 DOM，是为了理解框架背后最终操作的对象模型。

---

## 8. 04：事件、事件对象和事件传播

### 结论

事件（event）是浏览器把用户行为或环境变化传给 JavaScript 的机制。`addEventListener()` 注册 callback，事件发生时浏览器创建 event object 并调用 callback。

### 新关键字和新概念

| 中文术语 | English term | 解释 |
|---|---|---|
| 事件监听器 | event listener | 事件发生时被调用的函数。 |
| 事件对象 | event object | 描述本次事件的对象。 |
| 事件目标 | event target | 原始触发事件的对象。 |
| 当前目标 | current target | 当前正在执行 listener 的对象。 |
| 捕获阶段 | capture phase | 事件从 window 向目标祖先传播。 |
| 目标阶段 | target phase | 事件到达目标。 |
| 冒泡阶段 | bubbling phase | 事件从目标向上返回。 |
| 事件委托 | event delegation | 在父元素上统一处理子元素事件。 |

### 文件结构

```text
04-events-propagation/
  index.html
  eventPropagationDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Event Propagation Demo</title>
  </head>
  <body>
    <section id="panel">
      <button class="action-button" data-action="save">Save</button>
      <button class="action-button" data-action="delete">Delete</button>
    </section>
    <script type="module" src="./eventPropagationDemo.js"></script>
  </body>
</html>
```

### `eventPropagationDemo.js`

```js
// Goal:
// Verify event target, currentTarget, and event delegation.

const panelElement = document.querySelector('#panel');

panelElement.addEventListener('click', (eventObject) => {
  const clickedElement = eventObject.target;

  if (!(clickedElement instanceof HTMLElement)) {
    return;
  }

  if (!clickedElement.matches('.action-button')) {
    return;
  }

  console.log('target:', clickedElement.dataset.action);
  console.log('currentTarget:', eventObject.currentTarget.id);
});
```

### 预期输出

点击 `Save`：

```text
target: save
currentTarget: panel
```

点击 `Delete`：

```text
target: delete
currentTarget: panel
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 监听器注册在父元素 `panel` 上。 |
| 2 | 用户点击按钮。 |
| 3 | 浏览器创建 click event object。 |
| 4 | 事件从按钮向上冒泡到 `panel`。 |
| 5 | `eventObject.target` 是实际点击的按钮。 |
| 6 | `eventObject.currentTarget` 是监听器绑定的 `panel`。 |
| 7 | 通过 `matches()` 判断是否是目标按钮。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 混淆 `target` 和 `currentTarget` | `target` 是原始触发对象；`currentTarget` 是当前 listener 所在对象。 |
| 给每个子元素都绑监听器 | 对动态列表不方便，事件委托更稳定。 |
| 不检查 `event.target` 类型 | `target` 可能不是你预期的 element。 |

### 和项目开发的关系

事件委托是列表、菜单、表格、动态渲染 UI 的基础技巧。框架也会使用合成事件或事件代理来管理大量交互。

---

## 9. 05：表单、输入事件和默认行为

### 结论

表单（form）是浏览器原生数据提交机制。用 JavaScript 处理表单时，要理解输入事件、提交事件、默认行为和 `FormData`。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| `input` event | input event | 输入值变化时触发。 |
| `change` event | change event | 值提交性变化时触发。 |
| `submit` event | submit event | 表单提交时触发。 |
| `preventDefault()` | prevent default | 阻止浏览器默认行为。 |
| `FormData` | form data | 从表单收集键值数据。 |

### 文件结构

```text
05-form-events/
  index.html
  formEventDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Form Event Demo</title>
  </head>
  <body>
    <form id="profile-form">
      <label>
        Display name
        <input name="displayName" id="display-name-input" />
      </label>
      <button type="submit">Save</button>
    </form>
    <p id="preview-output"></p>
    <script type="module" src="./formEventDemo.js"></script>
  </body>
</html>
```

### `formEventDemo.js`

```js
// Goal:
// Handle input and submit events from a form.

const profileFormElement = document.querySelector('#profile-form');
const displayNameInputElement = document.querySelector('#display-name-input');
const previewOutputElement = document.querySelector('#preview-output');

displayNameInputElement.addEventListener('input', () => {
  previewOutputElement.textContent = displayNameInputElement.value;
});

profileFormElement.addEventListener('submit', (eventObject) => {
  eventObject.preventDefault();

  const profileFormData = new FormData(profileFormElement);
  const displayNameValue = profileFormData.get('displayName');

  console.log(displayNameValue);
});
```

### 预期行为

- 输入框输入内容时，下面的 `<p>` 实时显示同样内容。
- 点击 `Save` 时页面不刷新。
- 控制台输出 `displayName` 字段值。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 输入时触发 `input` event。 |
| 2 | 读取 input 的 `value`。 |
| 3 | 更新 preview 文本。 |
| 4 | 点击提交按钮触发 `submit` event。 |
| 5 | `preventDefault()` 阻止浏览器默认提交刷新。 |
| 6 | `new FormData(form)` 读取表单字段。 |
| 7 | `get('displayName')` 取得字段值。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 忘记 `preventDefault()` | 页面会按默认表单行为跳转或刷新。 |
| input 没有 `name` | `FormData` 无法用字段名读取。 |
| 监听按钮 click 而不是 form submit | 用户按 Enter 提交时可能绕过按钮 click。 |

### 和项目开发的关系

表单是登录、搜索、筛选、配置页面的基础。即使使用框架，也必须理解原生表单事件和默认行为。

---

## 10. 06：CSSOM、classList、computed style

### 结论

操作 CSS 时优先改 class，而不是大量写 inline style。`style` 设置行内样式，`classList` 管理类名，`getComputedStyle()` 读取最终解析后的样式。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| CSSOM | CSS Object Model | CSS 的对象模型。 |
| `element.style` | inline style declaration | 操作元素行内样式。 |
| `classList` | DOMTokenList | 添加、删除、切换 class。 |
| `getComputedStyle()` | computed style reader | 读取最终计算样式。 |
| computed style | computed style | 浏览器综合 CSS 规则后的样式结果。 |

### 文件结构

```text
06-cssom-style/
  index.html
  cssStyleDemo.css
  cssStyleDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CSSOM Style Demo</title>
    <link rel="stylesheet" href="./cssStyleDemo.css" />
  </head>
  <body>
    <article id="status-card" class="status-card">Ready</article>
    <button id="toggle-button">Toggle</button>
    <script type="module" src="./cssStyleDemo.js"></script>
  </body>
</html>
```

### `cssStyleDemo.css`

```css
.status-card {
  padding: 16px;
  border: 1px solid black;
}

.status-card.is-active {
  font-weight: 700;
}
```

### `cssStyleDemo.js`

```js
// Goal:
// Compare class updates, inline styles, and computed styles.

const statusCardElement = document.querySelector('#status-card');
const toggleButtonElement = document.querySelector('#toggle-button');

statusCardElement.style.backgroundColor = 'lightyellow';

console.log(statusCardElement.style.backgroundColor);
console.log(getComputedStyle(statusCardElement).fontWeight);

toggleButtonElement.addEventListener('click', () => {
  statusCardElement.classList.toggle('is-active');
  console.log(statusCardElement.classList.contains('is-active'));
  console.log(getComputedStyle(statusCardElement).fontWeight);
});
```

### 预期行为

- 初始卡片背景变成浅黄色。
- 点击按钮时切换加粗状态。
- 控制台显示 class 是否存在和最终 font weight。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `element.style.backgroundColor` 写入 inline style。 |
| 2 | `classList.toggle()` 添加或删除 class。 |
| 3 | CSS 规则 `.status-card.is-active` 被匹配或取消匹配。 |
| 4 | `getComputedStyle()` 读取最终样式结果。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 用 `style` 读取 stylesheet 中的样式 | `element.style` 只表示 inline style。 |
| 用大量 inline style 管理状态 | 不利于维护，应该优先用 class。 |
| 试图修改 `getComputedStyle()` 返回对象 | 它用于读取，不用于设置。 |

### 和项目开发的关系

现代前端工程大量使用 class 切换表达 UI 状态。Tailwind、CSS Modules、组件库，本质都要理解 class 与 computed style。

---

## 11. 07：文档几何、尺寸和滚动

### 结论

文档几何（document geometry）解决的是元素在视口中的位置、尺寸和滚动状态。常用 API 是 `getBoundingClientRect()`、`scrollTo()`、`scrollIntoView()`、`window.scrollY`。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| viewport | viewport | 浏览器可视区域。 |
| `getBoundingClientRect()` | bounding client rectangle | 获取元素相对视口的位置和尺寸。 |
| `scrollY` | vertical scroll offset | 页面垂直滚动距离。 |
| `scrollTo()` | scroll to position | 滚动到指定位置。 |
| `scrollIntoView()` | scroll element into view | 让元素滚动进入视口。 |

### 文件结构

```text
07-geometry-scroll/
  index.html
  geometryScrollDemo.css
  geometryScrollDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Geometry Scroll Demo</title>
    <link rel="stylesheet" href="./geometryScrollDemo.css" />
  </head>
  <body>
    <button id="measure-button">Measure target</button>
    <button id="jump-button">Jump to target</button>
    <div class="spacer"></div>
    <section id="target-card">Target card</section>
    <script type="module" src="./geometryScrollDemo.js"></script>
  </body>
</html>
```

### `geometryScrollDemo.css`

```css
.spacer {
  height: 1200px;
}

#target-card {
  padding: 24px;
  border: 1px solid black;
}
```

### `geometryScrollDemo.js`

```js
// Goal:
// Measure element geometry and scroll an element into view.

const measureButtonElement = document.querySelector('#measure-button');
const jumpButtonElement = document.querySelector('#jump-button');
const targetCardElement = document.querySelector('#target-card');

measureButtonElement.addEventListener('click', () => {
  const targetRect = targetCardElement.getBoundingClientRect();

  console.log('top:', targetRect.top);
  console.log('height:', targetRect.height);
  console.log('scrollY:', window.scrollY);
});

jumpButtonElement.addEventListener('click', () => {
  targetCardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
```

### 预期行为

- 点击 `Measure target` 输出元素相对视口的 top、height 和当前滚动值。
- 点击 `Jump to target` 页面滚动到目标卡片。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 页面初始目标元素在视口下方。 |
| 2 | `getBoundingClientRect()` 返回相对视口的几何数据。 |
| 3 | `scrollIntoView()` 请求浏览器滚动页面。 |
| 4 | 滚动后再次测量，`top` 会变化。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 把 `rect.top` 当成文档绝对坐标 | 它是相对 viewport 的坐标。 |
| 忽略滚动导致坐标变化 | 页面滚动后元素相对视口的位置会变。 |
| 频繁读写布局属性 | 可能引发布局计算，影响性能。 |

### 和项目开发的关系

浮层定位、吸顶导航、虚拟列表、滚动加载、动画触发都依赖文档几何和滚动状态。

---

## 12. 08：Web Components 基础

### 结论

Web Components 是浏览器原生组件模型，核心包括 custom elements、shadow DOM 和 template。它让你定义自己的 HTML 元素。

### 新关键字和新概念

| 术语 | English term | 解释 |
|---|---|---|
| Custom Element | custom element | 自定义 HTML 元素。 |
| Shadow DOM | shadow DOM | 组件内部隔离 DOM tree。 |
| Shadow Root | shadow root | shadow DOM 的根节点。 |
| Template | HTML template | 可复用但默认不渲染的 DOM 模板。 |
| `connectedCallback()` | lifecycle callback | 元素插入文档时调用。 |

### 文件结构

```text
08-web-components/
  index.html
  userBadgeElement.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Web Components Demo</title>
  </head>
  <body>
    <user-badge display-name="Ada"></user-badge>
    <script type="module" src="./userBadgeElement.js"></script>
  </body>
</html>
```

### `userBadgeElement.js`

```js
// Goal:
// Define a custom element with shadow DOM.

class UserBadgeElement extends HTMLElement {
  connectedCallback() {
    const displayName = this.getAttribute('display-name') ?? 'Guest';
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const wrapperElement = document.createElement('span');
    wrapperElement.textContent = `User: ${displayName}`;
    wrapperElement.style.border = '1px solid black';
    wrapperElement.style.padding = '8px';

    shadowRoot.append(wrapperElement);
  }
}

customElements.define('user-badge', UserBadgeElement);
```

### 预期行为

页面显示：

```text
User: Ada
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 浏览器解析 `<user-badge>`。 |
| 2 | 模块脚本定义 `UserBadgeElement` 类。 |
| 3 | `customElements.define()` 注册自定义元素名。 |
| 4 | 元素升级为 custom element。 |
| 5 | 插入文档时执行 `connectedCallback()`。 |
| 6 | `attachShadow()` 创建 shadow root。 |
| 7 | 内部 DOM 被添加到 shadow root。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 自定义元素名没有连字符 | Custom element 名称必须包含 hyphen。 |
| 在 constructor 里过早操作 DOM | 更适合在 `connectedCallback()` 里做 DOM 初始化。 |
| 以为 shadow DOM 是绝对安全边界 | 它是封装边界，不是安全沙箱。 |

### 和项目开发的关系

Web Components 是浏览器级组件标准。即使你主要学 React，也应该理解原生组件模型和 shadow DOM 封装思想。

---

## 13. 09：SVG 基础和命名空间创建

### 结论

SVG 是基于 XML 的矢量图形语言。用 DOM 创建 SVG 元素时，不能只用 `createElement()`，要用 `createElementNS()` 指定 SVG namespace。

### 新关键字和新概念

| 术语 | English term | 解释 |
|---|---|---|
| SVG | Scalable Vector Graphics | 可伸缩矢量图形。 |
| namespace | XML namespace | XML 元素所属命名空间。 |
| `createElementNS()` | create element with namespace | 创建 SVG 或其他命名空间元素。 |
| `setAttribute()` | set attribute | 设置 SVG 属性。 |

### 文件结构

```text
09-svg-demo/
  index.html
  svgCreationDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>SVG Creation Demo</title>
  </head>
  <body>
    <div id="chart-root"></div>
    <script type="module" src="./svgCreationDemo.js"></script>
  </body>
</html>
```

### `svgCreationDemo.js`

```js
// Goal:
// Create SVG elements with the SVG namespace.

const svgNamespace = 'http://www.w3.org/2000/svg';
const chartRootElement = document.querySelector('#chart-root');

const svgElement = document.createElementNS(svgNamespace, 'svg');
svgElement.setAttribute('width', '220');
svgElement.setAttribute('height', '120');
svgElement.setAttribute('viewBox', '0 0 220 120');

const barElement = document.createElementNS(svgNamespace, 'rect');
barElement.setAttribute('x', '20');
barElement.setAttribute('y', '40');
barElement.setAttribute('width', '160');
barElement.setAttribute('height', '40');
barElement.setAttribute('fill', 'steelblue');

svgElement.append(barElement);
chartRootElement.append(svgElement);
```

### 预期行为

页面显示一个蓝色矩形条。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 定义 SVG namespace。 |
| 2 | `createElementNS()` 创建 `<svg>`。 |
| 3 | 设置宽高和 viewBox。 |
| 4 | 创建 `<rect>`。 |
| 5 | 设置 rect 的位置、尺寸和填充。 |
| 6 | 把 rect 放入 svg。 |
| 7 | 把 svg 放入页面。 |

### 常见错误

错误：

```js
const svgElement = document.createElement('svg');
```

对于简单情况某些浏览器可能容错，但正确的 DOM API 模型是用 SVG namespace 创建 SVG 元素。

### 和项目开发的关系

数据可视化、图标、流程图、关系图、矢量交互都常用 SVG。前端工程里 SVG 和 DOM 的交集很大。

---

## 14. 10：Canvas 2D 绘图

### 结论

`canvas` 是位图绘图区域。DOM 里只有一个 `<canvas>` 元素，图形内容不是 DOM 节点，而是绘制到像素缓冲区里。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| `HTMLCanvasElement` | canvas element | 页面中的 canvas 元素。 |
| `CanvasRenderingContext2D` | 2D rendering context | 2D 绘图上下文。 |
| `getContext('2d')` | get 2D context | 获取绘图 API 对象。 |
| `fillRect()` | fill rectangle | 绘制填充矩形。 |
| `beginPath()` | begin path | 开始路径。 |
| `arc()` | arc path command | 添加圆弧路径。 |
| `fill()` | fill current path | 填充路径。 |

### 文件结构

```text
10-canvas-2d/
  index.html
  canvasDrawingDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Canvas Drawing Demo</title>
  </head>
  <body>
    <canvas id="chart-canvas" width="300" height="160"></canvas>
    <script type="module" src="./canvasDrawingDemo.js"></script>
  </body>
</html>
```

### `canvasDrawingDemo.js`

```js
// Goal:
// Draw simple shapes on a 2D canvas.

const chartCanvasElement = document.querySelector('#chart-canvas');
const drawingContext = chartCanvasElement.getContext('2d');

if (drawingContext === null) {
  throw new Error('2D canvas context is not available');
}

drawingContext.fillStyle = 'lightgray';
drawingContext.fillRect(0, 0, 300, 160);

drawingContext.fillStyle = 'steelblue';
drawingContext.fillRect(40, 80, 60, 50);
drawingContext.fillRect(120, 50, 60, 80);

drawingContext.beginPath();
drawingContext.arc(230, 80, 30, 0, Math.PI * 2);
drawingContext.fillStyle = 'tomato';
drawingContext.fill();
```

### 预期行为

页面显示一个灰色背景、两个蓝色矩形和一个红色圆。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 查询 canvas 元素。 |
| 2 | 调用 `getContext('2d')` 获取绘图上下文。 |
| 3 | 设置 `fillStyle`。 |
| 4 | 用 `fillRect()` 绘制矩形。 |
| 5 | 用 path API 绘制圆。 |
| 6 | 像素结果显示在 canvas 区域。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 把 canvas 图形当 DOM 节点 | canvas 画出来的是像素，不是可查询的 DOM element。 |
| 只用 CSS 设置 canvas 尺寸 | CSS 尺寸和绘图缓冲区尺寸不是一回事。 |
| 忘记判断 `getContext()` 可能返回 `null` | 某些环境可能不支持指定 context。 |

### 和项目开发的关系

Canvas 适合像素绘制、游戏、复杂图形、图像处理、性能敏感可视化。SVG 更适合可交互矢量对象；Canvas 更适合大量像素绘制。

---

## 15. 11：Audio API 基础预习

### 结论

Web Audio API 不是简单播放音频文件，而是用 audio graph 组织音频源、处理节点和输出目标。

### 新关键字和新概念

| 术语 | English term | 解释 |
|---|---|---|
| AudioContext | audio context | Web Audio API 的音频处理环境。 |
| AudioNode | audio node | 音频图中的节点。 |
| oscillator | oscillator node | 生成周期波形的音频源。 |
| gain | gain node | 控制音量的节点。 |
| destination | audio destination | 最终输出设备。 |

### 文件结构

```text
11-audio-api/
  index.html
  audioToneDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Audio Tone Demo</title>
  </head>
  <body>
    <button id="play-tone-button">Play tone</button>
    <script type="module" src="./audioToneDemo.js"></script>
  </body>
</html>
```

### `audioToneDemo.js`

```js
// Goal:
// Play a short generated tone with Web Audio API.

const playToneButtonElement = document.querySelector('#play-tone-button');

playToneButtonElement.addEventListener('click', () => {
  const audioContext = new AudioContext();
  const oscillatorNode = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillatorNode.frequency.value = 440;
  gainNode.gain.value = 0.1;

  oscillatorNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillatorNode.start();
  oscillatorNode.stop(audioContext.currentTime + 0.3);
});
```

### 预期行为

点击按钮后播放一个短音。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 用户点击按钮。 |
| 2 | 创建 `AudioContext`。 |
| 3 | 创建 oscillator source。 |
| 4 | 创建 gain node 控制音量。 |
| 5 | 连接 source -> gain -> destination。 |
| 6 | 启动 oscillator。 |
| 7 | 0.3 秒后停止。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 页面加载时自动播放 | 浏览器通常要求用户手势后才能播放音频。 |
| 不控制 gain | 声音可能过大。 |
| 以为 Audio API 只是 `<audio>` 标签 | Web Audio API 是音频处理图模型。 |

### 和项目开发的关系

大多数业务项目只用 `<audio>`。但如果做音频可视化、混音、音效、在线音乐工具，就需要 Web Audio API。

---

## 16. 12：Location、History 和导航状态

### 结论

`location` 代表当前 URL；`history` 管理浏览器会话历史。History API 可以改变地址栏和状态，但不会自动重新加载页面。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| `location.href` | current URL string | 当前页面完整 URL。 |
| `location.assign()` | navigate to URL | 导航到新 URL。 |
| `history.pushState()` | push history state | 添加一条历史记录。 |
| `history.replaceState()` | replace history state | 替换当前历史记录。 |
| `popstate` event | popstate event | 用户前进后退时触发。 |

### 文件结构

```text
12-history-location/
  index.html
  historyStateDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>History State Demo</title>
  </head>
  <body>
    <button id="show-home-button">Home</button>
    <button id="show-settings-button">Settings</button>
    <p id="route-output"></p>
    <script type="module" src="./historyStateDemo.js"></script>
  </body>
</html>
```

### `historyStateDemo.js`

```js
// Goal:
// Update browser history state without reloading the page.

const homeButtonElement = document.querySelector('#show-home-button');
const settingsButtonElement = document.querySelector('#show-settings-button');
const routeOutputElement = document.querySelector('#route-output');

function renderRoute(routeName) {
  routeOutputElement.textContent = `Route: ${routeName}`;
}

homeButtonElement.addEventListener('click', () => {
  history.pushState({ routeName: 'home' }, '', '?route=home');
  renderRoute('home');
});

settingsButtonElement.addEventListener('click', () => {
  history.pushState({ routeName: 'settings' }, '', '?route=settings');
  renderRoute('settings');
});

window.addEventListener('popstate', (eventObject) => {
  const routeName = eventObject.state?.routeName ?? 'initial';
  renderRoute(routeName);
});
```

### 预期行为

- 点击按钮后地址栏 query string 改变。
- 页面不刷新。
- 使用浏览器后退按钮时，`popstate` 触发并更新文本。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 点击按钮。 |
| 2 | `pushState()` 写入 state object 和 URL。 |
| 3 | 浏览器地址栏变化但页面不重新加载。 |
| 4 | 手动调用 `renderRoute()` 更新 UI。 |
| 5 | 用户后退时触发 `popstate`。 |
| 6 | 从 `event.state` 读取历史状态。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 以为 `pushState()` 会自动渲染页面 | 它只改变 history entry，需要你自己更新 UI。 |
| 以为所有 URL 都能 push | 同源限制下才能安全修改 URL。 |
| 以为 `popstate` 在 `pushState()` 时立即触发 | 通常前进后退导航时触发。 |

### 和项目开发的关系

单页应用路由（SPA routing）的核心就是 History API：改变 URL、保存状态、监听后退前进、渲染对应视图。

---

## 17. 13：Fetch、Request、Response 和 AbortController

### 结论

`fetch()` 是浏览器现代网络请求 API。它返回 Promise，fulfilled 后得到 Response object；真正的数据还要继续调用 `response.json()`、`response.text()` 等方法读取。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| `fetch()` | fetch request | 发起网络请求。 |
| `Request` | request object | 请求信息对象。 |
| `Response` | response object | 响应信息对象。 |
| `response.ok` | OK status flag | HTTP 状态是否在 200-299。 |
| `response.json()` | parse JSON body | 异步解析 JSON 响应体。 |
| `AbortController` | abort controller | 取消请求。 |
| `AbortSignal` | abort signal | 传给 fetch 的取消信号。 |

### 文件结构

```text
13-fetch-network/
  index.html
  fetchDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Fetch Demo</title>
  </head>
  <body>
    <button id="load-post-button">Load post</button>
    <button id="cancel-button">Cancel</button>
    <pre id="result-output"></pre>
    <script type="module" src="./fetchDemo.js"></script>
  </body>
</html>
```

### `fetchDemo.js`

```js
// Goal:
// Fetch JSON data and support request cancellation.

const loadPostButtonElement = document.querySelector('#load-post-button');
const cancelButtonElement = document.querySelector('#cancel-button');
const resultOutputElement = document.querySelector('#result-output');

let activeController = null;

loadPostButtonElement.addEventListener('click', async () => {
  activeController = new AbortController();
  resultOutputElement.textContent = 'Loading...';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      signal: activeController.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const postRecord = await response.json();
    resultOutputElement.textContent = JSON.stringify(postRecord, null, 2);
  } catch (requestError) {
    resultOutputElement.textContent = requestError.name;
  }
});

cancelButtonElement.addEventListener('click', () => {
  activeController?.abort();
});
```

### 预期行为

- 点击 `Load post` 后请求远程 JSON。
- 成功后显示格式化 JSON。
- 请求未完成前点击 `Cancel`，可能显示 `AbortError`。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 点击按钮，创建 `AbortController`。 |
| 2 | 调用 `fetch()`，立即得到 Promise。 |
| 3 | `await` 等待 Response。 |
| 4 | 检查 `response.ok`。 |
| 5 | 调用 `response.json()` 再次返回 Promise。 |
| 6 | JSON 解析完成后更新 DOM。 |
| 7 | 点击 Cancel 时调用 `abort()`。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 以为 `fetch()` 直接返回 JSON | 它返回 Promise，fulfilled value 是 Response。 |
| 忘记检查 `response.ok` | HTTP 404/500 不一定让 fetch Promise reject。 |
| 重复读取 response body | 响应体流通常只能消费一次。 |
| 忽略 CORS | 跨源请求受浏览器 CORS 策略控制。 |

### 和项目开发的关系

前端工程里的 API 调用、数据加载、错误提示、请求取消、加载状态都建立在 Fetch 和 Promise 模型上。

---

## 18. 14：Web Storage、Cookie 和 IndexedDB 预习

### 结论

浏览器存储不是一种东西。`localStorage` / `sessionStorage` 是同步字符串键值存储；Cookie 会随 HTTP 请求发送；IndexedDB 是异步结构化客户端数据库。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| `localStorage` | local storage | 持久键值存储。 |
| `sessionStorage` | session storage | 会话级键值存储。 |
| Cookie | HTTP cookie | 小型请求相关存储。 |
| IndexedDB | Indexed Database API | 浏览器端异步对象数据库。 |
| Storage key | storage key | 存储键，必须是字符串。 |
| Storage value | storage value | 存储值，也会保存为字符串。 |

### 文件结构

```text
14-storage-demo/
  index.html
  storageDemo.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Storage Demo</title>
  </head>
  <body>
    <button id="save-button">Save settings</button>
    <button id="load-button">Load settings</button>
    <pre id="settings-output"></pre>
    <script type="module" src="./storageDemo.js"></script>
  </body>
</html>
```

### `storageDemo.js`

```js
// Goal:
// Save and load JSON-compatible settings with localStorage.

const saveButtonElement = document.querySelector('#save-button');
const loadButtonElement = document.querySelector('#load-button');
const settingsOutputElement = document.querySelector('#settings-output');

const settingsStorageKey = 'demo.settings';

saveButtonElement.addEventListener('click', () => {
  const settingsRecord = {
    themeMode: 'dark',
    pageSize: 20,
  };

  localStorage.setItem(settingsStorageKey, JSON.stringify(settingsRecord));
  settingsOutputElement.textContent = 'Saved';
});

loadButtonElement.addEventListener('click', () => {
  const storedSettingsText = localStorage.getItem(settingsStorageKey);

  if (storedSettingsText === null) {
    settingsOutputElement.textContent = 'No settings';
    return;
  }

  const settingsRecord = JSON.parse(storedSettingsText);
  settingsOutputElement.textContent = JSON.stringify(settingsRecord, null, 2);
});
```

### 预期行为

- 点击 `Save settings`，数据保存到 Application / Storage 面板。
- 点击 `Load settings`，页面显示保存的 JSON 数据。
- 刷新页面后仍然能读取 localStorage 数据。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 创建 settings object。 |
| 2 | `JSON.stringify()` 转成字符串。 |
| 3 | `localStorage.setItem()` 保存字符串。 |
| 4 | `getItem()` 读取字符串或 `null`。 |
| 5 | `JSON.parse()` 恢复成对象。 |
| 6 | 更新 DOM 显示。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 直接保存对象 | Storage 会把值转成字符串，得到 `[object Object]`。 |
| 把 localStorage 当安全存储 | 不要保存 token、密码、敏感数据。 |
| 以为 localStorage 是异步 | 它是同步 API，频繁大数据操作会阻塞。 |
| 混淆 Cookie 和 localStorage | Cookie 会参与 HTTP；localStorage 不会自动随请求发送。 |

### 和项目开发的关系

主题偏好、草稿、非敏感 UI 状态可以用 Web Storage。复杂结构化离线数据要考虑 IndexedDB。

---

## 19. 15：Worker 和消息传递

### 结论

Web Worker 让脚本在后台线程运行，避免重计算阻塞 UI。Worker 不能直接操作 DOM，只能通过消息传递（message passing）和主线程通信。

### 新关键字和新概念

| API | English term | 用途 |
|---|---|---|
| `Worker` | Web Worker constructor | 创建后台线程。 |
| `postMessage()` | post message | 向另一端发送消息。 |
| `message` event | message event | 接收消息。 |
| `self` | worker global scope | Worker 内部全局对象。 |
| `terminate()` | terminate worker | 主线程终止 worker。 |

### 文件结构

```text
15-worker-messaging/
  index.html
  workerApp.js
  primeWorker.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Worker Messaging Demo</title>
  </head>
  <body>
    <button id="start-button">Start work</button>
    <pre id="worker-output"></pre>
    <script type="module" src="./workerApp.js"></script>
  </body>
</html>
```

### `workerApp.js`

```js
// Goal:
// Send work to a Web Worker and receive a result.

const startButtonElement = document.querySelector('#start-button');
const workerOutputElement = document.querySelector('#worker-output');

const calculationWorker = new Worker('./primeWorker.js', { type: 'module' });

calculationWorker.addEventListener('message', (eventObject) => {
  workerOutputElement.textContent = `Prime count: ${eventObject.data.primeCount}`;
});

startButtonElement.addEventListener('click', () => {
  workerOutputElement.textContent = 'Working...';
  calculationWorker.postMessage({ maxNumber: 20000 });
});
```

### `primeWorker.js`

```js
// Goal:
// Count prime numbers in a worker thread.

function isPrimeNumber(candidateNumber) {
  if (candidateNumber < 2) {
    return false;
  }

  for (let divisorNumber = 2; divisorNumber * divisorNumber <= candidateNumber; divisorNumber += 1) {
    if (candidateNumber % divisorNumber === 0) {
      return false;
    }
  }

  return true;
}

self.addEventListener('message', (eventObject) => {
  const { maxNumber } = eventObject.data;
  let primeCount = 0;

  for (let currentNumber = 2; currentNumber <= maxNumber; currentNumber += 1) {
    if (isPrimeNumber(currentNumber)) {
      primeCount += 1;
    }
  }

  self.postMessage({ primeCount });
});
```

### 预期行为

点击 `Start work`：

```text
Working...
Prime count: 2262
```

不同 maxNumber 会得到不同结果。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 主线程创建 Worker。 |
| 2 | 用户点击按钮。 |
| 3 | 主线程用 `postMessage()` 发送任务。 |
| 4 | Worker 线程收到 message。 |
| 5 | Worker 执行计算。 |
| 6 | Worker 用 `self.postMessage()` 返回结果。 |
| 7 | 主线程收到 message 并更新 DOM。 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 在 worker 中访问 `document` | Worker 没有 DOM 访问权。 |
| 以为对象是共享引用 | `postMessage()` 使用结构化克隆或可转移对象。 |
| 不用本地服务器运行 worker | Worker 加载受浏览器安全规则限制。 |

### 和项目开发的关系

图像处理、大量计算、数据解析、复杂可视化预处理适合放到 Worker，避免阻塞主线程和 UI。

---

## 20. 16：小项目整合

### 结论

最后用一个小型浏览器项目整合 DOM、事件、Fetch、Storage、History、Canvas 和 Worker。目标不是做完整产品，而是理解 Web APIs 如何协作。

### 文件结构

```text
16-web-api-mini-project/
  index.html
  styles.css
  main.js
  modules/apiClient.js
  modules/storageStore.js
  modules/router.js
  modules/chartRenderer.js
  modules/taskWorkerClient.js
  workers/summaryWorker.js
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Web API Mini Project</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <h1>Dashboard</h1>
      <button id="load-button">Load data</button>
      <button id="save-route-button">Save route</button>
      <p id="status-output"></p>
      <pre id="data-output"></pre>
      <canvas id="chart-canvas" width="360" height="160"></canvas>
    </main>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

### `styles.css`

```css
body {
  font-family: system-ui, sans-serif;
}

main {
  max-width: 720px;
  margin: 40px auto;
}

button {
  margin-right: 8px;
}

#chart-canvas {
  border: 1px solid black;
}
```

### `modules/apiClient.js`

```js
// Goal:
// Load JSON data through Fetch API.

export async function loadDashboardRecord() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

  if (!response.ok) {
    throw new Error(`HTTP status ${response.status}`);
  }

  return response.json();
}
```

### `modules/storageStore.js`

```js
// Goal:
// Store and read dashboard state.

const dashboardStorageKey = 'mini.dashboard.state';

export function saveDashboardState(stateRecord) {
  localStorage.setItem(dashboardStorageKey, JSON.stringify(stateRecord));
}

export function readDashboardState() {
  const stateText = localStorage.getItem(dashboardStorageKey);

  if (stateText === null) {
    return null;
  }

  return JSON.parse(stateText);
}
```

### `modules/router.js`

```js
// Goal:
// Update browser history state.

export function pushDashboardRoute(routeName) {
  history.pushState({ routeName }, '', `?route=${encodeURIComponent(routeName)}`);
}
```

### `modules/chartRenderer.js`

```js
// Goal:
// Render a simple bar chart on canvas.

export function renderScoreChart(canvasElement, scoreValue) {
  const drawingContext = canvasElement.getContext('2d');

  if (drawingContext === null) {
    throw new Error('Canvas context is not available');
  }

  drawingContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
  drawingContext.fillStyle = 'lightgray';
  drawingContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
  drawingContext.fillStyle = 'steelblue';
  drawingContext.fillRect(20, 60, scoreValue, 40);
}
```

### `modules/taskWorkerClient.js`

```js
// Goal:
// Wrap worker message passing in a Promise.

export function calculateSummaryInWorker(textValue) {
  return new Promise((resolve) => {
    const summaryWorker = new Worker('./workers/summaryWorker.js', { type: 'module' });

    summaryWorker.addEventListener('message', (eventObject) => {
      resolve(eventObject.data);
      summaryWorker.terminate();
    });

    summaryWorker.postMessage({ textValue });
  });
}
```

### `workers/summaryWorker.js`

```js
// Goal:
// Calculate text summary in a worker.

self.addEventListener('message', (eventObject) => {
  const { textValue } = eventObject.data;
  const wordCount = textValue.split(/\s+/).filter(Boolean).length;

  self.postMessage({ wordCount });
});
```

### `main.js`

```js
// Goal:
// Compose several Web APIs in one browser module entry.

import { loadDashboardRecord } from './modules/apiClient.js';
import { readDashboardState, saveDashboardState } from './modules/storageStore.js';
import { pushDashboardRoute } from './modules/router.js';
import { renderScoreChart } from './modules/chartRenderer.js';
import { calculateSummaryInWorker } from './modules/taskWorkerClient.js';

const loadButtonElement = document.querySelector('#load-button');
const saveRouteButtonElement = document.querySelector('#save-route-button');
const statusOutputElement = document.querySelector('#status-output');
const dataOutputElement = document.querySelector('#data-output');
const chartCanvasElement = document.querySelector('#chart-canvas');

const storedState = readDashboardState();

if (storedState !== null) {
  statusOutputElement.textContent = `Stored route: ${storedState.routeName}`;
}

loadButtonElement.addEventListener('click', async () => {
  statusOutputElement.textContent = 'Loading...';

  const dashboardRecord = await loadDashboardRecord();
  const summaryRecord = await calculateSummaryInWorker(dashboardRecord.body);

  dataOutputElement.textContent = JSON.stringify({ dashboardRecord, summaryRecord }, null, 2);
  renderScoreChart(chartCanvasElement, summaryRecord.wordCount * 8);
  statusOutputElement.textContent = 'Loaded';
});

saveRouteButtonElement.addEventListener('click', () => {
  const routeName = 'dashboard';

  pushDashboardRoute(routeName);
  saveDashboardState({ routeName });
  statusOutputElement.textContent = `Saved route: ${routeName}`;
});
```

### 预期行为

- 点击 `Load data`：通过 Fetch 请求数据，Worker 计算 word count，Canvas 绘图，DOM 显示 JSON。
- 点击 `Save route`：URL 改变，localStorage 保存状态。
- 刷新页面后能读取存储状态。

### 项目意义

这个小项目把这些能力连起来：

```text
DOM query
Event listener
Fetch Promise
JSON parsing
Web Worker message passing
Canvas rendering
History API
localStorage
ES module organization
```

---

## 21. 最终文件清单

```text
javascript-web-api-learning/
  00-browser-environment-model/
    index.html
    environmentInspector.js

  01-script-loading/
    index.html
    classicScript.js
    moduleEntry.js
    messageTools.js

  02-dom-query/
    index.html
    domQueryDemo.js

  03-dom-mutation/
    index.html
    domMutationDemo.js

  04-events-propagation/
    index.html
    eventPropagationDemo.js

  05-form-events/
    index.html
    formEventDemo.js

  06-cssom-style/
    index.html
    cssStyleDemo.css
    cssStyleDemo.js

  07-geometry-scroll/
    index.html
    geometryScrollDemo.css
    geometryScrollDemo.js

  08-web-components/
    index.html
    userBadgeElement.js

  09-svg-demo/
    index.html
    svgCreationDemo.js

  10-canvas-2d/
    index.html
    canvasDrawingDemo.js

  11-audio-api/
    index.html
    audioToneDemo.js

  12-history-location/
    index.html
    historyStateDemo.js

  13-fetch-network/
    index.html
    fetchDemo.js

  14-storage-demo/
    index.html
    storageDemo.js

  15-worker-messaging/
    index.html
    workerApp.js
    primeWorker.js

  16-web-api-mini-project/
    index.html
    styles.css
    main.js
    modules/apiClient.js
    modules/storageStore.js
    modules/router.js
    modules/chartRenderer.js
    modules/taskWorkerClient.js
    workers/summaryWorker.js

  javascript-web-apis-learning-notes.md
```

---

## 22. 最终学习笔记转换要求

每一节最终整理成学习笔记时，固定使用这个结构：

```text
Conclusion
Technical meaning
Keyword explanations
Underlying mechanism
File structure
Code example
How to run
Expected behavior
Execution process
Common mistakes / counterexample
Relation to front-end projects
Final memory model
```

### 正文格式要求

- 中文解释为主。
- 重要术语必须写中文 + English term。
- 每个 API 第一次出现时解释它属于浏览器宿主环境，不是 ECMAScript 核心语言。
- 每节都要明确“这个 API 解决什么问题”。
- 不要只抄 MDN 方法签名。

### 代码命名要求

- 不使用 `foo`、`bar`、`data`、`obj` 这种泛名。
- 变量名必须表达业务含义。
- 不同主题尽量避免重复函数名。
- 代码注释只用英文。

---

## 23. 本章最终要能回答的问题

学完第 15 章，你应该能回答：

1. Web API 和 ECMAScript core language 有什么区别？
2. `window`、`document`、`navigator`、`location` 分别是什么？
3. DOM tree 是什么？Element 和 Node 有什么区别？
4. `querySelector()` 和 `querySelectorAll()` 有什么区别？
5. `textContent`、`innerHTML`、`dataset` 分别解决什么问题？
6. `createElement()`、`append()`、`replaceChildren()` 如何改变 DOM？
7. 什么是 event object？
8. `target` 和 `currentTarget` 有什么区别？
9. capture phase、target phase、bubbling phase 是什么？
10. 为什么事件委托适合动态列表？
11. `preventDefault()` 阻止的是什么？
12. `FormData` 如何从表单读取字段？
13. `element.style` 和 `getComputedStyle()` 有什么区别？
14. `classList` 为什么比直接拼接 `className` 更安全？
15. `getBoundingClientRect()` 返回的是相对什么的坐标？
16. `scrollIntoView()` 做了什么？
17. Web Components 的 custom element 和 shadow DOM 分别是什么？
18. 为什么创建 SVG 元素要用 `createElementNS()`？
19. Canvas 和 SVG 的底层模型有什么区别？
20. Web Audio API 为什么是 audio graph model？
21. `location` 和 `history` 分别管理什么？
22. `pushState()` 是否会重新加载页面？
23. `fetch()` 返回什么？`Response.json()` 返回什么？
24. `response.ok` 为什么要检查？
25. `AbortController` 如何取消 `fetch()`？
26. `localStorage` 为什么只能保存字符串？
27. Cookie 和 `localStorage` 有什么核心区别？
28. Worker 为什么不能访问 DOM？
29. `postMessage()` 在主线程和 worker 中分别怎么用？
30. 哪些 API 是同步的，哪些 API 是异步的？

最后记住这个模型：

```text
DOM handles document structure.
Events connect user actions to callbacks.
CSSOM connects JavaScript to styles.
Geometry APIs measure layout and scroll.
Web Components define browser-native components.
SVG draws vector graphics as DOM elements.
Canvas draws pixels into a bitmap surface.
Audio API builds an audio processing graph.
History API manages session history state.
Fetch API loads network resources asynchronously.
Storage APIs persist client-side data.
Workers move heavy work away from the main thread.
```

---

## 24. MDN 阅读清单

使用 MDN 的方式：先写本文件里的练习，再查 MDN 补完整签名、边界情况、兼容性和更多示例。

- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Introduction to web APIs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction)
- [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
- [EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
- [DOM events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [CSS Object Model (CSSOM)](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)
- [Window.getComputedStyle()](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)
- [Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [Element.scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- [SVG element reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
