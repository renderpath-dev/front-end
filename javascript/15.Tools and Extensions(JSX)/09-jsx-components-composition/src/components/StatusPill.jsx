// Goal:
// Export a small reusable UI component.

export function StatusPill({ isOnline }) {
  return <span>{isOnline ? 'Online' : 'Offline'}</span>;
}
