// Goal:
// Compose the application UI from smaller components.

import { ProfileSummary } from './components/ProfileSummary.jsx';

export function App() {
  return (
    <main>
      <ProfileSummary displayName="Ada" isOnline={true} />
      <ProfileSummary displayName="Brendan" isOnline={false} />
    </main>
  );
}
