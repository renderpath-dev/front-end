import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CodeWindow } from '../components/CodeWindow'

describe('CodeWindow', () => {
  it('renders a labeled, accessible syntax-highlighted code surface', () => {
    const { container } = render(
      <CodeWindow code={'const total: number = 2\nconsole.log(total)'} label="example.ts" language="ts" />,
    )

    expect(screen.getByText('example.ts')).toBeInTheDocument()
    expect(container.querySelector('pre')).toHaveTextContent('const total: number = 2')
    expect(container.querySelector('.token')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy example.ts code' })).toBeInTheDocument()
  })

  it('copies the original source and exposes a visible copied state', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

    render(<CodeWindow code="npm run build" label="Terminal" language="bash" />)
    await user.click(screen.getByRole('button', { name: 'Copy Terminal code' }))

    expect(writeText).toHaveBeenCalledWith('npm run build')
    expect(screen.getByText('Copied')).toBeInTheDocument()
  })

  it('falls back to plain text for an unknown language', () => {
    const { container } = render(
      <CodeWindow code="plain content" label="Unknown" language="made-up-language" />,
    )

    expect(container.querySelector('.code-window')).toHaveAttribute('data-language', 'plain')
    expect(container.querySelector('pre')).toHaveTextContent('plain content')
  })
})
