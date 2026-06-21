# React + TypeScript Learning Lab

This directory is a React + TypeScript learning project. It uses Vite for local development and production builds. The goal is not to keep a generic starter template, but to keep React concepts, TSX type boundaries, real practice files, and small application exercises in one runnable project.

## Current Contents

- `docs/react/`: React learning notes. Chapters 1 through 3 are currently available.
- `src/learning/react/`: Runnable TSX exercises that match the learning chapters.
- `src/sudoku/`: A Daily Sudoku practice app covering React state, event handlers, derived rendering, a browser-local `localStorage` leaderboard, and pure TypeScript puzzle logic.
- `references/books/react/`: Local React PDF reference directory. PDF files are local-only study material and are not committed to the public repository.

## Commands

- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Run linting: `npm run lint`
- Build for production: `npm run build`
- Preview the production build locally: `npm run preview`

## Source Priority

The learning path follows current official documentation first. The local PDF is supporting material only.

1. [React Learn](https://react.dev/learn)
2. [React API Reference](https://react.dev/reference/react)
3. [Using TypeScript with React](https://react.dev/learn/typescript)
4. [TypeScript Handbook: JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
5. Local-only PDF: `references/books/react/the-road-to-react-the-reactjs-19-with-hooks-in-javascript-book-2025-edition_compress.pdf`
6. Existing project notes and practice code

If the local PDF conflicts with current official documentation, follow the official documentation and mark the PDF content as potentially outdated in notes.

## Learning Outline

### 1. React Application Boundary and Tooling

- What React handles, what Vite handles, and what TypeScript handles.
- How `index.html`, `src/main.tsx`, the root component, and the browser DOM container fit together.
- The roles of `npm scripts`, the development server, production builds, linting, and type checking.
- Related local PDF topics: project setup, project structure, npm scripts, and React DOM in `Fundamentals of React`.

### 2. JSX and Component Basics

- JSX is source-level syntax, not native browser syntax.
- JSX expressions, JSX attributes, children, fragments, and conditional rendering.
- A component is a JavaScript or TypeScript function that returns a UI description.
- Component capitalization, import/export, module composition, and the UI tree.
- Related official docs: `Describing the UI`.
- Current exercises: `src/learning/react/chapter-02-jsx-and-components/`.

### 3. Props and Component Inputs

- How JSX custom component attributes become a props object.
- Required props, optional props, boolean props, default values, and `children`.
- The readonly props rule: parent components pass data down, child components read that data, and child components should not mutate their inputs.
- TypeScript checks props at compile time and in the editor. It does not automatically create runtime validation.
- Current notes: `docs/react/chapter-03-props-basics/react-chapter-03-learning-guide.md`.

### 4. State, Events, and Rendering

- An event handler is a callback passed to React. It should not be called directly during render.
- `useState` lets a component keep state across renders.
- A state update makes React call the component again, then update the screen from the new result.
- Key topics: render, commit, state snapshots, batched updates, and object or array state updates.
- Related official docs: `Adding Interactivity`.

### 5. Lists, Keys, and Conditional Rendering

- Render typed arrays with `map()` and use stable domain IDs as keys.
- Keep loading, error, empty, and success branches distinct.
- Derive filtered and sorted lists without mutating props or state.
- Related official docs: `Rendering Lists` and `Conditional Rendering`.

### 6. Forms and Controlled Components

- Understand browser form submission and React `onSubmit` handling.
- Control text inputs, textareas, selects, checkboxes, and radio groups with React state.
- Model related form values with immutable object state.
- Keep validation errors, pending submission, and success feedback distinct.
- Apply TypeScript event, form-value, and field-name types to form boundaries.
- Current notes and exercises: `docs/react/chapter-06-forms/`, `src/learning/react/chapter-06-forms/`.

### 7. Effects and Refs

- Refs store values that do not participate in rendering, or they provide access to DOM nodes.
- Effects synchronize React with external systems. Ordinary derived data should usually stay out of effects.
- Separate event logic from effect synchronization.
- Related official docs: `Escape Hatches`.

### 8. State Architecture, Reducer, Context, and Custom Hooks

- Keep state minimal by deriving values and choosing an explicit state owner.
- Preserve or reset state intentionally through UI-tree position and `key`.
- Use `useReducer` when state transitions benefit from explicit actions.
- Use `Context` for cross-level data sharing, not as a replacement for every prop.
- Extract custom hooks while keeping Hook call rules and dependency relationships clear.
- Keep TypeScript state, action, context, ref, and hook types separate from JavaScript runtime behavior.

### 9. Async Data, Fetch Lifecycle, and UI State

- Model remote data with explicit idle, pending, success, empty, and error states.
- Separate user-driven requests from effect-driven synchronization with committed criteria.
- Handle HTTP status, runtime response validation, abort, obsolete results, and request races.
- Use reducers, custom hooks, and Context only after request ownership and lifecycle boundaries are explicit.
- Current notes and exercises: `docs/react/chapter-09-async-data/`, `src/learning/react/chapter-09-async-data/`.

### 10. Routing, URL State, and Navigation

- Treat the browser URL and history stack as application state boundaries.
- Use React Router declarative routing for route matching, links, nested layouts, params, search params, navigation, and fallback routes.
- Keep URL state, local component state, Context state, and location state in their appropriate ownership boundaries.
- Connect route params and search params to the async request criteria learned in Chapter 9.
- Current notes and exercises: `docs/react/chapter-10-routing-url-state/`, `src/learning/react/chapter-10-routing-url-state/`.

### 11. Performance, Memoization, and Code Splitting

- Separate React render work, reconciliation, DOM commits, browser paint, and bundle loading before optimizing.
- Use `memo`, `useMemo`, and `useCallback` only when measured work and stable identity make them useful.
- Prefer state colocation, minimal derived data, stable keys, and clear component boundaries before memoization.
- Use `Profiler` for render evidence and `lazy` with `Suspense` for meaningful page-level code-splitting boundaries.
- Current notes and exercises: `docs/react/chapter-11-performance-memoization/`, `src/learning/react/chapter-11-performance-memoization/`.

## Chapter Progress

| Chapter | Topic | Status | Main files |
| --- | --- | --- | --- |
| 01 | React introduction and app boundary | Done | `docs/react/chapter-01-react-introduction/` |
| 02 | JSX and component basics | Done | `docs/react/chapter-02-jsx-and-components/`, `src/learning/react/chapter-02-jsx-and-components/` |
| 03 | Props basics and TypeScript props types | Done | `docs/react/chapter-03-props-basics/` |
| 04 | State and events | Done | `docs/react/chapter-04-state-and-events/`, `src/learning/react/chapter-04-state-and-events/` |
| 05 | Lists, keys, and conditional rendering | Done | `docs/react/chapter-05-rendering-data/`, `src/learning/react/chapter-05-rendering-data/` |
| 06 | Forms and controlled components | Done | `docs/react/chapter-06-forms/`, `src/learning/react/chapter-06-forms/` |
| 07 | Effects and refs | Done | `docs/react/chapter-07-effects-and-refs/`, `src/learning/react/chapter-07-effects-and-refs/` |
| 08 | State architecture, reducer, context, and custom hooks | Done | `docs/react/chapter-08-state-architecture/`, `src/learning/react/chapter-08-state-architecture/` |
| 09 | Async data, fetch lifecycle, and UI state | Done | `docs/react/chapter-09-async-data/`, `src/learning/react/chapter-09-async-data/` |
| 10 | Routing, URL state, and navigation | Done | `docs/react/chapter-10-routing-url-state/`, `src/learning/react/chapter-10-routing-url-state/` |
| 11 | Performance, memoization, and code splitting | Done | `docs/react/chapter-11-performance-memoization/`, `src/learning/react/chapter-11-performance-memoization/` |

## Practice Principles

- Explain JavaScript runtime behavior first, then explain the React rules built on top of it.
- TSX exercises should distinguish TypeScript type-system behavior from emitted or runtime JavaScript behavior.
- Each example file should focus on one main concept instead of mixing many new concepts together.
- This README tracks the route and index only. Full explanations belong in `docs/react/`.
- Before adding a dependency, test framework, state library, or router, confirm that the current chapter actually needs it.
