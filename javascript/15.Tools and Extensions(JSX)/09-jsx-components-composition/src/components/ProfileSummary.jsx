// Goal:
// Compose a profile summary from props and another component.

import { StatusPill } from './StatusPill.jsx';

export function ProfileSummary({ displayName,isOnline }) {
  return (
    <article>
      <h2>{displayName}</h2>
      <StatusPill isOnline={isOnline} />
    </article>
  );
}
