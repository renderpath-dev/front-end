import type { AccountProfileResponse } from "../../../shared/types/auth";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  return {
    user: session.user,
    summary: "Profile data is protected by server-side session authority.",
  } satisfies AccountProfileResponse;
});
