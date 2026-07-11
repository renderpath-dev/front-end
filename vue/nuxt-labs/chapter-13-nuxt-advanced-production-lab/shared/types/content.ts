export type ContentKind = "docs" | "blog";

export interface ContentCardItem {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly kind: ContentKind;
  readonly date?: string;
}
