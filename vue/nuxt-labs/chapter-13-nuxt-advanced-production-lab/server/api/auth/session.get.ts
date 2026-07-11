import type { SessionStatusResponse } from "../../../shared/types/auth";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session.user ?? null;

  return {
    status: user ? "authenticated" : "anonymous",
    user,
  } satisfies SessionStatusResponse;
});
