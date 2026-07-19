type CodeWindowProps = {
  title: string;
  language: string;
  code: string;
};

export function CodeWindow({ title, language, code }: CodeWindowProps) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-sm">
      <figcaption className="flex min-h-10 items-center gap-2 border-b border-slate-700 bg-slate-900 px-4">
        <span
          aria-hidden="true"
          className="size-3 rounded-full bg-[#ff5f57]"
        />
        <span
          aria-hidden="true"
          className="size-3 rounded-full bg-[#ffbd2e]"
        />
        <span
          aria-hidden="true"
          className="size-3 rounded-full bg-[#28c840]"
        />
        <span className="ml-2 font-mono text-xs text-slate-300">{title}</span>
        <span className="ml-auto text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {language}
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-200">
        <code data-language={language}>{code}</code>
      </pre>
    </figure>
  );
}
