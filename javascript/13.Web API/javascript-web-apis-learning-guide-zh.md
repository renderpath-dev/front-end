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
20. [16A：MDN 补充 API 查漏补缺](#20-16amdn-补充-api-查漏补缺)
21. [16：小项目整合](#21-16小项目整合)
22. [最终文件清单](#22-最终文件清单)
23. [最终学习笔记转换要求](#23-最终学习笔记转换要求)
24. [本章最终要能回答的问题](#24-本章最终要能回答的问题)
25. [MDN 阅读清单](#25-mdn-阅读清单)

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
  -> MDN supplementary APIs
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


## 20. 16A：MDN 补充 API 查漏补缺

### 结论

原来的学习路径已经覆盖《JavaScript 权威指南》第 15 章的主干：DOM、事件、CSSOM、几何、Web Components、SVG、Canvas、Audio、History、Fetch、Storage 和 Worker。

但 MDN 的 Web APIs 参考不是一章书的范围，而是一整个平台参考。这里补的不是“所有 API 的百科全书”，而是现代前端学习和项目开发中高频、容易遇到、并且会直接影响 React / Next.js / 全栈项目能力的 API。

本节补齐这些方向：

| 补充方向 | 代表 API | 为什么要补 |
|---|---|---|
| DOM 观察 | `MutationObserver`、`IntersectionObserver`、`ResizeObserver` | 现代 UI 经常需要观察 DOM 变化、元素进入视口、元素尺寸变化。 |
| 文件、剪贴板、拖放 | `Clipboard`、`File`、`Blob`、`FileReader`、`DataTransfer` | 上传图片、复制链接、拖拽文件是项目常见交互。 |
| 权限和设备能力 | `Permissions`、`Geolocation`、`MediaDevices.getUserMedia()`、`Notification`、`navigator.share()` | 浏览器访问隐私能力时必须经过权限边界。 |
| 性能和页面状态 | `performance`、`PerformanceObserver`、`requestAnimationFrame()`、`visibilitychange` | 前端性能优化和后台标签页行为必须理解。 |
| 实时通信和离线能力 | `WebSocket`、`BroadcastChannel`、`ServiceWorker`、`Cache` | 聊天、跨标签页同步、PWA、离线缓存都依赖这些。 |
| 安全和注入边界 | `Trusted Types` | DOM-based XSS 防护和 `innerHTML` 安全边界必须提前建立。 |
| UI 动画和原生浮层 | `Element.animate()`、Popover API | 现代浏览器逐渐把部分 UI 能力原生化。 |

### 技术意义

Web API 学习不能只按对象名记忆。更合理的分类方式是按“浏览器能力边界”学习：

```text
DOM state
  -> observe with observers

User-provided data
  -> read with File API, Drag and Drop, Clipboard

Permission-gated capability
  -> check/request permission, then use device or notification API

Runtime performance
  -> measure, schedule, pause, and avoid unnecessary work

Network and application lifecycle
  -> fetch, websocket, service worker, cache, broadcast channel

Security boundary
  -> never send untrusted strings directly into injection sinks
```

这套分类比“背 API 列表”更重要。真实项目里你首先遇到的不是 API 名字，而是问题：

```text
图片什么时候懒加载？
卡片尺寸变了怎么重新布局？
用户上传的文件怎么预览？
复制按钮为什么线上失效？
页面切到后台为什么计时器不准？
登录状态怎么同步到另一个 tab？
离线时页面为什么不能打开？
innerHTML 为什么危险？
```

这些问题都不是 ECMAScript 核心语言能直接解决的，它们属于浏览器宿主环境。

### 查漏结果

| 原文件已有覆盖 | 本节补充覆盖 |
|---|---|
| `document.querySelector()`、`createElement()`、`append()`、`remove()` | `MutationObserver`、`IntersectionObserver`、`ResizeObserver`、`DOMParser`、`Range`、`Selection` |
| `addEventListener()`、表单事件、默认行为 | Drag and Drop 事件、Clipboard 异步权限事件边界 |
| `getComputedStyle()`、`getBoundingClientRect()`、`scrollIntoView()` | `requestAnimationFrame()`、Web Animations API、Page Visibility API |
| `fetch()`、`Request`、`Response`、`AbortController` | `WebSocket`、`BroadcastChannel`、`ServiceWorker`、`Cache` |
| `localStorage`、`sessionStorage`、`document.cookie`、IndexedDB 预习 | Cache Storage、跨标签页通信、权限状态 |
| Worker 和 `postMessage()` | Service Worker 生命周期、Broadcast Channel、structured clone 在跨上下文通信中的角色 |

### 16A-1：Observer APIs：不要用轮询硬查 DOM 状态

#### 结论

`MutationObserver`、`IntersectionObserver` 和 `ResizeObserver` 都是在解决同一类问题：不要让代码自己频繁轮询浏览器状态，而是把“变化发生了”这件事交给浏览器通知。

它们的差别是观察对象不同：

| API | 观察什么 | 常见用途 |
|---|---|---|
| `MutationObserver` | DOM tree 的结构、属性、文本变化 | 监控第三方组件插入节点、调试 DOM 变更、自动增强动态内容。 |
| `IntersectionObserver` | 元素是否和视口或某个滚动容器相交 | 图片懒加载、无限滚动、曝光统计、进入视口后播放动画。 |
| `ResizeObserver` | 元素尺寸变化 | 响应式卡片、图表重绘、组件级布局变化。 |

#### 底层机制

这三个 API 都不是同步读取 API。你不会写：

```js
const changed = observer.checkNow();
```

而是写：

```js
const observer = new ObserverType(callback);
observer.observe(target);
```

浏览器内部在合适的时机收集变化，然后把变化记录交给 callback。

这和事件系统很像，但它们不是普通用户事件：

```text
DOM mutation / layout / visibility calculation
  -> browser collects records
  -> observer callback is queued
  -> callback receives entries or records
  -> JavaScript reacts to the changes
```

#### API / 语法规则

| API | 创建方式 | 关键方法 | callback 参数 |
|---|---|---|---|
| `MutationObserver` | `new MutationObserver(callback)` | `observe(target, options)`、`disconnect()`、`takeRecords()` | `MutationRecord[]` |
| `IntersectionObserver` | `new IntersectionObserver(callback, options)` | `observe(target)`、`unobserve(target)`、`disconnect()` | `IntersectionObserverEntry[]` |
| `ResizeObserver` | `new ResizeObserver(callback)` | `observe(target)`、`unobserve(target)`、`disconnect()` | `ResizeObserverEntry[]` |

#### 文件结构

```text
16a-mdn-observer-apis/
  index.html
  observerDemo.css
  observerDemo.js
```

#### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Observer APIs</title>
    <link rel="stylesheet" href="./observerDemo.css" />
  </head>
  <body>
    <h1>Observer APIs</h1>

    <button id="add-card-button">Add Card</button>
    <button id="resize-card-button">Resize First Card</button>

    <p id="mutation-output">DOM mutations: 0</p>
    <p id="resize-output">Resize entries: 0</p>
    <p id="intersection-output">Visible card: none</p>

    <main id="card-list" class="card-list">
      <article class="card observed-card">Initial Card</article>
    </main>

    <script type="module" src="./observerDemo.js"></script>
  </body>
</html>
```

#### `observerDemo.css`

```css
body {
  font-family: system-ui, sans-serif;
  min-height: 140vh;
}

.card-list {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

.card {
  width: 240px;
  min-height: 80px;
  padding: 16px;
  border: 1px solid #999;
  border-radius: 12px;
}
```

#### `observerDemo.js`

```js
// Goal:
// Compare MutationObserver, IntersectionObserver, and ResizeObserver.

const cardList = document.querySelector('#card-list');
const addCardButton = document.querySelector('#add-card-button');
const resizeCardButton = document.querySelector('#resize-card-button');
const mutationOutput = document.querySelector('#mutation-output');
const resizeOutput = document.querySelector('#resize-output');
const intersectionOutput = document.querySelector('#intersection-output');

let mutationCount = 0;
let resizeCount = 0;
let cardId = 1;

const mutationObserver = new MutationObserver((records) => {
  mutationCount += records.length;
  mutationOutput.textContent = `DOM mutations: ${mutationCount}`;

  for (const record of records) {
    console.log(record.type, record.addedNodes.length);
  }
});

mutationObserver.observe(cardList, {
  childList: true,
});

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        intersectionOutput.textContent = `Visible card: ${entry.target.textContent}`;
      }
    }
  },
  {
    threshold: 0.5,
  },
);

const resizeObserver = new ResizeObserver((entries) => {
  resizeCount += entries.length;
  resizeOutput.textContent = `Resize entries: ${resizeCount}`;

  for (const entry of entries) {
    console.log(entry.target.textContent, entry.contentRect.width);
  }
});

for (const card of document.querySelectorAll('.card')) {
  intersectionObserver.observe(card);
  resizeObserver.observe(card);
}

addCardButton.addEventListener('click', () => {
  cardId += 1;

  const card = document.createElement('article');
  card.className = 'card';
  card.textContent = `Card ${cardId}`;

  cardList.append(card);
  intersectionObserver.observe(card);
  resizeObserver.observe(card);
});

resizeCardButton.addEventListener('click', () => {
  const firstCard = document.querySelector('.card');
  firstCard.style.width = `${firstCard.offsetWidth + 40}px`;
});
```

#### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `MutationObserver` 开始观察 `cardList` 的子节点变化。 |
| 2 | `IntersectionObserver` 开始观察 `.card` 是否进入视口并达到 `threshold`。 |
| 3 | `ResizeObserver` 开始观察 `.card` 的尺寸变化。 |
| 4 | 点击 Add Card，代码创建新 `article` 并插入 DOM。 |
| 5 | DOM 插入不是由 `MutationObserver` 主动触发，而是浏览器记录 mutation 后通知 callback。 |
| 6 | 新 card 被加入 intersection 和 resize 观察列表。 |
| 7 | 点击 Resize First Card，inline style 改变宽度。 |
| 8 | 浏览器重新计算布局后，`ResizeObserver` callback 收到新的尺寸记录。 |

#### 常见错误

| 错误 | 原因 |
|---|---|
| 以为 observer callback 立即同步执行 | Observer callback 是浏览器在变化记录产生后异步通知，不是当前行立刻返回结果。 |
| 忘记 `disconnect()` | 长生命周期页面或组件卸载时可能继续保留观察关系。 |
| 用 `scroll` 事件循环调用 `getBoundingClientRect()` 做懒加载 | 这种写法容易造成主线程压力，`IntersectionObserver` 更适合。 |
| 用 `window.resize` 判断某个组件尺寸变化 | `window.resize` 只能代表视口变化，不能代表某个元素的内容尺寸变化。 |

### 16A-2：文件、Blob、Clipboard 和 Drag and Drop

#### 结论

浏览器不能随便读取用户电脑文件，也不能随便读写用户剪贴板。`File API`、`Clipboard API`、`Drag and Drop API` 都是“用户主动提供数据”或“用户明确触发操作”后的能力边界。

核心模型：

```text
User gesture
  -> browser grants limited access
  -> JavaScript receives File / Blob / Clipboard data
  -> code reads data asynchronously
  -> UI updates with safe derived result
```

#### 新关键字和新概念

| 概念 | English term | 技术意义 |
|---|---|---|
| 文件对象 | `File` | 用户选择或拖入的单个文件对象，包含 `name`、`size`、`type` 等元数据。 |
| 二进制大对象 | `Blob` | 表示不可变的原始数据块，`File` 是特殊的 `Blob`。 |
| 文件列表 | `FileList` | `<input type="file">` 或拖放操作产生的类数组文件集合。 |
| 文件读取器 | `FileReader` | 旧式 event-based 文件读取 API。现代项目更常用 `file.text()`、`file.arrayBuffer()`。 |
| 剪贴板对象 | `navigator.clipboard` | 暴露异步的 `readText()`、`writeText()`、`read()`、`write()`。 |
| 拖放数据 | `DataTransfer` | 拖放事件里携带文本、文件等数据的对象。 |

#### API / 语法规则

| 场景 | API |
|---|---|
| 读取文件文本 | `await file.text()` |
| 读取文件二进制 | `await file.arrayBuffer()` |
| 创建临时预览 URL | `URL.createObjectURL(file)` |
| 释放临时 URL | `URL.revokeObjectURL(url)` |
| 写入剪贴板文本 | `await navigator.clipboard.writeText(text)` |
| 读取剪贴板文本 | `await navigator.clipboard.readText()` |
| 允许 drop | 在 `dragover` 中调用 `event.preventDefault()` |
| 获取拖入文件 | `event.dataTransfer.files` |

#### 文件结构

```text
16b-file-clipboard-drag-drop/
  index.html
  fileClipboardDemo.css
  fileClipboardDemo.js
```

#### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>File Clipboard Drag Drop</title>
    <link rel="stylesheet" href="./fileClipboardDemo.css" />
  </head>
  <body>
    <h1>File, Clipboard, and Drag Drop</h1>

    <input id="file-input" type="file" accept="image/*,.txt" />
    <button id="copy-button">Copy Summary</button>

    <section id="drop-zone" class="drop-zone">
      Drop a file here
    </section>

    <pre id="file-output">No file selected.</pre>
    <img id="preview-image" alt="Selected file preview" />

    <script type="module" src="./fileClipboardDemo.js"></script>
  </body>
</html>
```

#### `fileClipboardDemo.css`

```css
body {
  font-family: system-ui, sans-serif;
}

.drop-zone {
  display: grid;
  place-items: center;
  width: 320px;
  height: 120px;
  margin-top: 16px;
  border: 2px dashed #999;
  border-radius: 12px;
}

#preview-image {
  display: block;
  max-width: 320px;
  margin-top: 16px;
}
```

#### `fileClipboardDemo.js`

```js
// Goal:
// Read user-provided files and copy derived text to the clipboard.

const fileInput = document.querySelector('#file-input');
const copyButton = document.querySelector('#copy-button');
const dropZone = document.querySelector('#drop-zone');
const fileOutput = document.querySelector('#file-output');
const previewImage = document.querySelector('#preview-image');

let currentSummary = 'No file selected.';

async function inspectFile(file) {
  currentSummary = [
    `Name: ${file.name}`,
    `Size: ${file.size} bytes`,
    `Type: ${file.type || 'unknown'}`,
  ].join('\n');

  fileOutput.textContent = currentSummary;

  if (file.type.startsWith('image/')) {
    const objectUrl = URL.createObjectURL(file);
    previewImage.src = objectUrl;

    previewImage.addEventListener(
      'load',
      () => {
        URL.revokeObjectURL(objectUrl);
      },
      { once: true },
    );
    return;
  }

  previewImage.removeAttribute('src');

  if (file.type === 'text/plain') {
    const text = await file.text();
    fileOutput.textContent = `${currentSummary}\n\nPreview:\n${text.slice(0, 500)}`;
  }
}

fileInput.addEventListener('change', async () => {
  const [file] = fileInput.files;

  if (file) {
    await inspectFile(file);
  }
});

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropZone.addEventListener('drop', async (event) => {
  event.preventDefault();

  const [file] = event.dataTransfer.files;

  if (file) {
    await inspectFile(file);
  }
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(currentSummary);
    copyButton.textContent = 'Copied';
  } catch (error) {
    console.error(error);
    copyButton.textContent = 'Copy failed';
  }
});
```

#### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 用户通过 input 或拖放把文件交给页面。 |
| 2 | 浏览器创建 `File` 对象，页面只能访问这些被用户选中的文件。 |
| 3 | `inspectFile(file)` 读取文件元数据。 |
| 4 | 图片文件通过 `URL.createObjectURL(file)` 得到临时 URL 用于预览。 |
| 5 | 图片加载后调用 `URL.revokeObjectURL()` 释放临时引用。 |
| 6 | 文本文件通过 `await file.text()` 异步读取内容。 |
| 7 | 用户点击 copy 按钮时，`navigator.clipboard.writeText()` 尝试写入剪贴板。 |

#### 常见错误

| 错误 | 原因 |
|---|---|
| 在页面加载时直接读取用户文件路径 | 浏览器不会给网页任意文件系统访问权限。 |
| 拖放时忘记在 `dragover` 调用 `preventDefault()` | 默认情况下元素不是 drop target，`drop` 可能不会按预期触发。 |
| `navigator.clipboard.writeText()` 在线上 HTTP 页面失效 | Clipboard API 通常要求 secure context，并且常常要求用户手势。 |
| 创建 object URL 后从不释放 | 大文件预览可能造成内存占用。 |

### 16A-3：权限、设备能力和用户隐私边界

#### 结论

`Geolocation`、`MediaDevices.getUserMedia()`、`Notification`、`Clipboard`、`Web Share` 这类 API 的共同点是：它们不是普通函数调用，而是浏览器权限系统保护下的能力调用。

你写的是 JavaScript 代码，但能不能执行成功取决于：

```text
secure context
  + permissions policy
  + user gesture
  + user permission decision
  + browser support
```

#### 关键 API

| API | 入口 | 返回或行为 |
|---|---|---|
| Permissions API | `navigator.permissions.query({ name })` | 返回 `Promise<PermissionStatus>` |
| Geolocation API | `navigator.geolocation.getCurrentPosition()` | 通过 callback 返回位置或错误 |
| Media Capture | `navigator.mediaDevices.getUserMedia(constraints)` | 返回 `Promise<MediaStream>` |
| Notifications API | `Notification.requestPermission()`、`new Notification()` | 请求通知权限并显示系统通知 |
| Web Share API | `navigator.share(data)` | 调用系统分享面板，返回 `Promise<void>` |

#### 文件结构

```text
16c-permissions-device-apis/
  index.html
  permissionDeviceDemo.js
```

#### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Permission Device APIs</title>
  </head>
  <body>
    <h1>Permission and Device APIs</h1>

    <button id="check-permission-button">Check Geolocation Permission</button>
    <button id="location-button">Get Location</button>
    <button id="camera-button">Start Camera</button>
    <button id="notify-button">Notify</button>
    <button id="share-button">Share</button>

    <p id="permission-output">Permission state: unknown</p>
    <p id="location-output">Location: none</p>
    <video id="camera-preview" autoplay playsinline width="320"></video>

    <script type="module" src="./permissionDeviceDemo.js"></script>
  </body>
</html>
```

#### `permissionDeviceDemo.js`

```js
// Goal:
// Inspect permission-gated browser APIs.

const checkPermissionButton = document.querySelector('#check-permission-button');
const locationButton = document.querySelector('#location-button');
const cameraButton = document.querySelector('#camera-button');
const notifyButton = document.querySelector('#notify-button');
const shareButton = document.querySelector('#share-button');

const permissionOutput = document.querySelector('#permission-output');
const locationOutput = document.querySelector('#location-output');
const cameraPreview = document.querySelector('#camera-preview');

checkPermissionButton.addEventListener('click', async () => {
  if (!navigator.permissions) {
    permissionOutput.textContent = 'Permission API is not available.';
    return;
  }

  const status = await navigator.permissions.query({ name: 'geolocation' });
  permissionOutput.textContent = `Permission state: ${status.state}`;

  status.addEventListener('change', () => {
    permissionOutput.textContent = `Permission state: ${status.state}`;
  });
});

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    locationOutput.textContent = 'Geolocation is not available.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      locationOutput.textContent = `Location: ${latitude}, ${longitude}`;
    },
    (error) => {
      locationOutput.textContent = `Location error: ${error.message}`;
    },
  );
});

cameraButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    cameraPreview.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
});

notifyButton.addEventListener('click', async () => {
  if (!('Notification' in window)) {
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    new Notification('Web API practice', {
      body: 'Permission was granted.',
    });
  }
});

shareButton.addEventListener('click', async () => {
  if (!navigator.share) {
    console.log('Web Share API is not available.');
    return;
  }

  await navigator.share({
    title: 'Web API practice',
    text: 'Learning browser permission boundaries.',
    url: location.href,
  });
});
```

#### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `navigator.permissions.query()` 查询当前权限状态，但不一定弹窗请求权限。 |
| 2 | `getCurrentPosition()` 才是真正触发位置访问的能力调用。 |
| 3 | `getUserMedia()` 请求摄像头媒体流，成功后 `video.srcObject` 指向 `MediaStream`。 |
| 4 | `Notification.requestPermission()` 请求通知权限。 |
| 5 | `navigator.share()` 依赖设备和浏览器是否支持原生分享面板。 |

#### 常见错误

| 错误 | 原因 |
|---|---|
| 以为 Permissions API 可以统一请求所有权限 | 它主要用于查询权限状态，具体请求通常由对应 API 自己触发。 |
| 在 HTTP 页面使用摄像头、剪贴板、通知 | 这些能力通常需要 secure context。 |
| 以为权限一次允许就永远可用 | 用户可以在浏览器设置里撤销权限，代码要处理失败路径。 |
| 只写成功路径，不写 rejected Promise 或 error callback | 权限 API 的失败是正常业务分支，不是罕见异常。 |

### 16A-4：Performance、requestAnimationFrame 和 Page Visibility

#### 结论

性能相关 API 解决两个问题：

```text
Measure what happened.
Schedule work at the right time.
```

`performance.now()`、`performance.mark()`、`performance.measure()` 用来测量；`requestAnimationFrame()` 用来把视觉更新安排到浏览器下一帧；Page Visibility API 用来判断页面是否在前台，避免隐藏标签页继续做不必要工作。

#### 关键 API

| API | 作用 |
|---|---|
| `performance.now()` | 返回高精度时间戳，适合测量代码耗时。 |
| `performance.mark(name)` | 标记一个性能时间点。 |
| `performance.measure(name, start, end)` | 根据两个 mark 生成一条测量记录。 |
| `PerformanceObserver` | 监听性能记录产生。 |
| `requestAnimationFrame(callback)` | 在下一次重绘前运行 callback。 |
| `cancelAnimationFrame(id)` | 取消还没执行的动画帧 callback。 |
| `document.hidden` | 判断页面是否隐藏。 |
| `document.visibilityState` | 读取页面可见性状态。 |
| `visibilitychange` | 页面可见性变化时触发。 |

#### 文件结构

```text
16d-performance-page-state/
  index.html
  performancePageDemo.css
  performancePageDemo.js
```

#### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Performance Page State</title>
    <link rel="stylesheet" href="./performancePageDemo.css" />
  </head>
  <body>
    <h1>Performance and Page State</h1>

    <button id="work-button">Run Work</button>
    <button id="animation-button">Toggle Animation</button>

    <p id="visibility-output">Visibility: visible</p>
    <p id="measure-output">Measure: none</p>

    <div id="box" class="box"></div>

    <script type="module" src="./performancePageDemo.js"></script>
  </body>
</html>
```

#### `performancePageDemo.css`

```css
body {
  font-family: system-ui, sans-serif;
}

.box {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: #888;
}
```

#### `performancePageDemo.js`

```js
// Goal:
// Measure work and schedule visual updates with browser timing APIs.

const workButton = document.querySelector('#work-button');
const animationButton = document.querySelector('#animation-button');
const visibilityOutput = document.querySelector('#visibility-output');
const measureOutput = document.querySelector('#measure-output');
const box = document.querySelector('#box');

let frameId = 0;
let isAnimating = false;
let x = 0;

const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    measureOutput.textContent = `${entry.name}: ${entry.duration.toFixed(2)}ms`;
  }
});

performanceObserver.observe({
  entryTypes: ['measure'],
});

function runExpensiveWork() {
  let total = 0;

  for (let index = 0; index < 5_000_000; index += 1) {
    total += Math.sqrt(index);
  }

  return total;
}

workButton.addEventListener('click', () => {
  performance.mark('work-start');
  runExpensiveWork();
  performance.mark('work-end');
  performance.measure('expensive-work', 'work-start', 'work-end');
});

function updateAnimation() {
  if (!isAnimating || document.hidden) {
    return;
  }

  x = (x + 2) % 240;
  box.style.transform = `translateX(${x}px)`;

  frameId = requestAnimationFrame(updateAnimation);
}

animationButton.addEventListener('click', () => {
  isAnimating = !isAnimating;

  if (isAnimating) {
    frameId = requestAnimationFrame(updateAnimation);
  } else {
    cancelAnimationFrame(frameId);
  }
});

document.addEventListener('visibilitychange', () => {
  visibilityOutput.textContent = `Visibility: ${document.visibilityState}`;

  if (!document.hidden && isAnimating) {
    frameId = requestAnimationFrame(updateAnimation);
  }
});
```

#### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 点击 Run Work 时，代码设置开始和结束 mark。 |
| 2 | `performance.measure()` 创建一条 performance entry。 |
| 3 | `PerformanceObserver` 收到 measure entry 并更新页面。 |
| 4 | 点击 Toggle Animation 时，`requestAnimationFrame()` 安排下一帧更新。 |
| 5 | 每一帧只修改 `transform`，让视觉更新和浏览器重绘节奏对齐。 |
| 6 | 页面隐藏时，`document.hidden` 让动画逻辑停止继续排队。 |

#### 常见错误

| 错误 | 原因 |
|---|---|
| 用 `Date.now()` 测量短任务 | `performance.now()` 更适合高精度性能测量。 |
| 用 `setInterval()` 做视觉动画 | 它不和浏览器重绘节奏绑定，后台标签页还会受到节流影响。 |
| 页面隐藏时继续轮询接口或更新动画 | 会浪费资源，移动端尤其明显。 |
| 以为 `requestAnimationFrame()` 是微任务 | 它属于浏览器渲染调度，不是 Promise job queue。 |

### 16A-5：WebSocket、BroadcastChannel、Service Worker 和 Cache

#### 结论

Fetch 适合“一次请求，一次响应”。但真实应用还需要三类通信和生命周期能力：

```text
Real-time server communication
  -> WebSocket

Same-origin cross-tab communication
  -> BroadcastChannel

Offline and network interception
  -> Service Worker + Cache
```

这三类 API 都和“普通函数调用”不同。它们背后有长期存在的连接、浏览上下文、worker 生命周期和浏览器缓存策略。

#### 关键 API

| API | 作用 |
|---|---|
| `new WebSocket(url)` | 建立浏览器和服务器之间的双向实时连接。 |
| `socket.send(data)` | 通过 WebSocket 发送消息。 |
| `message` event | 接收 WebSocket 或 BroadcastChannel 消息。 |
| `new BroadcastChannel(name)` | 加入同源同名广播频道。 |
| `channel.postMessage(value)` | 向同频道其他上下文广播消息。 |
| `navigator.serviceWorker.register(url)` | 注册 service worker。 |
| `install` event | service worker 安装阶段，常用于预缓存资源。 |
| `fetch` event | service worker 拦截页面网络请求。 |
| `caches.open(name)` | 打开一个命名 Cache。 |
| `cache.match(request)` | 从 Cache 查找响应。 |
| `cache.addAll(urls)` | 批量缓存资源。 |

#### 文件结构

```text
16e-realtime-offline-security/
  index.html
  realtimeOfflineDemo.js
  serviceWorker.js
```

#### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Realtime Offline APIs</title>
  </head>
  <body>
    <h1>Realtime and Offline APIs</h1>

    <button id="broadcast-button">Broadcast Login State</button>
    <button id="websocket-button">Open Echo WebSocket</button>

    <p id="service-worker-output">Service worker: not registered</p>
    <p id="broadcast-output">Broadcast: none</p>
    <p id="websocket-output">WebSocket: closed</p>

    <script type="module" src="./realtimeOfflineDemo.js"></script>
  </body>
</html>
```

#### `realtimeOfflineDemo.js`

```js
// Goal:
// Compare same-origin tab messaging, service worker registration, and websocket state.

const broadcastButton = document.querySelector('#broadcast-button');
const websocketButton = document.querySelector('#websocket-button');
const serviceWorkerOutput = document.querySelector('#service-worker-output');
const broadcastOutput = document.querySelector('#broadcast-output');
const websocketOutput = document.querySelector('#websocket-output');

const authChannel = new BroadcastChannel('auth-state');

authChannel.addEventListener('message', (event) => {
  broadcastOutput.textContent = `Broadcast: ${event.data.type}`;
});

broadcastButton.addEventListener('click', () => {
  authChannel.postMessage({
    type: 'user-login',
    at: Date.now(),
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceWorker.js')
    .then((registration) => {
      serviceWorkerOutput.textContent = `Service worker: ${registration.scope}`;
    })
    .catch((error) => {
      serviceWorkerOutput.textContent = `Service worker error: ${error.message}`;
    });
}

websocketButton.addEventListener('click', () => {
  const socket = new WebSocket('wss://echo.websocket.events');

  socket.addEventListener('open', () => {
    websocketOutput.textContent = 'WebSocket: open';
    socket.send('hello from browser');
  });

  socket.addEventListener('message', (event) => {
    websocketOutput.textContent = `WebSocket message: ${event.data}`;
    socket.close();
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket closed.');
  });

  socket.addEventListener('error', (event) => {
    console.error(event);
    websocketOutput.textContent = 'WebSocket: error';
  });
});
```

#### `serviceWorker.js`

```js
// Goal:
// Cache a small application shell and respond from cache when possible.

const CACHE_NAME = 'web-api-guide-v1';
const APP_SHELL = [
  './',
  './index.html',
  './realtimeOfflineDemo.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});
```

#### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | 页面创建 `BroadcastChannel('auth-state')`。 |
| 2 | 打开同源同路径的第二个标签页时，两个页面加入同名频道。 |
| 3 | 一个页面调用 `postMessage()`，另一个页面收到 `message` event。 |
| 4 | 页面注册 `serviceWorker.js`，浏览器在后台 worker 上下文执行它。 |
| 5 | `install` event 中打开 Cache，并缓存 app shell。 |
| 6 | 后续请求经过 service worker 的 `fetch` event。 |
| 7 | 如果 Cache 命中，返回缓存响应；否则继续 `fetch(event.request)`。 |
| 8 | WebSocket 建立长连接，`open` 后发送消息，`message` 后收到服务器推送。 |

#### 常见错误

| 错误 | 原因 |
|---|---|
| 以为 WebSocket 是 Promise API | WebSocket 是 event-based API，状态通过 `open`、`message`、`error`、`close` 事件驱动。 |
| 以为 BroadcastChannel 可以跨网站通信 | 它受 origin 和 storage partition 限制，不是跨站通信 API。 |
| 以为 service worker 注册后立刻控制当前页面 | 通常需要页面重新加载后才被新 service worker 控制。 |
| 以为 Cache 会自动遵守 HTTP 缓存头更新 | Cache API 需要你自己定义缓存版本、更新和清理策略。 |
| 在 service worker 中操作 DOM | Service worker 是 worker 上下文，没有 DOM 访问权限。 |

### 16A-6：Trusted Types、DOMParser、Range、Selection、Web Animations 和 Popover

#### 结论

这些 API 不一定每个初学项目都会马上用到，但它们决定了你能不能理解现代浏览器里更底层的 UI、安全和文档操作边界。

| API | 解决什么问题 |
|---|---|
| Trusted Types API | 限制不可信字符串进入 HTML / script injection sinks，降低 DOM-based XSS 风险。 |
| `DOMParser` | 把字符串解析成独立的 `Document`，不要直接塞进当前页面。 |
| `Range` | 表示文档中的一段连续内容范围。 |
| `Selection` | 表示用户当前选中的文本或节点范围。 |
| Web Animations API | 用 JavaScript 创建、控制和检查 DOM 动画。 |
| Popover API | 用 HTML 属性和少量 JS 实现原生浮层显示与隐藏。 |

#### 安全边界：不要把字符串当成 DOM 信任

危险写法：

```js
const commentHtml = '<img src=x onerror=alert(1)>';
document.querySelector('#comments').innerHTML = commentHtml;
```

这里的问题不是 `innerHTML` 语法复杂，而是它是一个 injection sink。字符串被浏览器当作 HTML 解析后，攻击者可以尝试注入可执行内容。

更安全的默认写法：

```js
const commentText = '<img src=x onerror=alert(1)>';
document.querySelector('#comments').textContent = commentText;
```

`textContent` 把字符串当文本，不当 HTML 解释。

#### DOMParser 的正确定位

`DOMParser` 适合把字符串解析到一个独立文档，再从中提取安全、明确需要的部分：

```js
// Goal:
// Parse a string into an isolated document.

const parser = new DOMParser();
const parsedDocument = parser.parseFromString('<h2>Preview</h2>', 'text/html');
const heading = parsedDocument.querySelector('h2');

console.log(heading.textContent);
```

这不等于“解析后就安全”。真正安全的规则仍然是：不要把不可信内容作为可执行 HTML 插入当前页面。

#### Range 和 Selection 的模型

`Range` 表示文档里的一个范围，不一定等于用户选择；`Selection` 是用户当前选择状态，里面可以包含 range。

```js
// Goal:
// Read the current selected text.

document.addEventListener('selectionchange', () => {
  const selection = document.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return;
  }

  console.log(selection.toString());
});
```

#### Web Animations API 的模型

CSS 动画适合声明式样式；Web Animations API 适合 JS 需要控制播放状态的场景：

```js
// Goal:
// Create and control an animation with Element.animate.

const panel = document.querySelector('#panel');

const animation = panel.animate(
  [
    { opacity: 0, transform: 'translateY(8px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ],
  {
    duration: 200,
    easing: 'ease-out',
    fill: 'forwards',
  },
);

animation.addEventListener('finish', () => {
  console.log('Animation finished.');
});
```

#### Popover API 的模型

Popover API 把“打开 / 关闭浮层”的基础行为交给浏览器，不需要你手写大量 document click 监听和焦点处理。

```html
<button popovertarget="profile-popover">Open Profile</button>

<div id="profile-popover" popover>
  Profile actions
</div>
```

对应 JS 可以调用：

```js
// Goal:
// Control a popover with JavaScript.

const popover = document.querySelector('#profile-popover');

popover.showPopover();
popover.hidePopover();
popover.togglePopover();
```

#### 常见错误

| 错误 | 原因 |
|---|---|
| 认为 `DOMParser` 自动消毒 HTML | 解析和消毒不是一回事。 |
| 为了渲染用户评论直接使用 `innerHTML` | 不可信字符串进入 injection sink 会产生 XSS 风险。 |
| 混淆 `Range` 和 `Selection` | `Range` 是文档范围对象，`Selection` 是用户当前选择状态。 |
| 所有动画都用 JS 写 | 纯样式状态变化优先用 CSS transition / animation；需要控制播放状态时再用 Web Animations API。 |
| 自己手写所有浮层行为 | 简单浮层优先考虑 Popover 或 `<dialog>`，复杂交互再自定义。 |

### 16A API 记忆模型

```text
Observe:
  MutationObserver
  IntersectionObserver
  ResizeObserver

User data:
  File
  Blob
  FileReader
  DataTransfer
  Clipboard

Permission:
  Permissions
  Geolocation
  MediaDevices
  Notification
  Web Share

Performance and lifecycle:
  performance
  PerformanceObserver
  requestAnimationFrame
  visibilitychange

Communication and offline:
  WebSocket
  BroadcastChannel
  ServiceWorker
  Cache

Security and document editing:
  Trusted Types
  DOMParser
  Range
  Selection

Native UI:
  Web Animations
  Popover
```

### 16A 常见错误总表

| 错误 | 准确原因 | 修正方式 |
|---|---|---|
| 把 MDN Web APIs 当成必须一次背完的列表 | Web APIs 数量很大，学习要按能力边界和项目问题分类 | 先掌握高频主干，再按项目需要查 MDN |
| 看到 `navigator.xxx` 就以为所有浏览器都支持 | 很多能力受浏览器、设备、secure context、permission policy 限制 | 写 feature detection 和失败路径 |
| 忘记 observer、channel、media stream 的清理 | 这些对象可能跨越多次 UI 生命周期 | 组件卸载或页面结束时 `disconnect()`、`close()`、停止 media tracks |
| 把所有异步 API 都当 Promise | 一些 API 是 Promise-based，一些是 event-based，一些是 callback-based | 先判断 API 的异步模型 |
| 把 Web Worker 和 Service Worker 混为一谈 | Worker 用于后台计算；Service Worker 用于网络拦截、缓存和离线能力 | 按职责区分：compute worker vs network proxy worker |
| 忽略安全上下文 | 剪贴板、摄像头、通知、Service Worker、Cache 等能力经常要求 HTTPS 或 localhost | 本地用 `localhost`，上线用 HTTPS |
| 把字符串插入 `innerHTML` | 不可信字符串进入 injection sink 有 XSS 风险 | 默认用 `textContent`，需要 HTML 时使用可信模板和消毒策略 |


## 21. 16：小项目整合

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

## 22. 最终文件清单

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

  16a-mdn-observer-apis/
    index.html
    observerDemo.css
    observerDemo.js

  16b-file-clipboard-drag-drop/
    index.html
    fileClipboardDemo.css
    fileClipboardDemo.js

  16c-permissions-device-apis/
    index.html
    permissionDeviceDemo.js

  16d-performance-page-state/
    index.html
    performancePageDemo.css
    performancePageDemo.js

  16e-realtime-offline-security/
    index.html
    realtimeOfflineDemo.js
    serviceWorker.js

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

## 23. 最终学习笔记转换要求

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

## 24. 本章最终要能回答的问题

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

## 25. MDN 阅读清单

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
- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- [File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API)
- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [Navigator.share()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)
- [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
- [Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)
- [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)
- [Range](https://developer.mozilla.org/en-US/docs/Web/API/Range)
- [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
