import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PortalHelpDeskModal } from '../portal-help-desk-modal'

describe('PortalHelpDeskModal', () => {
  it('opens dialog content through a portal and closes it', async () => {
    const user = userEvent.setup()

    render(<PortalHelpDeskModal />)

    await user.click(screen.getByRole('button', { name: /open sellerhub help desk/i }))

    expect(screen.getByRole('dialog', { name: /sellerhub help desk/i })).toHaveTextContent(
      'Portal target: document.body',
    )

    await user.click(screen.getByRole('button', { name: /close help desk/i }))

    expect(screen.queryByRole('dialog', { name: /sellerhub help desk/i })).not.toBeInTheDocument()
  })
})
