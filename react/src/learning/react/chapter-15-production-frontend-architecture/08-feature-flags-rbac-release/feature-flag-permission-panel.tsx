import { useState } from 'react'

type Role = 'viewer' | 'seller-admin'
type Permission = 'checkout:preview' | 'checkout:publish'

type ReleaseFlag = {
  key: 'checkout-v2'
  enabled: boolean
  owner: string
  cleanupDate: string
}

type CapabilityDecision = {
  visible: boolean
  reason: string
}

const permissionsByRole: Record<Role, Permission[]> = {
  viewer: ['checkout:preview'],
  'seller-admin': ['checkout:preview', 'checkout:publish'],
}

function evaluateCapability(
  flag: ReleaseFlag,
  permissions: Permission[],
  requiredPermission: Permission,
): CapabilityDecision {
  if (!flag.enabled) {
    return { visible: false, reason: 'Release flag is disabled.' }
  }

  if (!permissions.includes(requiredPermission)) {
    return { visible: false, reason: 'UI permission is missing.' }
  }

  return { visible: true, reason: 'Flag and UI permission allow this capability.' }
}

export function FeatureFlagPermissionPanel() {
  const [flagEnabled, setFlagEnabled] = useState(true)
  const [role, setRole] = useState<Role>('viewer')
  const releaseFlag: ReleaseFlag = {
    key: 'checkout-v2',
    enabled: flagEnabled,
    owner: 'checkout-team',
    cleanupDate: '2026-09-30',
  }
  const decision = evaluateCapability(
    releaseFlag,
    permissionsByRole[role],
    'checkout:publish',
  )

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.8 Feature flags, RBAC UI, and release</p>
      <h2>Visibility requires both release intent and UI permission</h2>
      <div className="chapter15-actions">
        <label className="chapter15-control">
          <input
            checked={flagEnabled}
            onChange={(event) => setFlagEnabled(event.currentTarget.checked)}
            type="checkbox"
          />
          Enable checkout-v2
        </label>
        <label className="chapter15-control">
          Role
          <select onChange={(event) => setRole(event.currentTarget.value as Role)} value={role}>
            <option value="viewer">viewer</option>
            <option value="seller-admin">seller-admin</option>
          </select>
        </label>
      </div>
      <p className={decision.visible ? 'chapter15-pass' : 'chapter15-warn'}>
        {decision.visible ? 'Publish capability visible' : 'Publish capability hidden'}:{' '}
        {decision.reason}
      </p>
      <p className="chapter15-note">
        This UI guard improves experience. The server must still authorize the mutation.
      </p>
    </section>
  )
}
