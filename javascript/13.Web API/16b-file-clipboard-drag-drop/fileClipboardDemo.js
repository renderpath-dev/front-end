// Goal:
// Read user-provided files and copy derived text to the clipboard.

const fileInput = document.querySelector('#file-input');
const copyButton = document.querySelector('#copy-button');
const dropZone = document.querySelector('#drop-zone');
const fileOutput = document.querySelector('#file-output');
const previewImage = document.querySelector('#preview-image');

let currentSummary = 'No file selected.';

async function inspectFile(file) {
  currentSummary = [
    `Name: ${file.name}`,
    `Size: ${file.size} bytes`,
    `Type: ${file.type || 'unknown'}`,
  ].join('\n');

  fileOutput.textContent = currentSummary;

  if (file.type.startsWith('image/')) {
    const objectUrl = URL.createObjectURL(file);
    previewImage.src = objectUrl;

    previewImage.addEventListener(
      'load',
      () => {
        URL.revokeObjectURL(objectUrl);
      },
      { once: true },
    );
    return;
  }

  previewImage.removeAttribute('src');

  if (file.type === 'text/plain') {
    const text = await file.text();
    fileOutput.textContent = `${currentSummary}\n\nPreview:\n${text.slice(0, 500)}`;
  }
}

fileInput.addEventListener('change', async () => {
  const [file] = fileInput.files;

  if (file) {
    await inspectFile(file);
  }
});

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropZone.addEventListener('drop', async (event) => {
  event.preventDefault();

  const [file] = event.dataTransfer.files;

  if (file) {
    await inspectFile(file);
  }
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(currentSummary);
    copyButton.textContent = 'Copied';
  } catch (error) {
    console.error(error);
    copyButton.textContent = 'Copy failed';
  }
});
