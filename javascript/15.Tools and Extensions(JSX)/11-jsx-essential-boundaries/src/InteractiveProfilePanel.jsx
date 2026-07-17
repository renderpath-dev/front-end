// Goal:
// Verify JSX event props, Fragment, style object, boolean props and escaping

import {Fragment} from 'react';

const sharedButtonProps = {
  type: 'button',
  className: 'profile-action-button',
}

const profileRecord = {
  displayName: 'Ada Lovelace',
  titleText:"First programmer",
  unsafeBioHtml:'<strong>Math<strong> and code',
}

export function InteractiveProfilePanel({isExpanded, onToggle}) {
  const summaryText = `${profileRecord.displayName} : ${profileRecord.titleText}`;
  return (
    <Fragment>
      <article className = 'profile-panel' style = {{border:'1px solid #ccc', padding:'12px'}}
      >
        <label htmlFor = "profile-summary">Summary</label>
        <p id= 'profile=summary'>{summaryText}</p>

        <button
          {...sharedButtonProps}
          aria-expanded={isExpanded}
          onClick = {onToggle}
          >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>

        <p hidden = {!isExpanded}>
          {profileRecord.unsafeBioHtml}
        </p>
      </article>
    </Fragment>
  );
}
