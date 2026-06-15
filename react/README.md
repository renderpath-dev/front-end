# React + TypeScript Learning Lab

这个目录是 React + TypeScript 学习项目。它使用 Vite 作为本地开发和构建工具，重点不是封装通用模板，而是把 React 概念、TSX 类型边界、真实练习文件和小型应用实践放在同一个可运行项目里。

## 当前内容

- `docs/react/`: React 学习笔记，目前包含第 1 章到第 3 章。
- `src/learning/react/`: 与学习章节对应的可运行 TSX 练习。
- `src/sudoku/`: Daily Sudoku 练习应用，包含 React state、event handlers、derived rendering、localStorage leaderboard 和纯 TypeScript puzzle logic。
- `references/books/react/`: 本地 React PDF 参考资料目录。PDF 文件只作为本地资料使用，不随公开仓库提交。

## 运行命令

- 安装依赖: `npm install`
- 启动开发服务器: `npm run dev`
- 运行 lint: `npm run lint`
- 构建生产版本: `npm run build`
- 本地预览构建结果: `npm run preview`

## 资料优先级

学习路线以当前官方文档为主，本地 PDF 作为补充材料。

1. [React Learn](https://react.dev/learn)
2. [React API Reference](https://react.dev/reference/react)
3. [Using TypeScript with React](https://react.dev/learn/typescript)
4. [TypeScript Handbook: JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
5. Local-only PDF: `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`
6. 本项目已有笔记和练习代码

如果本地 PDF 与当前官方文档冲突，以官方文档为准，并在笔记中标记 PDF 内容可能过时。

## 学习大纲

### 1. React 应用边界与工具链

- React 负责什么，Vite 负责什么，TypeScript 负责什么。
- `index.html`、`src/main.tsx`、root component 和 browser DOM container 的关系。
- `npm scripts`、dev server、production build、lint 和 type checking 的分工。
- 对应本地 PDF: `Fundamentals of React` 中的 project setup、project structure、npm scripts、React DOM。

### 2. JSX 与组件基础

- JSX 是源码层语法，不是浏览器原生语法。
- JSX expression、JSX attribute、children、fragments 和 conditional rendering。
- Component 是返回 UI 描述的 JavaScript/TypeScript function。
- Component 名称大写、import/export、module composition 与 UI tree。
- 对应官方文档: `Describing the UI`。
- 对应现有练习: `src/learning/react/chapter-02-jsx-and-components/`。

### 3. Props 与组件输入

- JSX custom component attributes 如何变成 props object。
- Required props、optional props、boolean props、default values 和 `children`。
- Props readonly 原则: 父组件传入数据，子组件读取数据，不直接修改输入。
- TypeScript 只在编译/编辑器阶段检查 props 类型，不会自动生成运行时校验。
- 对应现有笔记: `docs/react/chapter-03-props-basics/react-chapter-03-learning-guide.md`。

### 4. State、事件与渲染机制

- Event handler 是传给 React 的 callback，不是在 render 时直接调用。
- `useState` 让组件在多次 render 之间保留状态。
- State update 触发 React 重新调用组件函数，再根据新结果更新屏幕。
- 理解 render、commit、state snapshot、batched updates、object/array state update。
- 对应官方文档: `Adding Interactivity`。

### 5. 状态建模与组件协作

- 从 UI 状态反推最小 state。
- Lifting state up、sharing state、preserving and resetting state。
- 用 `useReducer` 管理复杂状态转移。
- 用 `Context` 解决跨层级传值，但不要替代所有 props。
- 对应官方文档: `Managing State`。

### 6. Effects、Refs 与自定义 Hooks

- Refs 用来保存不参与渲染的数据或访问 DOM。
- Effects 用来同步 React 外部系统，不要把普通数据派生写成 effect。
- 区分 event logic 和 effect synchronization。
- 抽取 custom hook 时要保持 Hook 调用规则和依赖关系清晰。
- 对应官方文档: `Escape Hatches`。

### 7. 表单、异步数据与真实应用练习

- Controlled components、form submission、validation 和 user feedback。
- Loading、error、empty、success 状态的建模。
- Fetching、refetching、pagination、sorting 和缓存边界。
- 先用 browser-local persistence 练习状态流，再根据需求引入后端。
- 对应本地 PDF: forms、asynchronous data、data fetching、real world React。

### 8. TypeScript in React

- 含 JSX 的 TypeScript 文件使用 `.tsx`。
- `tsconfig` 的 `jsx` 选项决定 JSX 如何交给后续工具链处理。
- Props、event handlers、state、refs、custom hooks 都需要区分 TypeScript 类型行为和 JavaScript 运行时行为。
- `@types/react` 和 `@types/react-dom` 提供 React/DOM 类型，不改变运行时代码。
- 对应官方文档: `Using TypeScript with React` 和 TypeScript Handbook `JSX`。

### 9. 样式、测试、性能与项目结构

- 样式从普通 CSS 开始，理解 CSS module、component-level styling 和 SVG/import 资源边界。
- 测试先覆盖可验证的 TypeScript logic，再扩展到 component behavior。
- 性能优化先定位问题，再考虑 memoization、render splitting 和数据结构调整。
- 项目结构按学习章节和应用边界组织，避免过早抽象。
- 对应本地 PDF: styling、maintenance、testing、performance、project structure。

## 章节进度

| Chapter | Topic | Status | Main files |
| --- | --- | --- | --- |
| 01 | React introduction and app boundary | Done | `docs/react/chapter-01-react-introduction/` |
| 02 | JSX and component basics | Done | `docs/react/chapter-02-jsx-and-components/`, `src/learning/react/chapter-02-jsx-and-components/` |
| 03 | Props basics and TypeScript props types | Done | `docs/react/chapter-03-props-basics/` |
| 04 | State and events | Planned | `src/learning/react/chapter-04-state-and-events/` |
| 05 | Lists, keys, conditional rendering | Planned | `src/learning/react/chapter-05-rendering-data/` |
| 06 | Forms and controlled components | Planned | `src/learning/react/chapter-06-forms/` |
| 07 | Effects and refs | Planned | `src/learning/react/chapter-07-effects-and-refs/` |
| 08 | Reducer, context, and custom hooks | Planned | `src/learning/react/chapter-08-state-architecture/` |
| 09 | App practice and persistence | In progress | `src/sudoku/` |

## 练习原则

- 每章先解释 JavaScript runtime 行为，再解释 React 在这个基础上增加的规则。
- TSX 练习要同时说明 TypeScript type-system 行为和 emitted/runtime JavaScript 边界。
- 每个示例文件只练一个主概念，避免把多个新概念混在同一个练习里。
- README 只维护路线和索引，完整解释放在 `docs/react/`。
- 新增依赖、测试框架、状态库或路由方案前，先确认当前章节确实需要。
