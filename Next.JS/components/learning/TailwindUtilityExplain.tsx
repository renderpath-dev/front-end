type UtilityExplanation = {
  utility: string;
  cssMeaning: string;
  why: string;
};

export function TailwindUtilityExplain({
  items,
}: {
  items: readonly UtilityExplanation[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <thead className="bg-muted-surface text-foreground">
          <tr>
            <th className="border-b border-border px-4 py-3 font-semibold">
              Utility
            </th>
            <th className="border-b border-border px-4 py-3 font-semibold">
              CSS meaning
            </th>
            <th className="border-b border-border px-4 py-3 font-semibold">
              Why it is used
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.utility}>
              <td className="px-4 py-3 align-top">
                <code>{item.utility}</code>
              </td>
              <td className="px-4 py-3 align-top text-muted">
                <code>{item.cssMeaning}</code>
              </td>
              <td className="px-4 py-3 align-top text-muted">{item.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
