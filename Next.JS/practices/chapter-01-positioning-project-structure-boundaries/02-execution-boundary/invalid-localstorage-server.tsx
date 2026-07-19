export default function InvalidLocalStorageServerExample() {
  const storedValue = localStorage.getItem("chapter-one-practice-note");

  return <p>{storedValue}</p>;
}
