import type { ContentCardItem, ContentKind } from "../../shared/types/content";

export interface ContentEntryInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly date?: string;
}

export function toContentCardItem(
  entry: ContentEntryInput,
  kind: ContentKind,
): ContentCardItem {
  return {
    title: entry.title,
    description: entry.description,
    path: entry.path,
    kind,
    date: entry.date,
  };
}
