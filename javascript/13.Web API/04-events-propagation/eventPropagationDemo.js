// Goal:
// Verify event target, currentTarget, and event delegation.

const panelElement = document.querySelector('#panel');

panelElement.addEventListener('click', (eventObject) => {
  const clickedElement = eventObject.target;

  if (!(clickedElement instanceof HTMLElement)) {
    return;
  }

  if (!clickedElement.matches('.action-button')) {
    return;
  }

  console.log('target:', clickedElement.dataset.action);
  console.log('currentTarget:', eventObject.currentTarget.id);
});
