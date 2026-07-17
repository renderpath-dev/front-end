// Goal:
// Save and load JSON-compatible settings with localStorage.

const saveButtonElement = document.querySelector('#save-button');
const loadButtonElement = document.querySelector('#load-button');
const settingsOutputElement = document.querySelector('#settings-output');

const settingsStorageKey = 'demo.settings';

saveButtonElement.addEventListener('click', () => {
  const settingsRecord = {
    themeMode: 'dark',
    pageSize: 20,
  };

  localStorage.setItem(settingsStorageKey, JSON.stringify(settingsRecord));
  settingsOutputElement.textContent = 'Saved';
});

loadButtonElement.addEventListener('click', () => {
  const storedSettingsText = localStorage.getItem(settingsStorageKey);

  if (storedSettingsText === null) {
    settingsOutputElement.textContent = 'No settings';
    return;
  }

  const settingsRecord = JSON.parse(storedSettingsText);
  settingsOutputElement.textContent = JSON.stringify(settingsRecord, null, 2);
});
