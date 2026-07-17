// Goal:
// Handle input and submit events from a form.

const profileFormElement = document.querySelector('#profile-form');
const displayNameInputElement = document.querySelector('#display-name-input');
const previewOutputElement = document.querySelector('#preview-output');

displayNameInputElement.addEventListener('input', () => {
  previewOutputElement.textContent = displayNameInputElement.value;
});

profileFormElement.addEventListener('submit', (eventObject) => {
  eventObject.preventDefault();

  const profileFormData = new FormData(profileFormElement);
  const displayNameValue = profileFormData.get('displayName');

  console.log(displayNameValue);
});
