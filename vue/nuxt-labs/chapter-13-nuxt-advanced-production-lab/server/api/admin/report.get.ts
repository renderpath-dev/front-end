import { requireRole } from "../../utils/authorization";
import type { AdminReportResponse } from "../../../shared/types/auth";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  requireRole(session.user, "admin");

  const runtimeConfig = useRuntimeConfig(event);

  return {
    reportId: "advanced-report-001",
    generatedFor: session.user,
    privateConfigAvailable: Boolean(runtimeConfig.privateReportSecret),
    records: [
      "Server route checked a sealed cookie session.",
      "Role authorization ran on the server.",
      "Private runtime config stayed server-only.",
    ],
  } satisfies AdminReportResponse;
});
