import "server-only";

import type { JSX } from "react";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import type { Element, Root } from "hast";
import type { BundledLanguage, BundledTheme, Highlighter } from "shiki";
import { getSingletonHighlighter } from "shiki";

const highlightedLanguages = [
  "tsx",
  "ts",
  "typescript",
  "jsx",
  "js",
  "javascript",
  "json",
  "css",
] satisfies BundledLanguage[];

const highlightedThemes = [
  "github-light",
  "github-dark",
] satisfies BundledTheme[];

const highlighterPromise = getSingletonHighlighter({
  langs: highlightedLanguages,
  themes: highlightedThemes,
});

const languageAliases: Record<string, BundledLanguage> = {
  css: "css",
  js: "js",
  javascript: "javascript",
  jsx: "jsx",
  json: "json",
  ts: "ts",
  tsx: "tsx",
  typescript: "typescript",
};

export type HighlightCodeOptions = {
  code: string;
  language: string;
  highlightedLines?: readonly number[];
  showLineNumbers?: boolean;
};

export async function highlightCode({
  code,
  language,
  highlightedLines = [],
  showLineNumbers = true,
}: HighlightCodeOptions): Promise<JSX.Element> {
  const highlighter = await highlighterPromise;
  const languageKey = normalizeLanguage(language);
  const tree = highlighter.codeToHast(code.trimEnd(), {
    lang: languageKey,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  annotateTree(tree, {
    highlightedLines: new Set(highlightedLines),
    showLineNumbers,
    language,
  });

  return toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}

function normalizeLanguage(language: string): BundledLanguage {
  return languageAliases[language.toLowerCase()] ?? "tsx";
}

function annotateTree(
  root: Root,
  options: {
    highlightedLines: ReadonlySet<number>;
    showLineNumbers: boolean;
    language: string;
  },
) {
  let currentLine = 0;

  visitElement(root, (element) => {
    if (element.tagName === "pre") {
      element.properties = {
        ...element.properties,
        class: mergeClassName(
          element.properties?.class,
          options.showLineNumbers
            ? "code-window-pre code-window-numbered"
            : "code-window-pre",
        ),
      };
    }

    if (element.tagName === "code") {
      element.properties = {
        ...element.properties,
        class: mergeClassName(element.properties?.class, "code-window-code"),
        "data-language": options.language,
      };
    }

    if (element.tagName === "span" && hasClassName(element, "line")) {
      currentLine += 1;
      const isHighlighted = options.highlightedLines.has(currentLine);

      element.properties = {
        ...element.properties,
        class: mergeClassName(
          element.properties?.class,
          isHighlighted
            ? "code-window-line code-window-line-highlighted"
            : "code-window-line",
        ),
        "data-line": String(currentLine),
      };
    }
  });
}

function visitElement(
  node: Root | Element,
  visitor: (element: Element) => void,
) {
  for (const child of node.children) {
    if (child.type !== "element") {
      continue;
    }

    visitor(child);
    visitElement(child, visitor);
  }
}

function hasClassName(element: Element, className: string) {
  const value = element.properties?.class;

  if (Array.isArray(value)) {
    return value.includes(className);
  }

  return typeof value === "string" && value.split(" ").includes(className);
}

function mergeClassName(
  currentValue: Element["properties"][string],
  additionalClassName: string,
) {
  if (Array.isArray(currentValue)) {
    return [...currentValue, additionalClassName].join(" ");
  }

  if (typeof currentValue === "string" && currentValue.length > 0) {
    return `${currentValue} ${additionalClassName}`;
  }

  return additionalClassName;
}

export type CodeHighlighterInstance = Highlighter;
