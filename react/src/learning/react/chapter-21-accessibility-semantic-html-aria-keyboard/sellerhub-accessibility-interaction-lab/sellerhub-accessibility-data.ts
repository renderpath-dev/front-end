export type OrderRow = {
  id: string
  customer: string
  status: 'Ready' | 'Delayed' | 'Review'
  total: string
}

export type AccessibilityReviewItem = {
  area: string
  requirement: string
  evidence: string
}

export type SellerHubAccessibilityScenario = {
  scenario: string
  owner: string
  evidence: string
}

export const sellerHubOrders: OrderRow[] = [
  { id: 'order-1042', customer: 'Mina Stone', status: 'Ready', total: '$128.00' },
  { id: 'order-1043', customer: 'Owen Park', status: 'Review', total: '$64.50' },
  { id: 'order-1044', customer: 'Nia Chen', status: 'Delayed', total: '$312.40' },
]

export const accessibilityReviewItems: AccessibilityReviewItem[] = [
  {
    area: 'Filter form',
    requirement: 'Visible label, description, and submit feedback',
    evidence: 'Labels use htmlFor and status text updates after submit',
  },
  {
    area: 'Orders table',
    requirement: 'Caption, scoped headers, and sortable button name',
    evidence: 'Table exposes caption and button inside column header',
  },
  {
    area: 'Help dialog',
    requirement: 'Dialog name, modal state, focus move, Escape close, focus return',
    evidence: 'Dialog moves focus to close button and restores opener focus',
  },
  {
    area: 'Settings validation',
    requirement: 'Error summary, invalid field state, and focus repair',
    evidence: 'Submit focuses first invalid field and exposes alert text',
  },
]

export const sellerHubAccessibilityScenarios: SellerHubAccessibilityScenario[] = [
  {
    scenario: 'Catalog search form',
    owner: 'Form field owner',
    evidence: 'Label, description, and submit status are programmatically related',
  },
  {
    scenario: 'Filter disclosure',
    owner: 'Disclosure button',
    evidence: 'aria-expanded follows open state and Escape closes the panel',
  },
  {
    scenario: 'Orders table',
    owner: 'Table semantics',
    evidence: 'caption, thead, tbody, and th scope expose row and column context',
  },
  {
    scenario: 'Order status live updates',
    owner: 'Live region',
    evidence: 'role status announces meaningful async state changes',
  },
  {
    scenario: 'Help desk dialog',
    owner: 'Modal dialog controller',
    evidence: 'dialog role, aria-modal, initial focus, trap, Escape, and focus return',
  },
  {
    scenario: 'Dashboard chart fallback',
    owner: 'Status or alert region',
    evidence: 'Loading, empty, and error text use status or alert semantics',
  },
  {
    scenario: 'Settings validation summary',
    owner: 'Validation state owner',
    evidence: 'aria-invalid and alert summary point to the invalid field',
  },
  {
    scenario: 'Notification toast',
    owner: 'Live region boundary',
    evidence: 'Only meaningful status changes are announced',
  },
  {
    scenario: 'Route navigation',
    owner: 'Page shell',
    evidence: 'main landmark and heading target support keyboard review',
  },
  {
    scenario: 'Skip to main content',
    owner: 'Document shell',
    evidence: 'Skip link target points to the main landmark',
  },
  {
    scenario: 'Empty state',
    owner: 'Content region',
    evidence: 'Empty state remains text content inside the expected landmark',
  },
]
