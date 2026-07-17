// Goal:
// load JSON Data through fetch API

export async function loadDashboardRecord () {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  if (!response.ok) {
    throw new Error(`HTTP status ${response.status}`);
  }

  return response.json();
}