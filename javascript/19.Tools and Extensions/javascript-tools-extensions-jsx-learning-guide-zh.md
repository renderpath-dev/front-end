# JavaScript 工具和扩展学习指导文件：Tools, Extensions, and JSX

> 定位：这是《JavaScript 权威指南》第 17 章“JavaScript 工具和扩展”的学习指导文件，不是最终学习笔记。  
> 范围：ESLint、Prettier、Jest、npm、代码打包（bundling）、Babel、JSX、Flow。  
> 重点：本章不是继续学 JavaScript 语法本身，而是学习现代前端工程怎样把 JavaScript 代码检查、格式化、测试、安装依赖、打包、转译、写 UI 结构。  
> 语言规则：正文统一中文；重要技术术语写成“中文术语（English term）”。  
> 代码规则：代码命名、代码注释统一英文；代码和代码注释不使用中文字符。  
> 链接规则：MDN 和官方文档链接使用正常 Markdown 链接，不放进 `txt` 代码块。

---

## 目录

1. [本文件怎么用](#1-本文件怎么用)
2. [第 17 章完整学习顺序](#2-第-17-章完整学习顺序)
3. [本章先要建立的底层模型](#3-本章先要建立的底层模型)
4. [00：工具链总模型](#4-00工具链总模型)
5. [01：npm 和 package.json](#5-01npm-和-packagejson)
6. [02：ESLint 代码检查](#6-02eslint-代码检查)
7. [03：Prettier 代码格式化](#7-03prettier-代码格式化)
8. [04：Jest 单元测试](#8-04jest-单元测试)
9. [05：代码打包](#9-05代码打包)
10. [06：Babel 转译](#10-06babel-转译)
11. [07：JSX 的本质](#11-07jsx-的本质)
12. [08：JSX 表达式、属性和子元素](#12-08jsx-表达式属性和子元素)
13. [09：JSX 组件和 UI 组合](#13-09jsx-组件和-ui-组合)
14. [10：JSX 条件渲染和列表渲染](#14-10jsx-条件渲染和列表渲染)
15. [11：Flow 类型检查扩展](#15-11flow-类型检查扩展)
16. [12：小项目整合](#16-12小项目整合)
17. [最终文件清单](#17-最终文件清单)
18. [最终学习笔记转换要求](#18-最终学习笔记转换要求)
19. [本章最终要能回答的问题](#19-本章最终要能回答的问题)
20. [MDN 和官方文档阅读清单](#20-mdn-和官方文档阅读清单)
21. [最终记忆模型](#21-最终记忆模型)

---

## 1. 本文件怎么用

### 结论

这一章不能只看概念。你要真正创建一个小工程，安装依赖，运行脚本，观察工具输出，理解每个工具解决的工程问题。

第 17 章的核心不是“多学几个命令”，而是建立这个模型：

```txt
source code
  -> lint
  -> format
  -> test
  -> transform
  -> bundle
  -> run in browser
```

### 每节固定学习步骤

```txt
1. Read the conclusion.
2. Read the key terms.
3. Create the files.
4. Run the command.
5. Observe the output.
6. Explain the execution process.
7. Create one intentional mistake.
8. Convert the section into final notes.
```

### 本章和前面章节的关系

前面你学的是 JavaScript 语言机制（language mechanism）。这一章学的是工程化处理（engineering workflow）：

```txt
How code is checked.
How code is formatted.
How code is tested.
How packages are installed.
How modules are bundled.
How syntax is transformed.
How JSX becomes executable JavaScript.
```

---

## 2. 第 17 章完整学习顺序

### 结论

本章建议按这个顺序学：

```txt
toolchain model
  -> npm
  -> ESLint
  -> Prettier
  -> Jest
  -> bundling
  -> Babel
  -> JSX
  -> Flow
  -> mini project
```

### 技术意义

这个顺序的原因是：

```txt
npm is the dependency and script entry.
ESLint and Prettier handle quality and style.
Jest verifies behavior.
Bundlers process the module graph.
Babel transforms syntax.
JSX is a JavaScript syntax extension that needs transformation.
Flow is a type-checking extension.
```

### 本章不是简单工具清单

| 工具 | English term | 解决什么问题 |
|---|---|---|
| npm | package manager | 安装依赖、运行脚本、管理包信息 |
| ESLint | linter | 发现潜在错误和不一致代码模式 |
| Prettier | formatter | 统一代码排版风格 |
| Jest | test runner / testing framework | 自动验证函数行为 |
| 打包工具 | bundler | 把模块依赖图打包成浏览器可运行产物 |
| Babel | transpiler / compiler | 把新语法或扩展语法转换成普通 JS |
| JSX | syntax extension | 用 HTML-like markup 描述 UI 结构 |
| Flow | static type checker | 给 JS 添加静态类型检查 |

---

## 3. 本章先要建立的底层模型

### 结论

现代前端工程不是直接把所有 `.js` 文件丢给浏览器，而是让工具链处理源代码。

### 关键术语

| 术语 | English term | 解释 |
|---|---|---|
| 工具链 | toolchain | 多个开发工具组成的处理流程 |
| 源代码 | source code | 你直接编写的代码 |
| 产物 | build output / artifact | 工具处理后生成的代码 |
| 代码检查 | linting | 静态分析代码中的问题 |
| 格式化 | formatting | 统一代码排版 |
| 测试 | testing | 自动验证代码行为是否正确 |
| 转译 | transpilation | 把一种 JS 代码转换成另一种 JS 代码 |
| 打包 | bundling | 把模块依赖图合并成可部署文件 |
| 插件 | plugin | 扩展工具能力的小模块 |
| 预设 | preset | 一组预先配置好的插件集合 |
| JSX | JavaScript XML / JSX | JavaScript 的标记表达式扩展 |
| 抽象语法树 | Abstract Syntax Tree / AST | 工具解析代码后得到的树形结构 |

### 底层机制总图

```txt
src/main.jsx
  imports src/App.jsx
  imports src/components/ProfileCard.jsx

npm scripts
  lint -> eslint
  format -> prettier
  test -> jest
  build -> bundler + jsx transform
```

### 和项目开发的关系

真实前端项目里，你写的代码通常不是浏览器最终直接执行的代码。浏览器执行的是工具处理后的结果。

---

## 4. 00：工具链总模型

### 结论

工具链（toolchain）是从“开发代码”到“可运行产物”的处理流水线。

### 新关键字和新概念

#### 工具链（toolchain）

工具链是一组按顺序协作的开发工具。每个工具解决一个不同问题。

#### 静态分析（static analysis）

不运行代码，只分析源代码文本和语法结构，找出潜在问题。

#### 构建（build）

把源代码转换为最终可运行或可部署产物的过程。

### 文件结构

```txt
00-toolchain-model/
  package.json
  src/
    mathTools.js
    main.js
```

### `package.json`

```json
{
  "name": "toolchain-model-demo",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "start": "node src/main.js"
  }
}
```

### `src/mathTools.js`

```js
// Goal:
// Export a small function that can be checked, formatted, tested, and bundled.

export function calculateCartTotal(priceAmount, quantityCount) {
  return priceAmount * quantityCount;
}
```

### `src/main.js`

```js
// Goal:
// Run the source module directly with Node.

import { calculateCartTotal } from './mathTools.js';

const cartTotalAmount = calculateCartTotal(25, 4);

console.log(cartTotalAmount);
```

### 运行方式

```bash
npm run start
```

### 预期输出

```txt
100
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | npm 读取 `package.json`。 |
| 2 | 找到 `scripts.start`。 |
| 3 | 执行 `node src/main.js`。 |
| 4 | Node 按 ES Module 方式加载 `main.js`。 |
| 5 | `main.js` 导入并调用 `calculateCartTotal()`。 |
| 6 | 终端输出 `100`。 |

### 常见错误

不要把 `package.json` 当成普通 JS 文件。它必须是 JSON 格式，不能写注释，不能使用单引号。

### 和项目开发的关系

后面所有工具都通过 `package.json` 的脚本（scripts）连接起来。

---

## 5. 01：npm 和 package.json

### 结论

npm 是包管理器（package manager）和脚本入口。`package.json` 是项目的工程配置中心。

### 新关键字和新概念

#### npm

npm 是 Node 生态常用的包管理器（package manager）。它负责安装依赖、运行脚本、管理包版本。

#### `package.json`

`package.json` 是项目元数据和脚本配置文件。

#### dependencies

`dependencies` 是生产运行需要的依赖。

#### devDependencies

`devDependencies` 是开发阶段需要的依赖，比如 ESLint、Prettier、Jest、Babel。

#### scripts

`scripts` 是你给项目定义的命令入口。

### 文件结构

```txt
01-npm-package-json/
  package.json
  src/
    greetingMessage.js
```

### `package.json`

```json
{
  "name": "npm-package-json-demo",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "start": "node src/greetingMessage.js",
    "check": "node --check src/greetingMessage.js"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

### `src/greetingMessage.js`

```js
// Goal:
// Run a simple file through npm scripts.

const greetingMessage = 'Hello toolchain';

console.log(greetingMessage);
```

### 运行方式

```bash
npm run start
npm run check
```

### 预期输出

```txt
Hello toolchain
```

`npm run check` 没有输出时通常表示语法检查通过。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `npm run start` 读取 `scripts.start`。 |
| 2 | npm 调用 Node 执行目标文件。 |
| 3 | `npm run check` 读取 `scripts.check`。 |
| 4 | Node 只检查语法，不执行业务逻辑。 |

### 常见错误

错误：

```json
{
  "scripts": {
    "start": "node src/missingFile.js"
  }
}
```

原因：脚本命令存在，但目标文件路径不存在。

### 和项目开发的关系

真实项目里你通常不会手动记住所有命令，而是把它们封装成 npm scripts。

---

## 6. 02：ESLint 代码检查

### 结论

ESLint 是代码检查器（linter）。它不负责统一排版，而是通过规则发现潜在 bug、不一致模式和团队约定违反。

### 新关键字和新概念

#### Linter

Linter 是静态分析工具（static analysis tool）。它解析代码，不运行代码。

#### Rule

Rule 是 ESLint 的检查规则，例如不允许未使用变量、不允许未声明变量。

#### Flat config

Flat config 是现代 ESLint 默认配置格式，通常使用 `eslint.config.js`。

### 文件结构

```txt
02-eslint-linting/
  package.json
  eslint.config.js
  src/
    brokenOrderCalculator.js
    fixedOrderCalculator.js
```

### 安装

```bash
npm install --save-dev eslint @eslint/js
```

### `package.json`

```json
{
  "name": "eslint-linting-demo",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "lint": "eslint src"
  },
  "devDependencies": {
    "@eslint/js": "latest",
    "eslint": "latest"
  }
}
```

### `eslint.config.js`

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

### `src/brokenOrderCalculator.js`

```js
// Goal:
// Intentionally trigger ESLint warnings and errors.

const unusedTaxRate = 0.08;

export function calculateOrderTotal(priceAmount, quantityCount) {
  totalAmount = priceAmount * quantityCount;
  return totalAmount;
}
```

### `src/fixedOrderCalculator.js`

```js
// Goal:
// Provide a clean version that ESLint can accept.

export function calculateOrderTotal(priceAmount, quantityCount) {
  const totalAmount = priceAmount * quantityCount;
  return totalAmount;
}
```

### 运行方式

```bash
npm run lint
```

### 预期行为

`brokenOrderCalculator.js` 会出现类似问题：

```txt
unusedTaxRate is assigned a value but never used
totalAmount is not defined
```

修复后，ESLint 不再报告这些问题。

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | npm 执行 `eslint src`。 |
| 2 | ESLint 读取 `eslint.config.js`。 |
| 3 | ESLint 把 JS 代码解析为 AST。 |
| 4 | 推荐规则检查 AST。 |
| 5 | 找到未使用变量和未声明变量。 |

### 常见错误

不要把 ESLint 当成 Prettier。ESLint 主要处理代码质量和规则；Prettier 主要处理格式。

### 和项目开发的关系

ESLint 能在代码运行前发现一类明显问题，尤其适合团队项目和 CI。

---

## 7. 03：Prettier 代码格式化

### 结论

Prettier 是代码格式化器（code formatter）。它会重新打印代码，让代码风格一致。

### 新关键字和新概念

#### Formatter

Formatter 负责排版，不负责判断业务逻辑对不对。

#### Opinionated

Opinionated 的意思是“有主观规则”。Prettier 故意减少配置项，避免团队长期争论格式。

### 文件结构

```txt
03-prettier-formatting/
  package.json
  .prettierrc.json
  src/
    messyProfileCard.js
```

### 安装

```bash
npm install --save-dev prettier
```

### `package.json`

```json
{
  "name": "prettier-formatting-demo",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "format": "prettier --write src",
    "format:check": "prettier --check src"
  },
  "devDependencies": {
    "prettier": "latest"
  }
}
```

### `.prettierrc.json`

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 80
}
```

### `src/messyProfileCard.js`

```js
// Goal:
// Give Prettier code that needs formatting.

export function createProfileCardText(userName,roleName){return `${userName}:${roleName}`}
```

### 运行方式

```bash
npm run format:check
npm run format
```

### 格式化后

```js
// Goal:
// Show the expected result after Prettier formats the file.

export function createProfileCardText(userName, roleName) {
  return `${userName}:${roleName}`;
}
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | Prettier 解析源代码。 |
| 2 | Prettier 丢弃原本的排版样式。 |
| 3 | Prettier 按配置重新打印代码。 |
| 4 | `--write` 把格式化结果写回文件。 |

### 常见错误

不要手动和 Prettier 的格式规则对抗。项目用了 Prettier，就让它负责格式。

### 和项目开发的关系

Prettier 让代码 review 集中讨论逻辑，而不是讨论缩进、换行、引号。

---

## 8. 04：Jest 单元测试

### 结论

Jest 是测试框架（testing framework）。它用自动化测试验证函数行为，避免你每次改代码都手动刷新页面检查。

### 新关键字和新概念

#### 单元测试（unit test）

单元测试验证一个小的代码单元，例如一个函数。

#### 断言（assertion）

断言是测试里表达预期结果的语句。

#### Matcher

Matcher 是 Jest 里用于比较实际结果和预期结果的方法，例如 `toBe()`。

### 文件结构

```txt
04-jest-testing/
  package.json
  src/
    cartMath.cjs
    cartMath.test.cjs
```

### 安装

```bash
npm install --save-dev jest
```

### `package.json`

```json
{
  "name": "jest-testing-demo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "latest"
  }
}
```

### `src/cartMath.cjs`

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

### `src/cartMath.test.cjs`

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

test('returns zero for an empty cart', () => {
  expect(calculateCartSubtotal([])).toBe(0);
});
```

### 运行方式

```bash
npm run test
```

### 预期输出

```txt
PASS src/cartMath.test.cjs
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | Jest 查找测试文件。 |
| 2 | `cartMath.test.cjs` 加载被测试函数。 |
| 3 | `test()` 注册测试用例。 |
| 4 | `expect(...).toBe(...)` 检查结果。 |
| 5 | 如果实际值和预期值不同，测试失败。 |

### 为什么这里用 `.cjs`

Jest 的官方入门示例使用 CommonJS。这里先用 `.cjs` 降低配置复杂度，重点学习测试思想。后续 React / Vite 项目中可以再使用现代 ESM 测试方案。

### 常见错误

不要只测试“正常输入”。空数组、非法输入、边界值也要测。

### 和项目开发的关系

测试不是为了证明你现在写对了，而是为了防止以后重构时悄悄写错。

---

## 9. 05：代码打包

### 结论

代码打包（bundling）把多个模块组成的依赖图处理成浏览器可加载的产物。

### 新关键字和新概念

#### Bundler

Bundler 是打包工具。它从入口文件开始，分析 `import` 关系，生成最终产物。

#### Entry

Entry 是打包入口文件。

#### Dependency graph

Dependency graph 是模块之间由 `import` 形成的依赖关系图。

#### Build output

Build output 是打包后的产物目录，常见名称是 `dist`。

### 文件结构

```txt
05-bundling-with-vite/
  package.json
  index.html
  src/
    main.js
    dashboardMessage.js
```

### 安装

```bash
npm install --save-dev vite
```

### `package.json`

```json
{
  "name": "bundling-with-vite-demo",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "latest"
  }
}
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Bundling Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### `src/dashboardMessage.js`

```js
// Goal:
// Export text used by the browser entry file.

export function createDashboardMessage(userName) {
  return `Dashboard ready for ${userName}`;
}
```

### `src/main.js`

```js
// Goal:
// Import a module and render text in the browser.

import { createDashboardMessage } from './dashboardMessage.js';

const appElement = document.querySelector('#app');

appElement.textContent = createDashboardMessage('Ada');
```

### 运行方式

```bash
npm run dev
npm run build
npm run preview
```

### 预期行为

开发服务器页面显示：

```txt
Dashboard ready for Ada
```

构建后生成：

```txt
dist/
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | Vite 从 `index.html` 找到入口模块。 |
| 2 | 读取 `/src/main.js`。 |
| 3 | 分析 `import` 依赖。 |
| 4 | 开发模式使用原生 ESM 和快速转换。 |
| 5 | build 阶段生成可部署产物。 |

### 常见错误

不要把打包理解为“简单拼接文件”。打包工具要处理模块解析、依赖图、转换、优化和产物生成。

### 和项目开发的关系

React、Vue、Svelte、Next.js、Astro 等项目背后都有构建和打包流程。

---

## 10. 06：Babel 转译

### 结论

Babel 是转译器（transpiler / compiler）。它把现代 JavaScript 或扩展语法转换成目标环境能理解的 JavaScript。

### 新关键字和新概念

#### 转译（transpilation）

转译是从一种 JS 代码转换成另一种 JS 代码。

#### 插件（plugin）

插件处理某一种语法或转换能力。

#### 预设（preset）

预设是一组插件集合，例如 `@babel/preset-env` 和 `@babel/preset-react`。

#### Source map

Source map 把转换后的代码位置映射回源代码，方便调试。

### 文件结构

```txt
06-babel-transpilation/
  package.json
  babel.config.json
  src/
    modernSyntax.js
```

### 安装

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

### `package.json`

```json
{
  "name": "babel-transpilation-demo",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "babel src --out-dir lib --source-maps"
  },
  "devDependencies": {
    "@babel/cli": "latest",
    "@babel/core": "latest",
    "@babel/preset-env": "latest"
  }
}
```

### `babel.config.json`

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

### `src/modernSyntax.js`

```js
// Goal:
// Give Babel modern JavaScript syntax that may need transformation.

const customerRecord = {
  profile: {
    displayName: 'Ada',
  },
};

const displayName = customerRecord.profile?.displayName ?? 'Guest';

console.log(displayName);
```

### 运行方式

```bash
npm run build
node lib/modernSyntax.js
```

### 预期输出

```txt
Ada
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | Babel 读取 `babel.config.json`。 |
| 2 | `@babel/preset-env` 判断目标环境。 |
| 3 | Babel 解析源代码为 AST。 |
| 4 | Babel 按需要转换语法。 |
| 5 | 输出到 `lib` 目录。 |
| 6 | Node 执行转换后的代码。 |

### 常见错误

不要以为 Babel 是 polyfill。Babel 主要转换语法；运行时 API 是否存在是另一个问题。

### 和项目开发的关系

现在很多浏览器已经支持大部分现代 JS，但 Babel 仍然常用于 JSX、实验语法、库构建和兼容目标环境。

---

## 11. 07：JSX 的本质

### 结论

JSX 不是 HTML。JSX 是 JavaScript 的语法扩展（syntax extension），用 HTML-like markup 写出 UI 结构，最终会被 Babel 或构建工具转换成普通 JavaScript 函数调用或 JSX runtime 调用。

你说“JSX 本质上是在 JS 代码里面编写 HTML 标签，类似于 UI 组件”，这个理解方向是对的，但要改得更精确：

```txt
JSX lets you write HTML-like markup inside JavaScript.
It describes a UI tree.
It is not real HTML.
It must be transformed before the JavaScript engine can run it.
```

### 新关键字和新概念

#### JSX

JSX 是 JavaScript XML 的常见说法。它是一种标记表达式（markup expression），常用于 React 组件。

#### HTML-like markup

HTML-like markup 是“类似 HTML 的标记语法”。它看起来像 HTML，但规则不是完全一样。

#### React element

React element 是描述 UI 节点的普通 JavaScript 对象。React 用它来决定页面要渲染什么。

#### JSX transform

JSX transform 是把 JSX 转换成普通 JavaScript 的过程。

#### Classic runtime

Classic runtime 是旧 JSX 转换方式，通常转换成 `React.createElement(...)`。

#### Automatic runtime

Automatic runtime 是 React 17 之后常见的新 JSX 转换方式，会自动从 `react/jsx-runtime` 引入函数。

### 文件结构

```txt
07-jsx-core-model/
  package.json
  babel.config.json
  src/
    ProfileCard.jsx
```

### 安装

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-react
npm install react
```

### `package.json`

```json
{
  "name": "jsx-core-model-demo",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "babel src --out-dir lib"
  },
  "dependencies": {
    "react": "latest"
  },
  "devDependencies": {
    "@babel/cli": "latest",
    "@babel/core": "latest",
    "@babel/preset-react": "latest"
  }
}
```

### `babel.config.json`

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

### `src/ProfileCard.jsx`

```jsx
// Goal:
// Verify that JSX describes a UI tree and must be transformed.

const profileCardElement = (
  <article className="profile-card">
    <h2>Ada Lovelace</h2>
    <p>First programmer</p>
  </article>
);

console.log(profileCardElement);
```

### 运行方式

```bash
npm run build
```

然后打开 `lib/ProfileCard.js`，观察 JSX 已经被转换成普通 JavaScript。

### 预期行为

你会看到源文件里的：

```jsx
<article className="profile-card">
  <h2>Ada Lovelace</h2>
  <p>First programmer</p>
</article>
```

在输出文件里不再以原始 JSX 形式存在，而是变成 JSX runtime 相关函数调用。

### 底层机制

JSX 不能直接被普通 JavaScript 引擎执行。工具会先做转换：

```txt
JSX source
  -> parser
  -> AST
  -> JSX transform
  -> JavaScript calls
```

旧模型可以这样理解：

```jsx
const elementNode = <h1>Hello</h1>;
```

会被转换成类似：

```js
const elementNode = React.createElement('h1', null, 'Hello');
```

现代自动运行时可能变成类似：

```js
import { jsx as _jsx } from 'react/jsx-runtime';

const elementNode = _jsx('h1', {
  children: 'Hello',
});
```

### 常见错误

不要说“JSX 就是 HTML”。更准确：

```txt
JSX is HTML-like syntax inside JavaScript.
HTML is parsed by the browser as markup.
JSX is parsed by build tools as a JavaScript syntax extension.
```

### 和项目开发的关系

React 组件通常返回 JSX，因为 JSX 能把 UI 树结构写得接近最终页面结构，但运行前必须经过构建工具转换。

---

## 12. 08：JSX 表达式、属性和子元素

### 结论

JSX 是表达式（expression）。它可以赋值给变量、作为函数返回值、作为函数参数。JSX 花括号 `{}` 可以嵌入普通 JavaScript 表达式。

### 新关键字和新概念

#### JSX expression

JSX expression 是可以产生一个值的表达式。

#### Props

Props 是传给组件或元素的属性对象。

#### Children

Children 是 JSX 元素内部的子内容。

#### Curly braces

JSX 花括号让你从 markup 回到 JavaScript 表达式。

### 文件结构

```txt
08-jsx-expressions-props-children/
  package.json
  src/
    ProductBadge.jsx
```

### `src/ProductBadge.jsx`

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

### 运行方式

这个文件需要在支持 JSX 的构建环境中运行，例如 Vite React 项目或 Babel 转换后运行。

### 执行过程

| JSX 部分 | 技术含义 |
|---|---|
| `className="product-badge"` | 字符串 prop |
| `data-available={isAvailable}` | JavaScript 表达式 prop |
| `{productName}` | JavaScript 表达式作为 children |
| `{stockCount} items available` | 表达式和文本共同组成 children |

### 常见错误

JSX 属性名不是完全等于 HTML 属性名。React 中通常写 `className`，不是 `class`。

错误：

```jsx
<div class="card"></div>
```

正确：

```jsx
<div className="card"></div>
```

### 和项目开发的关系

Props 和 children 是 React UI 组件组合的基础。

---

## 13. 09：JSX 组件和 UI 组合

### 结论

组件（component）是返回 UI 描述的函数。JSX 让组件可以像标签一样组合。

### 新关键字和新概念

#### Component

组件是可复用 UI 单元。在 React 中，函数组件通常返回 JSX。

#### Component composition

组件组合是把小组件嵌套成大 UI 的方式。

#### Capitalized component name

React 里自定义组件名必须大写开头。小写标签被当作内置 DOM 元素。

### 文件结构

```txt
09-jsx-components-composition/
  package.json
  src/
    App.jsx
    components/
      ProfileSummary.jsx
      StatusPill.jsx
```

### `src/components/StatusPill.jsx`

```jsx
// Goal:
// Export a small reusable UI component.

export function StatusPill({ isOnline }) {
  return <span>{isOnline ? 'Online' : 'Offline'}</span>;
}
```

### `src/components/ProfileSummary.jsx`

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

### `src/App.jsx`

```jsx
// Goal:
// Compose the application UI from smaller components.

import { ProfileSummary } from './components/ProfileSummary.jsx';

export function App() {
  return (
    <main>
      <ProfileSummary displayName="Ada" isOnline={true} />
      <ProfileSummary displayName="Brendan" isOnline={false} />
    </main>
  );
}
```

### 执行过程

| 步骤 | 发生什么 |
|---|---|
| 1 | `App()` 返回 JSX。 |
| 2 | JSX 中出现 `ProfileSummary` 组件。 |
| 3 | React 调用组件函数获取子 UI。 |
| 4 | `ProfileSummary` 内部继续使用 `StatusPill`。 |
| 5 | 小组件组合成完整 UI 树。 |

### 常见错误

错误：

```jsx
function profileSummary() {
  return <article>Profile</article>;
}
```

如果在 JSX 中写：

```jsx
<profileSummary />
```

它会被当成小写 DOM 标签，不会按 React 组件处理。

正确：

```jsx
function ProfileSummary() {
  return <article>Profile</article>;
}
```

### 和项目开发的关系

现代前端页面通常不是一个大 HTML 文件，而是一棵组件树。

---

## 14. 10：JSX 条件渲染和列表渲染

### 结论

JSX 中常用 JavaScript 表达式控制 UI 是否出现、出现哪些列表项。

### 新关键字和新概念

#### Conditional rendering

条件渲染是根据条件决定 UI 是否出现。

#### List rendering

列表渲染是把数组映射成一组 JSX 元素。

#### Key

Key 是帮助 React 识别列表元素身份的特殊 prop。

### 文件结构

```txt
10-jsx-conditional-list-rendering/
  src/
    NotificationList.jsx
```

### `src/NotificationList.jsx`

```jsx
// Goal:
// Verify conditional rendering and list rendering with JSX.

const notificationRecords = [
  { id: 1, messageText: 'Build completed', unread: true },
  { id: 2, messageText: 'Tests passed', unread: false },
  { id: 3, messageText: 'Deploy ready', unread: true },
];

export function NotificationList() {
  const unreadTotal = notificationRecords.filter((recordItem) => {
    return recordItem.unread;
  }).length;

  return (
    <section>
      <h2>Notifications</h2>

      {unreadTotal > 0 && <p>{unreadTotal} unread messages</p>}

      <ul>
        {notificationRecords.map((recordItem) => {
          return <li key={recordItem.id}>{recordItem.messageText}</li>;
        })}
      </ul>
    </section>
  );
}
```

### 执行过程

| 代码 | 含义 |
|---|---|
| `unreadTotal > 0 && ...` | 条件为真时返回右侧 JSX |
| `.map(...)` | 把数组元素转换成 JSX 元素 |
| `key={recordItem.id}` | 给列表项提供稳定身份 |
| `{recordItem.messageText}` | 把 JS 值插入 JSX |

### 常见错误

不要用数组索引当 key，除非列表永远不会重排、插入、删除。

不推荐：

```jsx
{notificationRecords.map((recordItem, indexValue) => {
  return <li key={indexValue}>{recordItem.messageText}</li>;
})}
```

推荐：

```jsx
{notificationRecords.map((recordItem) => {
  return <li key={recordItem.id}>{recordItem.messageText}</li>;
})}
```

### 和项目开发的关系

条件渲染和列表渲染是 React 页面中最常见的 JSX 使用方式。

---

## 15. 11：Flow 类型检查扩展

### 结论

Flow 是 JavaScript 的静态类型检查器（static type checker）。它属于历史上重要的 JS 类型扩展，但当前主流前端就业和工程生态更常用 TypeScript。你现在 TS 暂时搁置，所以这一节只建立概念，不深入。

### 新关键字和新概念

#### Static type checking

静态类型检查是在代码运行前检查类型关系。

#### Type annotation

类型注解是在变量、参数、返回值上写类型信息。

#### Flow

Flow 是给 JavaScript 添加静态类型检查的工具。

### 文件结构

```txt
11-flow-concept-preview/
  priceLabel.js
```

### `priceLabel.js`

```js
// Goal:
// Show what a Flow-style type annotation looks like.

// @flow

function createPriceLabel(amountValue: number): string {
  return `$${amountValue.toFixed(2)}`;
}

console.log(createPriceLabel(19.5));
```

### 学习要求

这一节现在只要知道：

```txt
Flow adds type annotations to JavaScript.
Those annotations are not normal runtime JavaScript.
A tool must strip or check them before browser execution.
```

### 常见错误

不要把 Flow 类型注解当作 JavaScript 运行时语法。普通 JavaScript 引擎不能直接执行带 Flow 类型注解的代码。

### 和项目开发的关系

你以后主要会学 TypeScript，但 Flow 能帮助你理解“JavaScript 语言本身”和“类型扩展工具”之间的边界。

---

## 16. 12：小项目整合

### 结论

最后用一个小项目把 npm、ESLint、Prettier、Jest、Vite、Babel/JSX 串起来。

### 文件结构

```txt
12-mini-toolchain-jsx-project/
  package.json
  eslint.config.js
  .prettierrc.json
  index.html
  src/
    main.jsx
    App.jsx
    cart/
      cartMath.js
      CartSummary.jsx
      cartMath.test.cjs
```

### 创建项目建议

你可以直接用 Vite React 模板创建，再手动对照本节补文件：

```bash
npm create vite@latest mini-toolchain-jsx-project -- --template react
cd mini-toolchain-jsx-project
npm install
```

### `src/cart/cartMath.js`

```js
// Goal:
// Export cart calculation logic that can be tested and used by JSX components.

export function calculateCartSubtotal(cartItems) {
  return cartItems.reduce((runningTotal, cartItem) => {
    return runningTotal + cartItem.priceAmount * cartItem.quantityCount;
  }, 0);
}
```

### `src/cart/CartSummary.jsx`

```jsx
// Goal:
// Render cart data with JSX.

import { calculateCartSubtotal } from './cartMath.js';

export function CartSummary({ cartItems }) {
  const subtotalAmount = calculateCartSubtotal(cartItems);

  return (
    <section>
      <h2>Cart Summary</h2>
      <p>Total: ${subtotalAmount}</p>
    </section>
  );
}
```

### `src/App.jsx`

```jsx
// Goal:
// Compose the root application component.

import { CartSummary } from './cart/CartSummary.jsx';

const cartItems = [
  { priceAmount: 30, quantityCount: 2 },
  { priceAmount: 15, quantityCount: 4 },
];

export function App() {
  return (
    <main>
      <h1>Toolchain JSX Demo</h1>
      <CartSummary cartItems={cartItems} />
    </main>
  );
}
```

### `src/main.jsx`

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

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Toolchain JSX Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 运行方式

```bash
npm run dev
npm run build
```

### 预期页面

```txt
Toolchain JSX Demo
Cart Summary
Total: $120
```

### 整合意义

这个小项目把本章主线串起来：

```txt
npm scripts
  -> development server
  -> module graph
  -> JSX transform
  -> browser rendering
  -> build output
```

---

## 17. 最终文件清单

```txt
javascript-tools-extensions-learning/
  00-toolchain-model/
  01-npm-package-json/
  02-eslint-linting/
  03-prettier-formatting/
  04-jest-testing/
  05-bundling-with-vite/
  06-babel-transpilation/
  07-jsx-core-model/
  08-jsx-expressions-props-children/
  09-jsx-components-composition/
  10-jsx-conditional-list-rendering/
  11-flow-concept-preview/
  12-mini-toolchain-jsx-project/
  javascript-tools-extensions-jsx-learning-notes.md
```

---

## 18. 最终学习笔记转换要求

每一节最终整理成学习笔记时，固定使用这个结构：

```txt
Conclusion
Technical meaning
Keyword explanation
Underlying mechanism
File structure
Code examples
How to run
Expected output or behavior
Execution process
Common mistakes
Project relationship
Final memory model
```

### 语言要求

```txt
Main explanation: Chinese.
Important terms: Chinese term plus English term.
Code naming: English.
Code comments: English.
Code and code comments: no Chinese characters.
MDN links: normal Markdown links.
```

---

## 19. 本章最终要能回答的问题

学完本章，你应该能回答：

```txt
1. What problem does a toolchain solve?
2. What is the relationship between npm and package.json?
3. What is the difference between dependencies and devDependencies?
4. Why are npm scripts project command entries?
5. What is the difference between ESLint and Prettier?
6. Why is ESLint a static analysis tool?
7. Why should Prettier own code formatting?
8. What are test, expect, and matcher in Jest?
9. What is bundling?
10. What is a dependency graph?
11. Why is Babel called a transpiler?
12. What is the difference between a Babel plugin and a preset?
13. What is the difference between Babel and a polyfill?
14. Is JSX HTML?
15. Why can a JavaScript engine not run JSX directly?
16. What does JSX transform into?
17. What is the difference between classic runtime and automatic runtime?
18. What do curly braces mean in JSX?
19. What are props and children?
20. Why should React component names start with a capital letter?
21. Why is && common in conditional rendering?
22. Why does list rendering need keys?
23. What is the relationship between Flow and JavaScript itself?
24. Why do modern frontend projects need a toolchain?
```

---

## 20. MDN 和官方文档阅读清单

### MDN

- [MDN: Client-side tooling overview](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Overview)
- [MDN: Introducing a complete toolchain](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Introducing_complete_toolchain)
- [MDN: Getting started with React](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started)

### React JSX

- [React: Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [React: JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)

### Tooling official docs

- [ESLint: Getting Started](https://eslint.org/docs/latest/use/getting-started)
- [Prettier: What is Prettier?](https://prettier.io/docs)
- [Jest: Getting Started](https://jestjs.io/docs/getting-started)
- [npm: package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [npm: scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts/)
- [Babel: Transform React JSX](https://babeljs.io/docs/babel-plugin-transform-react-jsx)

---

## 21. 最终记忆模型

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
Chapter 17 moves JavaScript from language knowledge into engineering workflow.
```
