// Goal:
// Fetch JSON data and support request cancellation.

const loadPostButtonElement = document.querySelector('#load-post-button');
const cancelButtonElement = document.querySelector('#cancel-button');
const resultOutputElement = document.querySelector('#result-output');

let activeController = null;

loadPostButtonElement.addEventListener('click', async () => {
  activeController = new AbortController();
  resultOutputElement.textContent = 'Loading...';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      signal: activeController.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const postRecord = await response.json();
    resultOutputElement.textContent = JSON.stringify(postRecord, null, 2);
  } catch (requestError) {
    resultOutputElement.textContent = requestError.name;
  }
});

cancelButtonElement.addEventListener('click', () => {
  activeController?.abort();
});
