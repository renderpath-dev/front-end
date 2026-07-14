export function SellerHubParamDetailPanel({
  entityId,
  entityName,
  entityType,
}: {
  entityId: string
  entityName: string
  entityType: string
}) {
  return (
    <section aria-labelledby={`${entityType}-detail-title`} className="sellerhub-status">
      <h3 id={`${entityType}-detail-title`}>{entityType} route param detail</h3>
      <p>
        Route param <code className="route-code">{entityId}</code> selected {entityName}.
      </p>
    </section>
  )
}
