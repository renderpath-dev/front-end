"use client";

import { useState } from "react";

const storageKey = "next-boundary-lab-note";

export function ClientStoragePanel() {
  const [draft, setDraft] = useState("");
  const [storedValue, setStoredValue] = useState("Not loaded");
  const [status, setStatus] = useState(
    "Use the buttons to access localStorage in the browser.",
  );

  function handleSave() {
    try {
      window.localStorage.setItem(storageKey, draft);
      setStoredValue(draft || "Stored as an empty string");
      setStatus("Saved from a Client Component event handler.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown storage error";
      setStatus(`Storage unavailable: ${message}`);
    }
  }

  function handleLoad() {
    try {
      const value = window.localStorage.getItem(storageKey);
      setStoredValue(value ?? "No value stored");
      setStatus("Loaded from a Client Component event handler.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown storage error";
      setStatus(`Storage unavailable: ${message}`);
    }
  }

  return (
    <section className="card" aria-labelledby="storage-panel-heading">
      <h2 id="storage-panel-heading">Browser-only storage</h2>
      <div className="control-stack">
        <label htmlFor="storage-note">Local note</label>
        <input
          id="storage-note"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Enter a value"
        />
        <div className="button-row">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleLoad}>
            Load
          </button>
        </div>
        <p>
          Stored value: <code>{storedValue}</code>
        </p>
        <p className="supporting-text">{status}</p>
      </div>
      <p className="supporting-text">
        <code>localStorage</code> belongs here because it does not exist in the
        server runtime.
      </p>
    </section>
  );
}
