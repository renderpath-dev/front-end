export function useSessionStatus() {
  const sessionState = useUserSession();

  return {
    loggedIn: sessionState.loggedIn,
    user: sessionState.user,
    session: sessionState.session,
  };
}
