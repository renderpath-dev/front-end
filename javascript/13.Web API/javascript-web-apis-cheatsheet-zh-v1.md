# JavaScript Web APIs Cheatsheet

> 适用范围：《JavaScript 权威指南》第 15 章“浏览器中的 JavaScript”学习后的快速复习。  
> 定位：这是速查表，不是学习指导文件，也不是最终学习笔记。  
> 核心目标：快速判断某个 Web API 属于哪一层、解决什么问题、怎么调用、返回什么、是否同步、是否会修改页面、最常见坑是什么。  
> 代码规则：代码命名和代码注释使用 English；代码和代码注释不使用中文字符。

---

## 目录

1. [总模型：Web API 到底是什么](#1-总模型web-api-到底是什么)
2. [浏览器运行环境](#2-浏览器运行环境)
3. [脚本加载和浏览器模块](#3-脚本加载和浏览器模块)
4. [DOM 查询和节点模型](#4-dom-查询和节点模型)
5. [DOM 修改](#5-dom-修改)
6. [事件系统](#6-事件系统)
7. [表单和默认行为](#7-表单和默认行为)
8. [CSSOM、classList、computed style](#8-cssomclasslistcomputed-style)
9. [文档几何、尺寸和滚动](#9-文档几何尺寸和滚动)
10. [Web Components](#10-web-components)
11. [SVG](#11-svg)
12. [Canvas 2D](#12-canvas-2d)
13. [Web Audio API](#13-web-audio-api)
14. [Location、History 和导航状态](#14-locationhistory-和导航状态)
15. [Fetch、Request、Response、AbortController](#15-fetchrequestresponseabortcontroller)
16. [Web Storage、Cookie、IndexedDB](#16-web-storagecookieindexeddb)
17. [Worker 和消息传递](#17-worker-和消息传递)
18. [综合项目 API 组合模型](#18-综合项目-api-组合模型)
19. [同步 / 异步 / 会触发布局的 API 对照](#19-同步--异步--会触发布局的-api-对照)
20. [同名方法和相似 API 对照](#20-同名方法和相似-api-对照)
21. [高频错误总表](#21-高频错误总表)
22. [最终记忆模型](#22-最终记忆模型)

---

## 1. 总模型：Web API 到底是什么

### 结论

Web API 不是 ECMAScript 核心语言本身，而是浏览器宿主环境（browser host environment）暴露给 JavaScript 的对象、构造函数、方法和事件系统。

```text
JavaScript core language
  -> syntax, values, objects, functions, modules, promises

Browser host environment
  -> window, document, DOM, events, fetch, storage, canvas, workers

Front-end application
  -> JavaScript core + Web APIs + CSS + HTML
```

### 技术意义

前端代码不是只运行语言语法。真实页面运行时至少有四层：

| 层级 | 负责什么 | 典型对象 / API |
|---|---|---|
| ECMAScript core | 值、对象、函数、类、模块、Promise | `Array`, `Map`, `Promise`, `class`, `import` |
| Browser host environment | 页面、事件、网络、存储、线程、图形 | `window`, `document`, `fetch`, `Worker` |
| DOM / CSSOM | 文档结构和样式对象模型 | `Element`, `Node`, `classList`, `getComputedStyle()` |
| Rendering engine | 布局、绘制、合成、滚动 | layout, paint, compositing |

### 底层机制

```text
HTML text
  -> browser parses it
  -> DOM tree is created
  -> CSS is parsed into CSSOM
  -> render tree / layout / paint happen
  -> JavaScript reads and mutates DOM through Web APIs
  -> browser updates the rendered page
```

### 和 React / 前端工程的关系

React、Vue、Svelte、Next.js 最终都要落到浏览器能力：

```text
component state changes
  -> framework computes UI changes
  -> DOM operations or hydration happen
  -> browser renders updated document
```

所以 Web API 是框架底层运行目标，不是“过时原生写法”。

---

## 2. 浏览器运行环境

### 核心对象速查

| 对象 | English term | 作用 | 是否 ECMAScript core |
|---|---|---|---|
| `window` | Window object | 浏览器窗口对象，也是浏览器主线程全局对象 | 否 |
| `globalThis` | global object reference | 当前环境的全局对象统一引用 | 是 |
| `document` | Document object | 当前 HTML 文档的 DOM 入口 | 否 |
| `navigator` | Navigator object | 浏览器、设备、平台能力信息 | 否 |
| `location` | Location object | 当前页面 URL 信息和导航入口 | 否 |
| `history` | History object | 当前 tab 的会话历史栈 | 否 |
| `console` | console API | 调试输出接口 | 宿主 API，浏览器和 Node 常见 |
| `customElements` | CustomElementRegistry | 注册 custom element | 否 |
| `localStorage` | Web Storage | 同源持久字符串键值存储 | 否 |

### `window === globalThis`

在浏览器主线程中通常成立：

```js
console.log(window === globalThis);
```

但在 Node 中没有 `window`。在 Worker 中也没有 `window`，Worker 的全局对象通常通过 `self` 访问。

### `document` 的定位

`document` 是 DOM 文档入口，不是 JS 语言对象模型的一部分。

```js
const titleElement = document.querySelector('h1');
console.log(titleElement.textContent);
```

### 常见判断

| 问题 | 判断 |
|---|---|
| Node 里能不能用 `document`？ | 不能，除非额外模拟 DOM 环境。 |
| Worker 里能不能用 `document`？ | 不能，Worker 不能直接访问 DOM。 |
| 浏览器模块里能不能用 `window`？ | 能，但顶层声明不会像 classic script 一样自动挂到 `window`。 |
| `navigator.userAgent` 能不能可靠判断所有设备？ | 不应该过度依赖，真实项目优先 feature detection。 |

---

## 3. 脚本加载和浏览器模块

### classic script vs module script

| 对比项 | classic script | module script |
|---|---|---|
| HTML 写法 | `<script src="./app.js"></script>` | `<script type="module" src="./app.js"></script>` |
| 是否能写静态 `import` | 不能 | 能 |
| 顶层作用域 | 更接近全局脚本作用域 | 模块作用域 |
| 默认执行时机 | 按解析位置，除非加 `defer` / `async` | 默认类似 defer |
| 是否严格模式 | 不自动严格 | 自动严格模式 |
| 文件依赖 | 靠加载顺序或全局对象 | 靠 `import` 依赖图 |
| 真实项目推荐 | 老代码或特殊场景 | 现代前端入口优先 |

### 常见写法

```html
<script type="module" src="./main.js"></script>
```

```js
import { createBrowserMessage } from './messageTools.js';

const outputElement = document.querySelector('#output');
outputElement.textContent = createBrowserMessage('module');
```

### 底层机制

```text
browser reads <script type="module">
  -> downloads entry module
  -> parses static imports
  -> downloads dependency modules
  -> creates module graph
  -> executes modules in dependency order
```

### 常见错误

| 错误 | 原因 |
|---|---|
| 用普通 `<script>` 加载带 `import` 的文件 | classic script 不能解析静态 import |
| 本地直接 `file://` 打开模块页面 | 模块加载常受浏览器安全规则限制 |
| 忘记相对路径扩展名 | 浏览器 ESM 通常需要明确 `.js` 路径 |
| 以为模块顶层变量会自动变成 `window.xxx` | 模块有 module scope，不会自动污染全局对象 |

---

## 4. DOM 查询和节点模型

### 核心模型

```text
HTML element text
  -> parsed by browser
  -> represented as DOM nodes
  -> queried through document / element
  -> returned as Element / Node / NodeList objects
```

### Node vs Element

| 名称 | English term | 含义 |
|---|---|---|
| Node | Node | DOM tree 的通用节点类型，元素、文本、注释都可以是 Node |
| Element | Element | HTML / SVG 标签对应的元素节点 |
| HTMLElement | HTMLElement | HTML 元素对象的基类 |
| Text | Text node | 文本节点 |
| Document | Document | 整个文档对象 |
| NodeList | NodeList | 节点列表，可能静态，也可能 live，取决于 API |

### 查询 API 速查

| API | 所属对象 | 参数 | 返回值 | 说明 |
|---|---|---|---|---|
| `document.querySelector(selector)` | Document | CSS selector | 第一个匹配 Element 或 `null` | 常用单元素查询 |
| `element.querySelector(selector)` | Element | CSS selector | 第一个匹配后代 Element 或 `null` | 限定范围查询 |
| `document.querySelectorAll(selector)` | Document | CSS selector | 静态 NodeList | 常用多元素查询 |
| `document.getElementById(id)` | Document | id string | Element 或 `null` | 不写 `#` |
| `element.matches(selector)` | Element | CSS selector | boolean | 判断元素是否匹配 selector |
| `element.closest(selector)` | Element | CSS selector | 最近祖先或自身，找不到为 `null` | 事件委托常用 |

### `querySelector()` 选择器规则

```js
document.querySelector('#app-root');
document.querySelector('.product-item');
document.querySelector('[data-sku="KB-01"]');
document.querySelector('main .product-item');
```

| 写法 | 查找目标 |
|---|---|
| `'#app-root'` | id 为 `app-root` 的元素 |
| `'.product-item'` | class 包含 `product-item` 的元素 |
| `'product-item'` | `<product-item>` 标签，不是 class |
| `'[data-sku]'` | 拥有 `data-sku` 属性的元素 |

### 常用属性

| 属性 | 所属对象 | 作用 |
|---|---|---|
| `element.textContent` | Node / Element | 读取或设置文本内容 |
| `element.innerHTML` | Element | 读取或设置 HTML 字符串 |
| `element.dataset` | HTMLElement | 读取 `data-*` 属性形成的 DOMStringMap |
| `element.id` | Element | id |
| `element.className` | Element | class 字符串 |
| `element.children` | Element | 子元素集合 |
| `element.childNodes` | Node | 子节点集合，包括文本节点 |

### `textContent` vs `innerHTML`

| API | 处理内容 | 安全性 | 适合场景 |
|---|---|---|---|
| `textContent` | 纯文本 | 更安全 | 显示用户输入、普通文本 |
| `innerHTML` | HTML 字符串 | 有注入风险 | 明确可信 HTML、模板渲染 |
| `dataset` | `data-*` 字符串 | 只是属性读写 | DOM 上存轻量标记 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 查询不到还直接 `.textContent` | `querySelector()` 可能返回 `null` |
| `querySelectorAll()` 返回数组 | 返回 NodeList，不是 Array，但可 `for...of` |
| 修改 DOM 后旧 NodeList 会自动更新 | `querySelectorAll()` 返回静态 NodeList |
| `dataset.sku` 是任意类型 | `dataset` 读出来是字符串 |

---

## 5. DOM 修改

### 结论

DOM 修改（DOM mutation）就是改变 DOM tree。页面变化不是 JS 自己“画出来”，而是浏览器根据新的 DOM / CSSOM 重新渲染。

### 创建和插入 API

| API | 返回值 | 是否修改 DOM | 说明 |
|---|---|---|---|
| `document.createElement(tagName)` | Element | 否 | 创建 HTML 元素 |
| `document.createElementNS(namespace, tagName)` | Element | 否 | 创建 SVG 等命名空间元素 |
| `parent.append(...nodesOrStrings)` | `undefined` | 是 | 插入到末尾 |
| `parent.prepend(...nodesOrStrings)` | `undefined` | 是 | 插入到开头 |
| `node.remove()` | `undefined` | 是 | 从父节点移除自己 |
| `parent.replaceChildren(...nodesOrStrings)` | `undefined` | 是 | 替换全部子节点 |
| `parent.insertBefore(newNode, referenceNode)` | inserted node | 是 | 插入到指定节点前 |

### 属性和文本更新

| API / 属性 | 作用 | 注意点 |
|---|---|---|
| `element.textContent = value` | 设置文本 | 不解析 HTML |
| `element.setAttribute(name, value)` | 设置属性 | value 会变字符串 |
| `element.getAttribute(name)` | 读取属性 | 不存在返回 `null` |
| `element.removeAttribute(name)` | 删除属性 | 常用于 boolean attribute |
| `element.dataset.name = value` | 设置 `data-name` | value 是字符串 |
| `element.classList.add(name)` | 添加 class | 避免手拼 class string |

### 推荐模式

```js
const itemElement = document.createElement('li');
itemElement.textContent = 'Keyboard: 2';
cartListElement.append(itemElement);
```

不要优先用：

```js
cartListElement.innerHTML += '<li>Keyboard: 2</li>';
```

原因：

```text
innerHTML reparses markup.
User input can become XSS.
Old DOM references and event listeners can be affected.
```

### DOM mutation 和渲染

```text
JavaScript changes DOM
  -> browser marks style/layout as dirty
  -> browser recalculates when needed
  -> page visually updates
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 以为 `createElement()` 会自动显示 | 创建后还要插入 DOM |
| 用字符串拼接用户输入生成 HTML | 应优先 `textContent` |
| 修改 DOM 后马上频繁读取布局 | 可能触发同步布局计算 |
| 用 `replaceChildren()` 后还以为旧子元素还在 DOM 中 | 它们已被移除 |

---

## 6. 事件系统

### 结论

事件（event）是浏览器把用户行为或环境变化传给 JavaScript 的机制。事件监听器（event listener）是 callback function。

### 核心 API

| API | 所属对象 | 作用 |
|---|---|---|
| `target.addEventListener(type, listener, options?)` | EventTarget | 注册事件监听器 |
| `target.removeEventListener(type, listener, options?)` | EventTarget | 移除事件监听器 |
| `event.preventDefault()` | Event | 阻止默认行为 |
| `event.stopPropagation()` | Event | 阻止继续传播 |
| `event.stopImmediatePropagation()` | Event | 阻止同目标后续监听器 |
| `element.matches(selector)` | Element | 判断点击目标 |
| `element.closest(selector)` | Element | 向上找最近匹配元素 |

### `addEventListener()` 参数

```js
element.addEventListener('click', handleClick);
element.addEventListener('click', handleClick, { capture: true, once: true });
```

| 参数 | 含义 |
|---|---|
| `type` | 事件类型，例如 `'click'`, `'input'`, `'submit'` |
| `listener` | 事件发生时执行的函数 |
| `options.capture` | 是否在捕获阶段触发 |
| `options.once` | 是否只执行一次后自动移除 |
| `options.passive` | 是否承诺不调用 `preventDefault()` |
| `options.signal` | 用 `AbortSignal` 控制监听器生命周期 |

### 事件对象核心属性

| 属性 | English term | 含义 |
|---|---|---|
| `event.type` | event type | 事件类型 |
| `event.target` | event target | 原始触发对象 |
| `event.currentTarget` | current target | 当前正在执行 listener 的对象 |
| `event.defaultPrevented` | default prevented flag | 默认行为是否已被阻止 |
| `event.eventPhase` | event phase | 当前传播阶段 |
| `event.bubbles` | bubbles flag | 是否冒泡 |
| `event.cancelable` | cancelable flag | 是否可取消默认行为 |

### 事件传播模型

```text
capture phase
  window -> document -> html -> body -> ancestors

target phase
  target element

bubble phase
  target -> ancestors -> body -> html -> document -> window
```

### `target` vs `currentTarget`

| 属性 | 指向 |
|---|---|
| `event.target` | 实际触发事件的元素 |
| `event.currentTarget` | 当前 listener 绑定的元素 |

事件委托中最常见：

```js
panelElement.addEventListener('click', (eventObject) => {
  const clickedElement = eventObject.target;

  if (!(clickedElement instanceof HTMLElement)) {
    return;
  }

  if (!clickedElement.matches('.action-button')) {
    return;
  }

  console.log(clickedElement.dataset.action);
});
```

### 事件委托（event delegation）

```text
Instead of binding listeners to many child elements,
bind one listener to a stable parent,
then inspect event.target.
```

适合：

```text
dynamic list
menu
table
dropdown
todo items
rendered collections
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 混淆 `target` 和 `currentTarget` | 一个是原始目标，一个是当前监听器所在对象 |
| `addEventListener('onclick', ...)` | 事件类型写 `'click'`，不是 `'onclick'` |
| 内联 `onclick` 和 JS 监听器混用 | 项目里优先 `addEventListener()` |
| 给动态列表每个子元素都绑定 | 优先事件委托 |
| 不保存 handler 引用导致无法移除 | `removeEventListener()` 需要同一个函数引用 |

---

## 7. 表单和默认行为

### 结论

表单（form）有浏览器原生提交机制。JavaScript 处理表单时，必须理解 input event、submit event、默认行为（default action）和 `FormData`。

### 表单事件

| 事件 | 触发时机 | 常用对象 |
|---|---|---|
| `input` | 输入值实时变化 | text input, textarea |
| `change` | 值提交性变化 | select, checkbox, blur 后的 input |
| `submit` | form 提交 | form |
| `reset` | form 重置 | form |
| `invalid` | 表单校验失败 | input / form controls |

### 默认行为

| 操作 | 浏览器默认行为 |
|---|---|
| 点击 submit button | 提交 form，可能刷新或导航 |
| 按 Enter | 可能触发表单提交 |
| 点击 checkbox | 切换 checked 状态 |
| 点击 link | 导航到 href |
| 拖拽 / 滚动 / 右键 | 有浏览器默认交互 |

阻止默认行为：

```js
formElement.addEventListener('submit', (eventObject) => {
  eventObject.preventDefault();
});
```

### `FormData`

| API | 作用 |
|---|---|
| `new FormData(formElement)` | 从表单控件收集字段 |
| `formData.get(name)` | 读取第一个字段值，缺失返回 `null` |
| `formData.getAll(name)` | 读取同名字段的所有值 |
| `formData.set(name, value)` | 设置字段，替换旧值 |
| `formData.append(name, value)` | 追加字段 |
| `formData.delete(name)` | 删除字段 |
| `formData.entries()` | 遍历 `[name, value]` |

### 关键规则

```text
FormData reads controls by name attribute.
id is for DOM query and label association.
name is for form data field.
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| input 只有 id 没有 name | `FormData` 不能按字段名读取 |
| 只监听 button click | 用户按 Enter 可能绕过 click handler |
| 忘记 `preventDefault()` | 页面可能刷新 / 导航 |
| 以为 `formData.get()` 一定返回 string | 可能返回 string、File 或 `null` |
| 把所有表单状态都塞进 DOM dataset | 表单值优先从控件和 `FormData` 管理 |

---

## 8. CSSOM、classList、computed style

### 结论

样式操作分三层：修改 inline style、切换 class、读取 computed style。真实项目优先用 class 表达状态。

### 三种样式接口

| 接口 | 所属对象 | 作用 | 是否推荐管理状态 |
|---|---|---|---|
| `element.style` | HTMLElement | 设置 / 读取 inline style | 少量动态值可用 |
| `element.classList` | Element | 添加、删除、切换 class | 推荐 |
| `getComputedStyle(element)` | Window | 读取最终计算样式 | 只读 |

### `classList` API

| API | 返回值 | 作用 |
|---|---|---|
| `classList.add(...tokens)` | `undefined` | 添加 class |
| `classList.remove(...tokens)` | `undefined` | 删除 class |
| `classList.toggle(token, force?)` | boolean | 切换 class，返回是否存在 |
| `classList.contains(token)` | boolean | 判断 class 是否存在 |
| `classList.replace(oldToken, newToken)` | boolean | 替换 class |

### `element.style` 规则

```js
statusCardElement.style.backgroundColor = 'lightyellow';
```

CSS 属性名转换：

| CSS | JS style property |
|---|---|
| `background-color` | `backgroundColor` |
| `font-weight` | `fontWeight` |
| `z-index` | `zIndex` |
| `border-radius` | `borderRadius` |

### `getComputedStyle()`

```js
const fontWeight = getComputedStyle(statusCardElement).fontWeight;
```

| 特点 | 说明 |
|---|---|
| 读取最终样式 | 综合 stylesheet、inline style、继承、默认样式 |
| 返回只读对象 | 不能靠改返回对象设置样式 |
| 可能触发布局计算 | 高频调用要谨慎 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 用 `element.style.color` 读取 stylesheet 里的 color | `element.style` 只表示 inline style |
| 用大量 inline style 管状态 | 应优先 class |
| 修改 `getComputedStyle()` 返回值 | 它是读取结果，不是 setter |
| 手拼 `className` 覆盖旧 class | 优先 `classList` |

---

## 9. 文档几何、尺寸和滚动

### 结论

几何 API 解决“元素在哪里、多大、页面滚到哪里”的问题。核心坐标通常相对 viewport，不是整个文档。

### 核心 API

| API / 属性 | 所属对象 | 返回值 / 类型 | 作用 |
|---|---|---|---|
| `element.getBoundingClientRect()` | Element | DOMRect | 元素相对 viewport 的位置和尺寸 |
| `window.scrollX` | Window | number | 水平滚动偏移 |
| `window.scrollY` | Window | number | 垂直滚动偏移 |
| `window.scrollTo(options)` | Window | `undefined` | 滚动窗口 |
| `element.scrollIntoView(options?)` | Element | `undefined` | 让元素进入视口 |
| `element.clientWidth` | Element | number | 内容区 + padding |
| `element.offsetWidth` | HTMLElement | number | border box 宽度 |
| `element.scrollHeight` | Element | number | 可滚动内容总高度 |

### `getBoundingClientRect()`

常见属性：

| 属性 | 含义 |
|---|---|
| `rect.top` | 元素顶部相对 viewport 顶部的距离 |
| `rect.left` | 元素左侧相对 viewport 左侧的距离 |
| `rect.width` | 元素 border box 宽度 |
| `rect.height` | 元素 border box 高度 |
| `rect.bottom` | 元素底部相对 viewport 顶部的距离 |
| `rect.right` | 元素右侧相对 viewport 左侧的距离 |

文档绝对坐标常见换算：

```js
const rect = targetElement.getBoundingClientRect();
const documentTop = rect.top + window.scrollY;
```

### `scrollIntoView()`

```js
targetElement.scrollIntoView({
  behavior: 'smooth',
  block: 'center',
});
```

| option | 常见值 | 说明 |
|---|---|---|
| `behavior` | `'auto'`, `'smooth'` | 滚动行为 |
| `block` | `'start'`, `'center'`, `'end'`, `'nearest'` | 垂直对齐 |
| `inline` | `'start'`, `'center'`, `'end'`, `'nearest'` | 水平对齐 |

### 性能注意

```text
write DOM
  -> read layout
  -> write DOM
  -> read layout
```

这种交替可能造成 layout thrashing。项目中应批量读、批量写。

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `rect.top` 是文档绝对坐标 | 它是相对 viewport |
| 页面滚动后 rect 不变 | rect 会随 viewport 变化 |
| CSS transform 不影响 rect | `getBoundingClientRect()` 会反映 transform 后的边界 |
| 频繁测量布局不会有成本 | 可能触发同步布局计算 |

---

## 10. Web Components

### 结论

Web Components 是浏览器原生组件模型，核心是 custom elements、shadow DOM、template。它让自定义标签成为浏览器可识别的元素类型。

### 核心概念

| 概念 | English term | 作用 |
|---|---|---|
| Custom Element | custom element | 自定义 HTML 元素 |
| Shadow DOM | shadow DOM | 组件内部隔离 DOM tree |
| Shadow Root | shadow root | shadow DOM 根节点 |
| Template | HTML template | 可复用但默认不渲染的 DOM 片段 |
| CustomElementRegistry | custom element registry | `customElements` 注册中心 |
| lifecycle callback | lifecycle callback | 元素生命周期方法 |

### custom element 基本写法

```js
class UserBadgeElement extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const wrapperElement = document.createElement('span');

    wrapperElement.textContent = 'User: Ada';
    shadowRoot.append(wrapperElement);
  }
}

customElements.define('user-badge', UserBadgeElement);
```

### 生命周期速查

| 方法 | 触发时机 |
|---|---|
| `constructor()` | 元素实例被创建 |
| `connectedCallback()` | 元素插入 document |
| `disconnectedCallback()` | 元素从 document 移除 |
| `attributeChangedCallback(name, oldValue, newValue)` | 观察的属性变化 |
| `static get observedAttributes()` | 声明要观察哪些属性 |

### Shadow DOM

```js
const shadowRoot = this.attachShadow({ mode: 'open' });
```

| mode | 说明 |
|---|---|
| `'open'` | 外部可以通过 `element.shadowRoot` 访问 |
| `'closed'` | 外部不能通过 `element.shadowRoot` 访问 |

### 常见规则

| 规则 | 说明 |
|---|---|
| custom element 名称必须包含 hyphen | 例如 `user-badge` |
| 不要在 constructor 里依赖完整 DOM | 初始化 DOM 通常放 `connectedCallback()` |
| shadow DOM 是封装边界 | 不是安全沙箱 |
| Web Components 与框架可共存 | 但事件、属性、children 分发规则要理解 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `customElements.define('badge', Badge)` | 名称必须有 hyphen |
| 以为 shadow DOM 完全防止外部影响 | 不是安全隔离 |
| 每次 connected 都重复 append | 需要避免重复初始化 |
| 以为 custom element 自动等同 React 组件 | 生命周期和数据模型不同 |

---

## 11. SVG

### 结论

SVG 是矢量图形 DOM。SVG 元素是 DOM element，可以被查询、设置属性、监听事件；但创建时必须理解 namespace。

### SVG vs HTML DOM

| 对比项 | SVG | HTML |
|---|---|---|
| 模型 | XML-based vector graphics | document structure |
| 元素创建 | `createElementNS()` | `createElement()` |
| 图形是否 DOM 节点 | 是 | 是 |
| 可否单独绑定事件 | 可以 | 可以 |
| 适合 | 图标、图表、路径、交互矢量 | 页面结构 |

### 创建 SVG 元素

```js
const svgNamespace = 'http://www.w3.org/2000/svg';

const svgElement = document.createElementNS(svgNamespace, 'svg');
const rectElement = document.createElementNS(svgNamespace, 'rect');

rectElement.setAttribute('x', '20');
rectElement.setAttribute('y', '40');
rectElement.setAttribute('width', '160');
rectElement.setAttribute('height', '40');

svgElement.append(rectElement);
```

### 常见属性

| 元素 | 常见属性 |
|---|---|
| `<svg>` | `width`, `height`, `viewBox` |
| `<rect>` | `x`, `y`, `width`, `height`, `fill` |
| `<circle>` | `cx`, `cy`, `r`, `fill` |
| `<path>` | `d`, `stroke`, `fill` |
| `<text>` | `x`, `y`, `font-size`, `text-anchor` |

### `viewBox`

```text
viewBox = "minX minY width height"
```

它定义 SVG 内部坐标系统，不等于 CSS 显示尺寸。

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 用 `createElement('svg')` 创建 SVG | 应使用 SVG namespace |
| 把 SVG 当 bitmap | SVG 是矢量 DOM |
| 不理解 `viewBox` | 它定义内部坐标系统 |
| 用 CSS width/height 后不懂比例变化 | 需要结合 viewBox 理解缩放 |

---

## 12. Canvas 2D

### 结论

Canvas 是位图绘图表面。DOM 中只有 `<canvas>` 一个元素，画出来的矩形、圆、文字不是 DOM 节点。

### Canvas vs SVG

| 对比项 | Canvas | SVG |
|---|---|---|
| 底层模型 | bitmap pixels | vector DOM elements |
| 图形能否被 DOM 查询 | 不能 | 能 |
| 单个图形能否直接绑定事件 | 不能，需要手动命中检测 | 可以 |
| 大量图形性能 | 大量像素绘制更适合 | 大量 DOM 节点可能重 |
| 适合 | 游戏、图像处理、复杂实时绘图 | 图标、图表、可交互矢量 |

### 基本流程

```js
const canvasElement = document.querySelector('#chart-canvas');
const drawingContext = canvasElement.getContext('2d');

if (drawingContext === null) {
  throw new Error('Canvas context is not available');
}

drawingContext.fillStyle = 'steelblue';
drawingContext.fillRect(40, 80, 60, 50);
```

### 2D Context 常用 API

| API / 属性 | 作用 |
|---|---|
| `canvas.getContext('2d')` | 获取 2D 绘图上下文 |
| `context.fillStyle` | 设置填充样式 |
| `context.strokeStyle` | 设置描边样式 |
| `context.fillRect(x, y, w, h)` | 绘制填充矩形 |
| `context.clearRect(x, y, w, h)` | 清除矩形区域 |
| `context.beginPath()` | 开始新路径 |
| `context.moveTo(x, y)` | 移动路径起点 |
| `context.lineTo(x, y)` | 添加线段 |
| `context.arc(x, y, r, start, end)` | 添加圆弧 |
| `context.fill()` | 填充当前路径 |
| `context.stroke()` | 描边当前路径 |
| `context.fillText(text, x, y)` | 绘制文本 |
| `context.drawImage(image, x, y)` | 绘制图像 |

### 尺寸规则

| 尺寸 | 说明 |
|---|---|
| HTML attributes `width` / `height` | 绘图缓冲区尺寸 |
| CSS `width` / `height` | 页面显示尺寸 |
| 两者不一致 | 可能导致缩放模糊 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 把 canvas 内图形当 DOM 元素 | 图形是像素 |
| 只用 CSS 设置 canvas 尺寸 | 可能导致模糊 |
| 忘记 `getContext()` 可能返回 `null` | 应防御 |
| 每次重绘不清空旧内容 | 需要 `clearRect()` 或重画背景 |

---

## 13. Web Audio API

### 结论

Web Audio API 的模型不是“播放一个文件”，而是 audio graph：音频源节点连接处理节点，最后连接到输出目标。

### 核心对象

| 对象 | English term | 作用 |
|---|---|---|
| `AudioContext` | audio context | 音频处理环境 |
| `AudioNode` | audio node | 音频图节点 |
| `OscillatorNode` | oscillator node | 生成波形的音频源 |
| `GainNode` | gain node | 控制音量 |
| `AudioDestinationNode` | audio destination | 输出设备目标 |

### 基本流程

```js
const audioContext = new AudioContext();
const oscillatorNode = audioContext.createOscillator();
const gainNode = audioContext.createGain();

oscillatorNode.frequency.value = 440;
gainNode.gain.value = 0.1;

oscillatorNode.connect(gainNode);
gainNode.connect(audioContext.destination);

oscillatorNode.start();
oscillatorNode.stop(audioContext.currentTime + 0.3);
```

### audio graph

```text
OscillatorNode
  -> GainNode
  -> AudioContext.destination
  -> speakers
```

### 常见规则

| 规则 | 说明 |
|---|---|
| 通常需要用户手势后启动音频 | 浏览器限制 autoplay |
| 音量要用 GainNode 控制 | 避免输出过大 |
| `currentTime` 是音频上下文时间 | 可用于精确调度 |
| Audio API 和 `<audio>` 不同 | 前者是音频处理图，后者是媒体元素 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 页面加载后自动播放 | 浏览器可能阻止 |
| 不控制 gain | 音量可能过大 |
| 以为 Web Audio 只是 `<audio>` | 它是 audio graph |
| 每次点击创建大量 context 不管理 | 应注意生命周期 |

---

## 14. Location、History 和导航状态

### Location

| API / 属性 | 作用 |
|---|---|
| `location.href` | 当前完整 URL，赋值会导航 |
| `location.origin` | 协议 + 主机 + 端口 |
| `location.protocol` | 协议 |
| `location.host` | 主机名 + 端口 |
| `location.hostname` | 主机名 |
| `location.pathname` | 路径 |
| `location.search` | query string，包含 `?` |
| `location.hash` | fragment，包含 `#` |
| `location.assign(url)` | 导航到新 URL |
| `location.replace(url)` | 替换当前历史记录并导航 |
| `location.reload()` | 重新加载页面 |

### History API

| API / 事件 | 作用 |
|---|---|
| `history.pushState(state, unused, url?)` | 添加历史记录，不自动刷新 |
| `history.replaceState(state, unused, url?)` | 替换当前历史记录 |
| `history.back()` | 后退 |
| `history.forward()` | 前进 |
| `history.go(delta)` | 移动历史位置 |
| `window.addEventListener('popstate', handler)` | 用户前进后退时处理状态 |

### `pushState()` 关键点

```js
history.pushState({ routeName: 'settings' }, '', '?route=settings');
```

| 点 | 说明 |
|---|---|
| 不会自动重新加载页面 | 需要自己 render UI |
| 不会自动触发 `popstate` | 通常用户前进后退时触发 |
| URL 受同源限制 | 不能随便 push 到任意 origin |
| state object 可在 `popstate` 读取 | `event.state` |

### SPA routing 模型

```text
user clicks navigation
  -> prevent default link navigation if needed
  -> history.pushState(...)
  -> render current route

user clicks browser back
  -> popstate event fires
  -> read event.state or location
  -> render current route
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `pushState()` 会请求服务器 | 它只改变 session history 和地址栏 |
| `pushState()` 会自动更新页面 | 需要自己更新 UI |
| `popstate` 会在 push 时立刻触发 | 通常不会 |
| `location.href = ...` 和 `pushState()` 一样 | 前者会导航，后者不刷新页面 |

---

## 15. Fetch、Request、Response、AbortController

### 结论

`fetch()` 返回 Promise，Promise fulfilled value 是 `Response`，不是 JSON 数据本身。读取响应体还要调用 `response.json()`、`response.text()` 等方法。

### Fetch 基本流程

```js
const response = await fetch('/api/products');

if (!response.ok) {
  throw new Error(`HTTP status ${response.status}`);
}

const productList = await response.json();
```

### 关键对象

| 对象 | English term | 作用 |
|---|---|---|
| `fetch()` | fetch function | 发起请求，返回 Promise |
| `Request` | request object | 请求信息 |
| `Response` | response object | 响应状态、headers、body |
| `Headers` | headers object | 请求 / 响应头 |
| `AbortController` | abort controller | 取消操作 |
| `AbortSignal` | abort signal | 传入 fetch 的取消信号 |

### `fetch(input, init?)`

| 参数 | 说明 |
|---|---|
| `input` | URL string 或 Request |
| `init.method` | HTTP method |
| `init.headers` | request headers |
| `init.body` | request body |
| `init.signal` | AbortSignal |
| `init.credentials` | cookie / credential 发送策略 |
| `init.mode` | CORS mode |

### Response 速查

| API / 属性 | 返回值 | 说明 |
|---|---|---|
| `response.ok` | boolean | status 是否 200-299 |
| `response.status` | number | HTTP status code |
| `response.statusText` | string | status text |
| `response.headers` | Headers | 响应头 |
| `response.url` | string | 最终 URL |
| `response.json()` | Promise | 解析 JSON body |
| `response.text()` | Promise | 读取文本 body |
| `response.blob()` | Promise | 读取 Blob |
| `response.arrayBuffer()` | Promise | 读取二进制 buffer |

### AbortController

```js
const controller = new AbortController();

const responsePromise = fetch('/api/products', {
  signal: controller.signal,
});

controller.abort();
```

取消后通常会得到 `AbortError`。

### 重要机制

```text
fetch promise
  -> resolves when response headers are available
  -> does not reject just because HTTP status is 404 or 500
  -> rejects for network error, CORS failure, abort, etc.

response.json()
  -> consumes response body stream
  -> returns another Promise
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `fetch()` 直接返回 JSON | 返回 Promise，成功值是 Response |
| 忘记检查 `response.ok` | 404/500 也可能 fulfilled |
| 多次读取 body | body stream 通常只能消费一次 |
| 混淆 HTTP error 和 network error | HTTP 失败要自己检查 status |
| 忽略 CORS | 浏览器跨源请求受 CORS 限制 |
| 取消请求只改变量 | 应用 AbortController |

---

## 16. Web Storage、Cookie、IndexedDB

### 结论

浏览器存储不是一种东西。`localStorage` / `sessionStorage` 是同步字符串键值存储；Cookie 参与 HTTP；IndexedDB 是异步结构化数据库。

### Web Storage

| API | 作用 | 生命周期 |
|---|---|---|
| `localStorage` | 持久同源字符串键值存储 | 关闭浏览器后仍保留 |
| `sessionStorage` | tab 会话级字符串键值存储 | 当前 tab 会话 |

### Storage API

| 方法 / 属性 | 返回值 | 说明 |
|---|---|---|
| `storage.setItem(key, value)` | `undefined` | 保存字符串 |
| `storage.getItem(key)` | string 或 `null` | 读取 |
| `storage.removeItem(key)` | `undefined` | 删除 |
| `storage.clear()` | `undefined` | 清空 |
| `storage.key(index)` | string 或 `null` | 按索引读 key |
| `storage.length` | number | 条目数量 |

### 保存对象的正确流程

```js
const settingsRecord = {
  themeMode: 'dark',
  pageSize: 20,
};

localStorage.setItem('settings', JSON.stringify(settingsRecord));

const settingsText = localStorage.getItem('settings');

if (settingsText !== null) {
  const restoredSettings = JSON.parse(settingsText);
  console.log(restoredSettings.themeMode);
}
```

### Cookie vs localStorage

| 对比项 | Cookie | localStorage |
|---|---|---|
| 是否随 HTTP 请求发送 | 是，匹配域和路径时发送 | 否 |
| 主要用途 | 会话、服务端识别、少量状态 | 客户端 UI 状态 |
| 容量 | 较小 | 较大但有限 |
| 安全属性 | `HttpOnly`, `Secure`, `SameSite` | 没有 HttpOnly |
| JS 是否总能读 | HttpOnly cookie 不能被 JS 读 | JS 可读写 |
| 适合存 token 吗 | 敏感 token 应谨慎，常用 HttpOnly Cookie | 不适合存敏感数据 |

### IndexedDB

| 特点 | 说明 |
|---|---|
| 异步 | 不阻塞主线程 |
| 结构化数据 | 可存对象、索引、事务 |
| 容量更大 | 适合离线数据、缓存、大量结构化数据 |
| API 较复杂 | 常用封装库或更高层工具 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| `localStorage.setItem('x', object)` | 会保存成 `"[object Object]"` |
| 把 localStorage 当安全存储 | 不要保存密码、敏感 token |
| 以为 localStorage 是异步 | 它是同步 API |
| Cookie 和 localStorage 都会随请求发送 | 只有 Cookie 会 |
| IndexedDB 和 localStorage 一样简单 | IndexedDB 是异步数据库模型 |

---

## 17. Worker 和消息传递

### 结论

Worker 把脚本放到后台线程执行，避免重计算阻塞主线程。Worker 不能直接操作 DOM，只能通过消息传递（message passing）和主线程通信。

### Worker 类型

| 类型 | 说明 |
|---|---|
| Dedicated Worker | 一个页面 / 脚本专用 |
| Shared Worker | 多个上下文共享 |
| Service Worker | 网络代理、缓存、离线能力，模型更复杂 |
| Module Worker | 用 `{ type: 'module' }` 加载 ESM worker |

### Dedicated Worker 基本流程

主线程：

```js
const calculationWorker = new Worker('./primeWorker.js', {
  type: 'module',
});

calculationWorker.addEventListener('message', (eventObject) => {
  console.log(eventObject.data);
});

calculationWorker.postMessage({ maxNumber: 20000 });
```

Worker 文件：

```js
self.addEventListener('message', (eventObject) => {
  const { maxNumber } = eventObject.data;
  self.postMessage({ maxNumber });
});
```

### 核心 API

| API | 所属位置 | 作用 |
|---|---|---|
| `new Worker(url, options?)` | 主线程 | 创建 worker |
| `worker.postMessage(value)` | 主线程 | 向 worker 发送消息 |
| `worker.addEventListener('message', handler)` | 主线程 | 接收 worker 消息 |
| `self.addEventListener('message', handler)` | Worker | 接收主线程消息 |
| `self.postMessage(value)` | Worker | 向主线程发送消息 |
| `worker.terminate()` | 主线程 | 终止 worker |

### Worker 全局环境

| 主线程 | Worker |
|---|---|
| 有 `window` | 没有 `window` |
| 有 `document` | 没有 `document` |
| 可操作 DOM | 不能操作 DOM |
| 可创建 Worker | 可用部分 Web API |
| UI 线程 | 后台线程 |

### 消息传递机制

```text
main thread object
  -> postMessage
  -> structured clone
  -> worker receives copied data
```

不是共享普通对象引用。大对象或二进制数据可以考虑 transferable objects。

### 常见错误

| 错误 | 正确模型 |
|---|---|
| Worker 中访问 `document` | Worker 没有 DOM |
| 以为 postMessage 传引用 | 默认结构化克隆 |
| 直接 `file://` 运行 Worker | 通常需要本地服务器 |
| 忘记终止一次性 Worker | 用完可以 `terminate()` |
| 主线程大量计算再把结果给 Worker | 应把重计算放 Worker 内 |

---

## 18. 综合项目 API 组合模型

### Web API 小项目的典型数据流

```text
User clicks button
  -> event listener runs
  -> DOM status shows loading
  -> fetch starts network request
  -> response.json parses body
  -> worker receives text
  -> worker calculates summary
  -> canvas renders chart
  -> localStorage saves state
  -> history.pushState updates URL
  -> DOM shows final result
```

### API 分工

| 项目任务 | 使用 API |
|---|---|
| 找按钮和输出区域 | `document.querySelector()` |
| 响应点击 | `addEventListener('click', ...)` |
| 加载远程数据 | `fetch()` |
| 解析 JSON | `response.json()` |
| 保存 UI 状态 | `localStorage.setItem()` |
| 恢复 UI 状态 | `localStorage.getItem()` + `JSON.parse()` |
| 更新地址栏 | `history.pushState()` |
| 绘制图表 | `canvas.getContext('2d')` |
| 后台计算 | `Worker` + `postMessage()` |
| 组织浏览器代码 | ES module + `type="module"` |

### 推荐工程拆分

```text
main.js
  -> reads DOM
  -> binds events
  -> orchestrates modules

modules/apiClient.js
  -> fetch
  -> response validation

modules/storageStore.js
  -> localStorage
  -> JSON parse/stringify

modules/router.js
  -> history
  -> route state

modules/chartRenderer.js
  -> canvas drawing

modules/taskWorkerClient.js
  -> worker lifecycle
  -> Promise wrapper

workers/summaryWorker.js
  -> heavy calculation
  -> self.postMessage
```

### 判断原则

```text
DOM module manages document objects.
Network module manages request and response.
Storage module manages persistence.
Router module manages URL and history state.
Renderer module manages pixels or UI updates.
Worker module manages background computation.
```

---

## 19. 同步 / 异步 / 会触发布局的 API 对照

### 同步 API

| API | 说明 |
|---|---|
| `document.querySelector()` | 同步查询 DOM |
| `document.createElement()` | 同步创建元素 |
| `element.append()` | 同步修改 DOM tree |
| `element.classList.add()` | 同步修改 class |
| `localStorage.getItem()` | 同步读取 |
| `localStorage.setItem()` | 同步写入 |
| `history.pushState()` | 同步更新 history entry |
| `canvas.getContext('2d')` | 同步获取上下文 |
| `context.fillRect()` | 同步提交绘图命令 |

### 异步 / 未来回调 API

| API | 异步点 |
|---|---|
| `fetch()` | 返回 Promise |
| `response.json()` | 返回 Promise |
| `addEventListener()` | 注册未来事件 callback |
| `setTimeout()` | 注册未来 timer callback |
| `Worker.postMessage()` | 消息异步到达另一线程 |
| `AudioContext` 播放 | 音频按 audio clock 调度 |
| IndexedDB | 异步数据库操作 |

### 可能触发布局计算的读取

| API / 属性 | 原因 |
|---|---|
| `getBoundingClientRect()` | 需要最新布局数据 |
| `getComputedStyle()` | 可能需要最新样式计算 |
| `offsetWidth` / `offsetHeight` | 读取 layout 尺寸 |
| `clientWidth` / `clientHeight` | 读取盒模型尺寸 |
| `scrollTop` / `scrollY` | 读取滚动状态 |

### 可能引起重新渲染的写入

| 操作 | 影响 |
|---|---|
| 修改 DOM 结构 | 可能影响 style/layout/paint |
| 修改 class | 可能影响 style/layout/paint |
| 修改 inline style | 可能影响 style/layout/paint |
| 改变 canvas 像素 | 影响 canvas 绘制结果 |
| 滚动页面 | 改变 viewport 状态 |

---

## 20. 同名方法和相似 API 对照

### `set()` 系列

| API | 所属对象 | 作用 | 返回值 |
|---|---|---|---|
| `Map.prototype.set(key, value)` | Map | 设置 key-value entry | Map |
| `URLSearchParams.prototype.set(name, value)` | URLSearchParams | 设置 query 参数，替换同名旧值 | `undefined` |
| `FormData.prototype.set(name, value)` | FormData | 设置表单字段，替换同名旧值 | `undefined` |
| `Headers.prototype.set(name, value)` | Headers | 设置 header | `undefined` |

### `get()` 系列

| API | 缺失时返回 | 说明 |
|---|---|---|
| `Map.prototype.get(key)` | `undefined` | key 可能存在但 value 是 `undefined` |
| `URLSearchParams.prototype.get(name)` | `null` | query 参数缺失 |
| `FormData.prototype.get(name)` | `null` | 表单字段缺失 |
| `localStorage.getItem(key)` | `null` | storage key 缺失 |
| `element.getAttribute(name)` | `null` | attribute 缺失 |

### DOM 文本 / HTML

| API | 解析 HTML | 是否包含隐藏元素文本 | 用途 |
|---|---|---|---|
| `textContent` | 否 | 通常包含 | 安全设置文本 |
| `innerHTML` | 是 | N/A | 设置可信 HTML |
| `innerText` | 否 | 受渲染样式影响 | 用户可见文本近似 |

### NodeList / Array

| 能力 | NodeList | Array |
|---|---|---|
| `for...of` | 可以 | 可以 |
| `length` | 有 | 有 |
| `map()` | 不一定 | 有 |
| `filter()` | 不一定 | 有 |
| 转换方式 | `Array.from(nodeList)` | 已经是数组 |

### SVG vs Canvas

| 问题 | SVG | Canvas |
|---|---|---|
| 图形是否 DOM 节点 | 是 | 否 |
| 是否适合大量动态像素 | 一般不如 Canvas | 适合 |
| 是否适合可访问图形结构 | 适合 | 需要额外处理 |
| 事件绑定 | 可直接绑元素 | 需要手动命中检测 |

---

## 21. 高频错误总表

| 错误 | 正确模型 |
|---|---|
| 把 Web API 当 ECMAScript core | Web API 来自浏览器宿主环境 |
| 在 Node 里直接用 `document` | Node 没有 DOM |
| 用 `file://` 跑模块 / Worker | 用本地服务器 |
| `querySelector()` 查不到还直接操作 | 先处理 `null` |
| 把 NodeList 当完整 Array | 必要时 `Array.from()` |
| 用 `innerHTML` 插入用户输入 | 优先 `textContent` |
| 混淆 `target` 和 `currentTarget` | 事件委托必须分清 |
| 忘记 `preventDefault()` | 表单可能刷新 |
| input 没有 `name` | `FormData` 读不到 |
| 用 `style` 读取 stylesheet 样式 | 用 `getComputedStyle()` |
| 把 `rect.top` 当文档坐标 | 它相对 viewport |
| custom element 名称没有 hyphen | 必须包含 hyphen |
| SVG 用 `createElement()` | 用 `createElementNS()` |
| Canvas 内图形当 DOM 节点 | Canvas 画的是像素 |
| 页面加载自动播放音频 | 浏览器可能阻止 autoplay |
| `pushState()` 后期待页面自动变 | 需要自己 render |
| `fetch()` 后直接拿 JSON | 还要 `await response.json()` |
| 忘记检查 `response.ok` | HTTP 404/500 不一定 reject |
| 直接保存对象到 localStorage | 需要 `JSON.stringify()` |
| 把 localStorage 当安全存储 | 不存敏感数据 |
| Worker 里访问 DOM | Worker 不能访问 `document` |
| 以为 postMessage 传引用 | 默认结构化克隆 |

---

## 22. 最终记忆模型

### 一句话总模型

```text
Web APIs are the browser-provided bridge between JavaScript code and the real browser environment.
```

### 分层记忆

```text
Browser environment:
window, document, navigator, location, history

Document structure:
DOM, Node, Element, querySelector, createElement, append

User interaction:
EventTarget, addEventListener, event object, propagation, preventDefault

Form input:
input event, submit event, FormData, default behavior

Styling:
CSSOM, style, classList, getComputedStyle

Layout and scrolling:
getBoundingClientRect, scrollY, scrollIntoView

Native components:
customElements, HTMLElement, shadow DOM

Graphics:
SVG is vector DOM.
Canvas is bitmap pixels.

Audio:
AudioContext builds an audio graph.

Navigation:
location navigates.
history manages session history state.

Network:
fetch returns Promise<Response>.
Response body readers return Promise<data>.

Storage:
localStorage stores strings synchronously.
Cookie participates in HTTP.
IndexedDB stores structured data asynchronously.

Workers:
Worker runs code off the main thread.
Messages cross threads through postMessage.
DOM stays on the main thread.
```

### 最终判断框架

遇到任何 Web API，按这个顺序判断：

```text
1. Is it ECMAScript core or browser host API?
2. Which browser object owns it?
3. Does it read state, write state, register future work, or start async work?
4. Is the result immediate value, Promise, event, stream, or DOM object?
5. Does it mutate DOM, CSSOM, storage, history, canvas pixels, or worker state?
6. What is the default browser behavior?
7. What is the common failure mode?
```

### 前端工程落点

```text
React teaches component state and rendering abstraction.
Web APIs teach what the browser actually exposes and executes.
A serious front-end developer must understand both layers.
