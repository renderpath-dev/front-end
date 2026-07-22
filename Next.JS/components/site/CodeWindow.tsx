import { highlightCode } from "@/lib/codeHighlighter";
import { CopyButton } from "@/components/site/CopyButton";

type CodeWindowProps = {
  title: string;
  language: string;
  code: string;
  description?: string;
  highlightedLines?: readonly number[];
  showLineNumbers?: boolean;
};

export async function CodeWindow({
  title,
  language,
  code,
  description,
  highlightedLines,
  showLineNumbers = true,
}: CodeWindowProps) {
  const highlightedCode = await highlightCode({
    code,
    language,
    highlightedLines,
    showLineNumbers,
  });

  return (
    <figure
      className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-sm shadow-slate-950/10"
      data-code-window={title}
    >
      <figcaption className="flex min-h-12 flex-wrap items-center gap-2 border-b border-slate-700 bg-slate-900 px-4 py-2">
        <span className="flex items-center gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-1 min-w-0 flex-1 truncate font-mono text-xs text-slate-200">
          {title}
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {language}
        </span>
        <CopyButton code={code} title={title} />
      </figcaption>
      <div className="code-window overflow-x-auto">{highlightedCode}</div>
      {description ? (
        <p className="border-t border-slate-800 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-slate-300">
          {description}
        </p>
      ) : null}
    </figure>
  );
}
