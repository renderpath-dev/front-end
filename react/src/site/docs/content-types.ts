export type InlineNode =
  | { type: 'text'; value: string }
  | { type: 'inlineCode'; value: string }
  | { type: 'strong'; children: InlineNode[] }
  | { type: 'emphasis'; children: InlineNode[] }
  | { type: 'delete'; children: InlineNode[] }
  | {
      type: 'link'
      href: string
      title?: string
      children: InlineNode[]
    }
  | { type: 'break' }

export type CalloutTone = 'note' | 'tip' | 'warning' | 'important' | 'caution'

export type BlockNode =
  | {
      type: 'heading'
      depth: 1 | 2 | 3 | 4 | 5 | 6
      id: string
      children: InlineNode[]
    }
  | { type: 'paragraph'; children: InlineNode[] }
  | {
      type: 'list'
      ordered: boolean
      start?: number
      items: Array<{
        checked?: boolean
        children: BlockNode[]
      }>
    }
  | {
      type: 'table'
      align: Array<'left' | 'center' | 'right' | null>
      head: InlineNode[][]
      body: InlineNode[][][]
    }
  | { type: 'blockquote'; children: BlockNode[] }
  | {
      type: 'callout'
      tone: CalloutTone
      title?: InlineNode[]
      children: BlockNode[]
    }
  | {
      type: 'code'
      language: string
      label: string
      value: string
    }

export interface ChapterDocument {
  id: string
  slug: string
  title: string
  sourcePath: string
  blocks: BlockNode[]
}
