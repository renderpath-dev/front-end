# JavaScript 工具和扩展（JSX）Cheatsheet

> 适用范围：JavaScript 工具链、npm、ESLint、Prettier、Jest、bundling、Babel、JSX、Flow。  
> 目标：把第 17 章从“工具名字清单”压缩成工程判断表。  
> 核心原则：先判断这个工具解决什么工程问题，再记命令和配置。

---

## 0. 总结论

第 17 章不是继续学 JavaScript 语法，而是进入现代前端工程链路。

```txt
source code
  -> package manager
  -> lint
  -> format
  -> test
  -> transform
  -> bundle
  -> browser runtime
```

你要建立的判断模型是：

| 问题 | 工具 |
|---|---|
| 项目如何安装依赖和运行命令 | npm / package.json |
| 代码模式有没有潜在问题 | ESLint |
| 代码排版是否统一 | Prettier |
| 函数行为是否自动验证 | Jest |
| 多个模块如何变成浏览器产物 | Bundler / Vite |
| 新语法或 JSX 如何变成可运行 JS | Babel |
| UI 结构如何写进 JS | JSX |
| JS 如何加入静态类型检查扩展 | Flow / TypeScript |

---

## 1. 工具链总模型

### 结论

工具链（toolchain）是从“你写的源代码”到“浏览器或 Node 能运行的产物”的处理流水线。

### 技术意义

浏览器和 Node 最终执行的是 JavaScript，但现代项目中的源代码可能包含：

```txt
ES Module
JSX
Type annotations
CSS imports
asset imports
environment variables
test files
lint rules
formatting rules
```

这些内容通常需要工具处理。

### 底层机制

```txt
source files
  -> parsed into AST
  -> analyzed or transformed
  -> dependency graph is built
  -> build output is generated
```

### 关键区分

| 名称 | 发生什么 | 是否运行业务代码 |
|---|---|---|
| lint | 分析代码结构和规则 | 否 |
| format | 重新打印代码文本 | 否 |
| test | 执行测试用例 | 是 |
| transform | 把一种语法转成另一种语法 | 否 |
| bundle | 分析 import 图并生成产物 | 部分工具会执行构建逻辑，不执行业务 UI |

### 常见误区

| 错误理解 | 正确模型 |
|---|---|
| 工具链只是多几个命令 | 工具链定义代码进入运行环境前的处理流程。 |
| 浏览器直接运行我写的所有源文件 | 真实项目常运行打包和转换后的产物。 |
| ESLint、Prettier、Babel 都是“检查工具” | 三者职责完全不同。 |

---

## 2. npm 和 package.json

### 结论

npm 是包管理器（package manager）和项目命令入口；`package.json` 是项目工程配置中心。

### package.json 核心字段

| 字段 | 作用 |
|---|---|
| `name` | 包或项目名称 |
| `version` | 版本号 |
| `private` | 防止误发布到 npm registry |
| `type` | 控制 `.js` 默认按 ESM 还是 CommonJS 解析 |
| `scripts` | 项目命令入口 |
| `dependencies` | 生产运行依赖 |
| `devDependencies` | 开发阶段依赖 |
| `main` | CommonJS 包入口 |
| `exports` | 现代包导出边界 |
| `engines` | 声明 Node/npm 版本要求 |

### dependencies 和 devDependencies

| 依赖类型 | 典型内容 | 是否进入生产运行 |
|---|---|---|
| `dependencies` | react, react-dom, axios | 是 |
| `devDependencies` | eslint, prettier, jest, vite, babel | 通常否 |

判断规则：

```txt
应用运行时需要它 -> dependencies
开发、测试、构建阶段需要它 -> devDependencies
```

### scripts 是项目命令入口

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint src",
    "format": "prettier --write src",
    "test": "jest"
  }
}
```

运行方式：

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run test
```

### 机制

```txt
npm run lint
  -> npm reads package.json
  -> finds scripts.lint
  -> executes eslint src
  -> local node_modules/.bin is available
```

### 常见错误

| 错误 | 原因 |
|---|---|
| 在 `package.json` 写注释 | JSON 不支持注释。 |
| 用单引号写 JSON 字符串 | JSON 字符串必须用双引号。 |
| 把开发工具放进 dependencies | 会污染生产依赖。 |
| 直接运行全局命令，忽略项目版本 | 优先通过 npm scripts 使用本地依赖。 |
| 不设置 `private: true` | 练习项目可能被误发布。 |

---

## 3. ESLint：代码检查

### 结论

ESLint 是 linter。它通过静态分析（static analysis）发现潜在 bug、不一致代码模式和规则违反。

### ESLint 解决的问题

```txt
undefined variable
unused variable
unsafe patterns
bad imports
wrong hooks usage
team-specific code rules
```

ESLint 不负责“把代码排得漂亮”，那是 Prettier 的职责。

### Flat config 基础形状

```js
// Goal:
// Configure ESLint with recommended JavaScript rules.

import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
      },
    },
  },
];
```

### 运行命令

```bash
npm install --save-dev eslint @eslint/js
npm run lint
```

对应脚本：

```json
{
  "scripts": {
    "lint": "eslint src"
  }
}
```

### 底层机制

```txt
ESLint reads config
  -> parses source code into AST
  -> applies rules to AST
  -> reports rule violations
```

### ESLint 和运行时错误的区别

| 类型 | 例子 | 发现时间 |
|---|---|---|
| lint error | 未声明变量、未使用变量 | 运行前 |
| syntax error | 括号没闭合 | 解析时 |
| runtime error | `null.name` | 运行时 |
| logic error | 税率算错 | 通常要测试发现 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 把 ESLint 当 Prettier | ESLint 管代码质量和规则，Prettier 管格式。 |
| 以为 ESLint 会发现所有业务错误 | ESLint 不能理解所有业务语义。 |
| 忽略 `sourceType: 'module'` | ESM 文件需要按模块解析。 |
| 以为规则越多越专业 | 规则应该服务团队质量，不是制造噪音。 |

---

## 4. Prettier：代码格式化

### 结论

Prettier 是 formatter。它负责统一代码排版，不负责判断业务逻辑是否正确。

### Prettier 解决的问题

```txt
indentation
line breaks
quotes
semicolons
trailing commas
print width
```

### 配置示例

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 80
}
```

### package.json 脚本

```json
{
  "scripts": {
    "format": "prettier --write src",
    "format:check": "prettier --check src"
  }
}
```

### 运行命令

```bash
npm install --save-dev prettier
npm run format:check
npm run format
```

### 底层机制

```txt
Prettier parses source code
  -> discards original formatting
  -> prints code using its own rules
  -> writes formatted output
```

### Prettier 和 ESLint 分工

| 工具 | 主要职责 | 是否应该争夺格式 |
|---|---|---|
| ESLint | 静态规则和潜在问题 | 否 |
| Prettier | 代码排版 | 是 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 和 Prettier 手动对抗 | 项目用了 Prettier，就让它决定格式。 |
| 用 ESLint 修所有换行缩进 | 格式问题交给 Prettier。 |
| `--check` 后以为会自动改文件 | `--check` 只检查，`--write` 才写回。 |
| 认为格式化能修逻辑 bug | formatter 不理解业务正确性。 |

---

## 5. Jest：单元测试

### 结论

Jest 是测试运行器和测试框架。它通过自动化测试验证代码行为，防止重构后悄悄破坏功能。

### 核心概念

| 名称 | 含义 |
|---|---|
| test case | 一个测试用例 |
| assertion | 对实际结果做断言 |
| matcher | Jest 提供的比较方法 |
| test runner | 搜索并执行测试文件的工具 |
| unit test | 测试一个小的函数或模块 |

### CommonJS 示例

```js
// Goal:
// Export calculation functions for Jest tests.

function calculateCartSubtotal(cartItems) {
  return cartItems.reduce((runningTotal, cartItem) => {
    return runningTotal + cartItem.priceAmount * cartItem.quantityCount;
  }, 0);
}

module.exports = {
  calculateCartSubtotal,
};
```

```js
// Goal:
// Verify cart calculation behavior with Jest.

const { calculateCartSubtotal } = require('./cartMath.cjs');

test('calculates cart subtotal from multiple items', () => {
  const cartItems = [
    { priceAmount: 20, quantityCount: 2 },
    { priceAmount: 15, quantityCount: 3 },
  ];

  expect(calculateCartSubtotal(cartItems)).toBe(85);
});
```

### package.json 脚本

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### 执行机制

```txt
Jest starts
  -> finds test files
  -> loads test modules
  -> registers test cases
  -> runs assertions
  -> reports pass/fail
```

### 常见 matcher

| Matcher | 用途 |
|---|---|
| `toBe()` | 比较原始值或引用是否相同 |
| `toEqual()` | 深度比较对象或数组结构 |
| `toContain()` | 检查数组或字符串包含项 |
| `toThrow()` | 检查函数是否抛错 |
| `resolves` | 检查 Promise 成功结果 |
| `rejects` | 检查 Promise 失败结果 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 只测试 happy path | 还要测空值、边界、错误输入。 |
| 把测试写成 console.log | 测试必须有断言。 |
| 混淆 `toBe` 和 `toEqual` | 对象结构比较用 `toEqual`。 |
| 不理解 `.cjs` | Jest 基础配置常用 CommonJS，后续可再配置 ESM。 |

---

## 6. Bundling：代码打包

### 结论

打包（bundling）把模块依赖图（dependency graph）处理成浏览器可加载和部署的产物。

### Bundler 解决的问题

```txt
module graph
browser compatibility
asset handling
code splitting
minification
development server
hot module replacement
production build
```

### Vite 项目基本结构

```txt
index.html
src/
  main.js
  App.jsx
  components/
```

### Vite 脚本

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 执行机制

```txt
dev mode:
index.html
  -> module entry
  -> native ESM in browser
  -> fast transforms
  -> HMR

build mode:
entry
  -> dependency graph
  -> transform
  -> optimize
  -> dist output
```

### 关键术语

| 术语 | 解释 |
|---|---|
| entry | 打包入口 |
| dependency graph | import 形成的模块依赖图 |
| output | 构建产物 |
| dev server | 开发服务器 |
| HMR | 局部热更新 |
| code splitting | 按需拆分产物 |
| tree shaking | 移除未使用导出 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 打包就是拼接文件 | 打包包含解析、转换、依赖图、优化和输出。 |
| `npm run dev` 等于生产构建 | dev 是开发服务器，build 才生成部署产物。 |
| 以为 `dist` 是源码 | `dist` 是构建产物，通常不手写。 |
| 忽略入口文件 | bundler 从 entry 建立依赖图。 |

---

## 7. Babel：转译

### 结论

Babel 是转译器（transpiler / compiler）。它把现代 JavaScript 或扩展语法转换成目标环境能理解的 JavaScript。

### Babel 解决的问题

```txt
modern syntax transform
JSX transform
experimental syntax transform
library build compatibility
source maps for debugging
```

### Babel 不等于 polyfill

| 能力 | Babel |
|---|---|
| 转换语法 | 是 |
| 自动实现所有缺失 API | 否 |
| 转换 JSX | 是 |
| 管理模块依赖图 | 不是主要职责 |

例子：

```txt
optional chaining syntax -> Babel can transform
Promise API missing in old environment -> needs polyfill/runtime support
```

### 配置示例

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.5%, not dead"
      }
    ]
  ]
}
```

### React JSX 配置

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ]
  ]
}
```

### 执行机制

```txt
Babel reads source
  -> parses to AST
  -> applies plugins/presets
  -> generates JavaScript output
  -> optionally creates source map
```

### plugin 和 preset

| 名称 | 含义 |
|---|---|
| plugin | 处理单项转换能力 |
| preset | 一组插件集合 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| Babel 能让所有新 API 在旧环境可用 | API 需要 polyfill 或运行时支持。 |
| Babel 和 bundler 是一回事 | Babel 转换语法，bundler 处理依赖图和产物。 |
| 以为 JSX 可直接运行 | JSX 必须被 Babel 或构建工具转换。 |
| 忘记 source maps | 调试转换后代码会更困难。 |

---

## 8. JSX 的本质

### 结论

JSX 不是 HTML。JSX 是 JavaScript 的语法扩展（syntax extension），用 HTML-like markup 描述 UI tree，运行前必须转换成普通 JavaScript。

### 精确模型

```txt
JSX source
  -> parser
  -> AST
  -> JSX transform
  -> JavaScript function calls
  -> UI library consumes result
```

### JSX 和 HTML 的区别

| 对比点 | HTML | JSX |
|---|---|---|
| 谁解析 | 浏览器 HTML parser | Babel / bundler parser |
| 本质 | 标记文档 | JavaScript expression |
| 属性名 | `class`, `for` | `className`, `htmlFor` |
| 插值 | 不支持 JS 表达式 | `{expression}` |
| 运行前是否转换 | 不需要 | 需要 |
| 结果 | DOM tree | React element / runtime calls |

### Classic runtime

JSX 可能转换成：

```js
// Goal:
// Show the classic JSX runtime shape.

const elementNode = React.createElement('h1', null, 'Hello');
```

### Automatic runtime

现代 React 常转换成类似：

```js
// Goal:
// Show the automatic JSX runtime shape.

import { jsx as _jsx } from 'react/jsx-runtime';

const elementNode = _jsx('h1', {
  children: 'Hello',
});
```

### 常见错误

| 错误说法 | 更准确说法 |
|---|---|
| JSX 就是 HTML | JSX 是 HTML-like syntax inside JavaScript。 |
| JSX 可以直接被 JS 引擎运行 | JS 引擎不能直接解析 JSX。 |
| JSX 最终一定是 DOM | React 先得到 React element，再由 renderer 更新 DOM。 |
| JSX 只能返回字符串 | JSX 表达式产生 UI 描述值。 |

---

## 9. JSX 表达式、props、children

### 结论

JSX 是表达式。它可以赋值、返回、作为参数传递。JSX 的 `{}` 用来回到 JavaScript 表达式环境。

### 核心规则

| JSX 位置 | 含义 |
|---|---|
| `<section />` | 创建一个 UI 节点描述 |
| `className="card"` | 字符串 prop |
| `data-active={isActive}` | JavaScript 表达式 prop |
| `<h2>{titleText}</h2>` | 表达式作为 children |
| `<Card>Content</Card>` | Content 成为 children |
| `{condition && <Panel />}` | 条件表达式控制 UI |
| `{items.map(...)}` | 数组表达式产生多个 children |

### 示例

```jsx
// Goal:
// Verify expressions, props, and children in JSX.

const productName = 'Mechanical Keyboard';
const stockCount = 12;
const isAvailable = stockCount > 0;

const productBadgeElement = (
  <section className="product-badge" data-available={isAvailable}>
    <h2>{productName}</h2>
    <p>{stockCount} items available</p>
  </section>
);

console.log(productBadgeElement);
```

### `{}` 里面能写什么

可以写 JavaScript 表达式：

```txt
variable
function call
ternary expression
logical expression
array.map(...)
object property access
```

不能直接写语句：

```jsx
// Goal:
// Show invalid JSX expression usage.

const elementNode = (
  <section>
    {if (true) {
      'active';
    }}
  </section>
);
```

正确做法：

```jsx
// Goal:
// Use an expression inside JSX.

const elementNode = <section>{true ? 'active' : 'inactive'}</section>;
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 在 JSX `{}` 里写 `if` 语句 | `{}` 里需要 expression。 |
| 写 `class` | React JSX 通常写 `className`。 |
| 写 `for` | label 关联通常写 `htmlFor`。 |
| 以为 props 是 HTML attribute | 对组件来说，props 是函数参数对象。 |
| 以为 children 是特殊语法糖而非数据 | children 会进入 props。 |

---

## 10. JSX 组件和组合

### 结论

组件（component）是返回 UI 描述的函数。JSX 让组件可以像标签一样组合。

### 函数组件模型

```jsx
// Goal:
// Define a small reusable UI component.

export function StatusPill({ isOnline }) {
  return <span>{isOnline ? 'Online' : 'Offline'}</span>;
}
```

技术上：

```txt
<StatusPill isOnline={true} />
  -> creates a component element
  -> props object contains isOnline
  -> renderer calls StatusPill(props)
  -> component returns child UI
```

### 组件名必须大写开头

| JSX 标签 | React 解释 |
|---|---|
| `<div />` | 内置 DOM element |
| `<section />` | 内置 DOM element |
| `<ProfileSummary />` | 自定义组件 |
| `<profileSummary />` | 小写 DOM-like tag，不是组件函数 |

### 组件组合示例

```jsx
// Goal:
// Compose a profile summary from props and another component.

import { StatusPill } from './StatusPill.jsx';

export function ProfileSummary({ displayName, isOnline }) {
  return (
    <article>
      <h2>{displayName}</h2>
      <StatusPill isOnline={isOnline} />
    </article>
  );
}
```

### 组件边界

| 概念 | 说明 |
|---|---|
| props | 父组件传给子组件的数据 |
| children | 标签内部的子内容 |
| composition | 用小组件组装大 UI |
| render | 根据数据生成 UI 描述 |
| state | 组件内部可变化数据，React 章再系统学 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 组件名小写 | 自定义组件大写开头。 |
| 在组件里直接修改 props | props 是输入，不应该被子组件修改。 |
| 组件函数不返回 JSX 或 null | 组件必须返回可渲染值。 |
| 一个组件做所有事情 | 通过组合拆分 UI。 |

---

## 11. JSX 条件渲染

### 结论

JSX 条件渲染本质上是用 JavaScript 表达式决定某段 UI 描述是否出现。

### 常见写法

| 写法 | 适合场景 |
|---|---|
| `condition && <Panel />` | 条件为真才显示 |
| `condition ? <A /> : <B />` | 二选一 |
| 提前 `return null` | 整个组件不渲染 |
| 先定义变量再插入 JSX | 条件逻辑较复杂 |

### `&&` 写法

```jsx
// Goal:
// Render a message only when a condition is true.

export function NotificationBadge({ unreadTotal }) {
  return (
    <section>
      <h2>Notifications</h2>
      {unreadTotal > 0 && <p>{unreadTotal} unread messages</p>}
    </section>
  );
}
```

### 三元表达式

```jsx
// Goal:
// Render one of two branches.

export function ConnectionStatus({ isOnline }) {
  return <p>{isOnline ? 'Online' : 'Offline'}</p>;
}
```

### 常见错误：`0 &&`

```jsx
// Goal:
// Show why numeric zero can leak into JSX output.

export function MessageCount({ unreadTotal }) {
  return <section>{unreadTotal && <p>Unread</p>}</section>;
}
```

当 `unreadTotal` 是 `0` 时，表达式结果是 `0`，React 可能渲染 `0`。

更稳：

```jsx
// Goal:
// Use an explicit boolean condition.

export function MessageCount({ unreadTotal }) {
  return <section>{unreadTotal > 0 && <p>Unread</p>}</section>;
}
```

---

## 12. JSX 列表渲染和 key

### 结论

列表渲染（list rendering）本质是把数组映射成 JSX 元素数组。`key` 帮 React 识别每个列表项的稳定身份。

### 基本写法

```jsx
// Goal:
// Render a list with stable keys.

const notificationRecords = [
  { id: 1, messageText: 'Build completed' },
  { id: 2, messageText: 'Tests passed' },
];

export function NotificationList() {
  return (
    <ul>
      {notificationRecords.map((recordItem) => {
        return <li key={recordItem.id}>{recordItem.messageText}</li>;
      })}
    </ul>
  );
}
```

### key 的作用

```txt
key identifies an item across renders.
It helps the renderer match old and new children.
```

它不是给你的组件业务逻辑读取的普通 prop。

### index 作为 key 的问题

不推荐：

```jsx
// Goal:
// Show an unstable key pattern.

{notificationRecords.map((recordItem, indexValue) => {
  return <li key={indexValue}>{recordItem.messageText}</li>;
})}
```

当列表插入、删除、重排时，index 会变化，可能导致 UI 状态错位。

推荐：

```jsx
// Goal:
// Use a stable data identity as key.

{notificationRecords.map((recordItem) => {
  return <li key={recordItem.id}>{recordItem.messageText}</li>;
})}
```

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 忘记 key | 列表项需要稳定身份。 |
| 用随机数 key | 每次渲染都变，等于没有稳定身份。 |
| 默认用 index key | 只有列表永不重排、插入、删除时才相对安全。 |
| 以为 key 会出现在 props | key 是特殊字段，不作为普通 props 传入。 |

---

## 13. Flow 类型检查扩展

### 结论

Flow 是 JavaScript 的静态类型检查器（static type checker）。它不是 JavaScript 运行时语法；类型注解需要工具检查或剥离。

### Flow 示例

```js
// Goal:
// Show what a Flow-style type annotation looks like.

// @flow

function createPriceLabel(amountValue: number): string {
  return `$${amountValue.toFixed(2)}`;
}

console.log(createPriceLabel(19.5));
```

### 技术意义

Flow 体现的是：

```txt
JavaScript runtime
  is separate from
static type extension
```

### 与 TypeScript 的关系

| 对比 | Flow | TypeScript |
|---|---|---|
| 类型检查 | 是 | 是 |
| 是否主流就业更常见 | 较少 | 更常见 |
| 是否普通 JS 引擎直接运行类型注解 | 否 | 否 |
| 学习定位 | 了解历史和边界 | 后续主线重点 |

### 常见错误

| 错误 | 正确模型 |
|---|---|
| 把 Flow 类型当 JS 运行时语法 | 类型注解不是普通 JS 引擎能执行的语法。 |
| 以为类型检查等于运行时校验 | 静态类型主要发生在运行前。 |
| 把 Flow 和 TypeScript 混为一谈 | 都是类型系统工具，但生态和语法不同。 |

---

## 14. 工具分工最终对照表

| 工具 / 技术 | 核心问题 | 输入 | 输出 |
|---|---|---|---|
| npm | 依赖和命令管理 | `package.json` | 安装结果、脚本执行 |
| ESLint | 代码规则和潜在问题 | JS/JSX/TS 源码 | lint report |
| Prettier | 代码格式统一 | 源码文本 | 格式化源码 |
| Jest | 行为验证 | 测试文件 | pass/fail report |
| Vite / bundler | 浏览器运行产物 | module graph | `dist` |
| Babel | 语法转换 | 源码 AST | 转换后的 JS |
| JSX | UI 描述语法 | HTML-like JS syntax | runtime calls |
| Flow | 静态类型检查 | 带类型注解的 JS | type check result |

---

## 15. 常用命令速查

```bash
npm init -y
npm install react react-dom
npm install --save-dev vite
npm install --save-dev eslint @eslint/js
npm install --save-dev prettier
npm install --save-dev jest
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save-dev @babel/preset-react
```

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
npm run test
```

---

## 16. 最小 React / JSX 工程心智模型

### 文件结构

```txt
index.html
src/
  main.jsx
  App.jsx
  components/
    ProfileSummary.jsx
```

### 入口文件

```jsx
// Goal:
// Render the root React component into the browser page.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(<App />);
```

### 执行链路

```txt
browser loads index.html
  -> script type module loads /src/main.jsx
  -> Vite transforms JSX
  -> main.jsx imports App.jsx
  -> React creates root
  -> root.render receives JSX result
  -> React updates DOM
```

### 与 Web API 的关系

React 不取代浏览器。React 最终仍然通过 DOM APIs 把 UI 反映到页面上。

---

## 17. 小项目整合模型

第 17 章的小项目应该能把这些串起来：

```txt
npm scripts
  -> vite dev server
  -> JSX transform
  -> component tree
  -> cart calculation module
  -> Jest tests
  -> ESLint check
  -> Prettier format
  -> production build
```

推荐脚本：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "jest"
  }
}
```

---

## 18. 本章最终要能回答的问题

学完本章，你至少要能回答：

```txt
1. What problem does a toolchain solve?
2. Why is package.json the project command center?
3. What is the difference between dependencies and devDependencies?
4. Why should npm scripts wrap project commands?
5. What is ESLint responsible for?
6. What is Prettier responsible for?
7. Why should ESLint and Prettier not fight over formatting?
8. What do test, expect, and matcher mean in Jest?
9. What is bundling?
10. What is a dependency graph?
11. What does Vite do in dev mode and build mode?
12. Why is Babel a transpiler?
13. What is the difference between Babel plugin and preset?
14. Why is Babel not the same as a polyfill?
15. Is JSX HTML?
16. Why can a JavaScript engine not run JSX directly?
17. What does JSX transform into?
18. What is the difference between classic runtime and automatic runtime?
19. What do JSX curly braces do?
20. What are props and children?
21. Why must React component names start with a capital letter?
22. Why does list rendering need key?
23. Why is random key a bad idea?
24. What is Flow?
25. Why is Flow not normal runtime JavaScript?
```

---

## 19. 最终记忆模型

```txt
npm:
Project command and dependency center.

ESLint:
Checks code patterns before runtime.

Prettier:
Prints code in a consistent style.

Jest:
Runs automated tests and checks behavior.

Bundler:
Builds a module graph into browser-ready output.

Babel:
Transforms syntax before runtime.

JSX:
HTML-like markup syntax inside JavaScript.
It describes UI.
It is not real HTML.
It must be transformed.

Flow:
Static type checking extension for JavaScript.
```

最重要的一句话：

```txt
第 17 章把 JavaScript 从 language knowledge 推进到 engineering workflow。
```
