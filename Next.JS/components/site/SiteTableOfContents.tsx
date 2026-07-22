import {
  ActiveTableOfContents,
  type TableOfContentsItem,
} from "@/components/site/ActiveTableOfContents";

export function SiteTableOfContents({
  items,
}: {
  items: readonly TableOfContentsItem[];
}) {
  return <ActiveTableOfContents items={items} />;
}
