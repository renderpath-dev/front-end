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

### 5. State Modeling and Component Collaboration

- Derive the smallest useful state from the UI.
- Lifting state up, sharing state, preserving state, and resetting state.
- Use `useReducer` for more complex state transitions.
- Use `Context` for cross-level data sharing, but do not use it as a replacement for every prop.
- Related official docs: `Managing State`.

### 6. Effects, Refs, and Custom Hooks

- Refs store values that do not participate in rendering, or they provide access to DOM nodes.
- Effects synchronize React with external systems. Ordinary derived data should usually stay out of effects.
- Separate event logic from effect synchronization.
- When extracting a custom hook, keep the Hook call rules and dependency relationships clear.
- Related official docs: `Escape Hatches`.

### 7. Forms, Async Data, and Real App Practice

- Controlled components, form submission, validation, and user feedback.
- Loading, error, empty, and success state modeling.
- Fetching, refetching, pagination, sorting, and cache boundaries.
- Practice state flow with browser-local persistence first, then introduce a backend only when the requirement calls for it.
- Related local PDF topics: forms, asynchronous data, data fetching, and real-world React.

### 8. TypeScript in React

- TypeScript files containing JSX use the `.tsx` extension.
- The `jsx` option in `tsconfig` controls how JSX is handed to the rest of the toolchain.
- Props, event handlers, state, refs, and custom hooks all require a clear distinction between TypeScript type-system behavior and JavaScript runtime behavior.
- `@types/react` and `@types/react-dom` provide React and DOM types. They do not change runtime code.
- Related official docs: `Using TypeScript with React` and TypeScript Handbook `JSX`.

### 9. Styling, Testing, Performance, and Project Structure

- Start styling with plain CSS, then understand CSS modules, component-level styling, and SVG/import asset boundaries.
- Test verifiable TypeScript logic first, then expand to component behavior.
- Optimize performance only after locating a real issue. Then consider memoization, render splitting, or data-structure changes.
- Organize project structure around learning chapters and app boundaries. Avoid early abstractions.
- Related local PDF topics: styling, maintenance, testing, performance, and project structure.

## Chapter Progress

| Chapter | Topic | Status | Main files |
| --- | --- | --- | --- |
| 01 | React introduction and app boundary | Done | `docs/react/chapter-01-react-introduction/` |
| 02 | JSX and component basics | Done | `docs/react/chapter-02-jsx-and-components/`, `src/learning/react/chapter-02-jsx-and-components/` |
| 03 | Props basics and TypeScript props types | Done | `docs/react/chapter-03-props-basics/` |
| 04 | State and events | Planned | `src/learning/react/chapter-04-state-and-events/` |
| 05 | Lists, keys, and conditional rendering | Planned | `src/learning/react/chapter-05-rendering-data/` |
| 06 | Forms and controlled components | Planned | `src/learning/react/chapter-06-forms/` |
| 07 | Effects and refs | Planned | `src/learning/react/chapter-07-effects-and-refs/` |
| 08 | Reducer, context, and custom hooks | Planned | `src/learning/react/chapter-08-state-architecture/` |
| 09 | App practice and persistence | In progress | `src/sudoku/` |

## Practice Principles

- Explain JavaScript runtime behavior first, then explain the React rules built on top of it.
- TSX exercises should distinguish TypeScript type-system behavior from emitted or runtime JavaScript behavior.
- Each example file should focus on one main concept instead of mixing many new concepts together.
- This README tracks the route and index only. Full explanations belong in `docs/react/`.
- Before adding a dependency, test framework, state library, or router, confirm that the current chapter actually needs it.
