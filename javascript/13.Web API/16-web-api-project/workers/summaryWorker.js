// Goal:
// Calculate text summary in a worker.

self.addEventListener('message', (eventObject) => {
  const { textValue } = eventObject.data;
  const wordCount = textValue.split(/\s+/).filter(Boolean).length;

  self.postMessage({ wordCount });
});
