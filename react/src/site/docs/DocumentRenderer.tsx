import { createElement } from 'react'
import type { ReactNode } from 'react'
import { CodeWindow } from '../components/CodeWindow'
import type { BlockNode, CalloutTone, ChapterDocument, InlineNode } from './content-types'

export function DocumentRenderer({ document }: { document: ChapterDocument }) {
  return (
    <div className="docs-document" data-chapter-id={document.id}>
      {document.blocks.map((block, index) => (
        <BlockRenderer block={block} key={`${block.type}-${index}`} />
      ))}
    </div>
  )
}

function BlockRenderer({ block }: { block: BlockNode }) {
  switch (block.type) {
    case 'heading': {
      const headingTag = `h${block.depth}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return createElement(
        headingTag,
        { className: `docs-heading docs-heading-${block.depth}`, id: block.id },
        <InlineRenderer nodes={block.children} />,
      )
    }
    case 'paragraph':
      return (
        <p>
          <InlineRenderer nodes={block.children} />
        </p>
      )
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag start={block.ordered ? block.start : undefined}>
          {block.items.map((item, index) => (
            <li data-checked={item.checked} key={index}>
              {item.children.map((child, childIndex) => (
                <BlockRenderer block={child} key={`${child.type}-${childIndex}`} />
              ))}
            </li>
          ))}
        </ListTag>
      )
    }
    case 'table':
      return <DocumentationTable table={block} />
    case 'blockquote':
      return (
        <blockquote>
          {block.children.map((child, index) => (
            <BlockRenderer block={child} key={`${child.type}-${index}`} />
          ))}
        </blockquote>
      )
    case 'callout':
      return <Callout block={block} />
    case 'code':
      return (
        <CodeWindow code={block.value} label={block.label} language={block.language} />
      )
  }
}

function DocumentationTable({ table }: { table: Extract<BlockNode, { type: 'table' }> }) {
  return (
    <div className="docs-table-scroll" tabIndex={0}>
      <table>
        <thead>
          <tr>
            {table.head.map((cell, index) => (
              <th key={index} style={{ textAlign: table.align[index] ?? undefined }} scope="col">
                <InlineRenderer nodes={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.body.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ textAlign: table.align[cellIndex] ?? undefined }}>
                  <InlineRenderer nodes={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ block }: { block: Extract<BlockNode, { type: 'callout' }> }) {
  return (
    <aside className={`docs-callout docs-callout-${block.tone}`}>
      {block.title ? (
        <strong className="docs-callout-title">
          <CalloutIcon tone={block.tone} />
          <InlineRenderer nodes={block.title} />
        </strong>
      ) : null}
      {block.children.map((child, index) => (
        <BlockRenderer block={child} key={`${child.type}-${index}`} />
      ))}
    </aside>
  )
}

function InlineRenderer({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((node, index) => (
        <InlineNodeRenderer key={`${node.type}-${index}`} node={node} />
      ))}
    </>
  )
}

function InlineNodeRenderer({ node }: { node: InlineNode }): ReactNode {
  switch (node.type) {
    case 'text':
      return node.value
    case 'inlineCode':
      return <code>{node.value}</code>
    case 'strong':
      return (
        <strong>
          <InlineRenderer nodes={node.children} />
        </strong>
      )
    case 'emphasis':
      return (
        <em>
          <InlineRenderer nodes={node.children} />
        </em>
      )
    case 'delete':
      return (
        <del>
          <InlineRenderer nodes={node.children} />
        </del>
      )
    case 'link': {
      const isExternal = /^https?:\/\//.test(node.href)
      return (
        <a
          href={node.href}
          rel={isExternal ? 'noreferrer' : undefined}
          target={isExternal ? '_blank' : undefined}
          title={node.title}
        >
          <InlineRenderer nodes={node.children} />
        </a>
      )
    }
    case 'break':
      return <br />
  }
}

function CalloutIcon({ tone }: { tone: CalloutTone }) {
  const path =
    tone === 'warning' || tone === 'caution'
      ? 'M12 3 2.5 20h19Zm0 6v5m0 3v.01'
      : tone === 'tip'
        ? 'M9 18h6m-5 3h4m4-11a6 6 0 1 0-12 0c0 2.2 1.2 3.6 2.5 4.8.8.7 1.2 1.5 1.2 2.2h4.6c0-.7.4-1.5 1.2-2.2C16.8 13.6 18 12.2 18 10Z'
        : 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-11v6m0-10v.01'

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}
