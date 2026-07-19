"use client";

import { useState } from "react";

const storageKey = "chapter-one-practice-note";

export default function ClientBrowserApiExample() {
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("No browser action yet");

  function saveNote() {
    window.localStorage.setItem(storageKey, note);
    setMessage("Saved in localStorage");
  }

  function loadNote() {
    const storedNote = window.localStorage.getItem(storageKey) ?? "";
    setNote(storedNote);
    setMessage("Loaded from localStorage");
  }

  return (
    <section>
      <h1>Client browser API example</h1>
      <input
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button type="button" onClick={saveNote}>
        Save
      </button>
      <button type="button" onClick={loadNote}>
        Load
      </button>
      <p>{message}</p>
    </section>
  );
}
