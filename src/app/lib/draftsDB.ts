"use client";

interface Draft {
  id: number;
  text: string;
}
export function saveDraft(text: string, onSaved?: () => void): void {
  // TODO: Open 'BlogDrafts' DB, version 1
  const request = indexedDB.open("BlogDrafts", 1);

  // On upgrade, create 'drafts' object store with 'id' as keyPath
  request.onupgradeneeded = () => {
    const db = request.result;

    if (!db.objectStoreNames.contains("drafts")) {
      db.createObjectStore("drafts", { keyPath: "id" });
    }
  };
  // Display error if DB open fails
  request.onerror = () => {
    console.error("IndexedDB open failed");
  };

  // On success, add a draft with id (timestamp) and provided text
  request.onsuccess = () => {
    const db = request.result;

    // Log error if drafts table does not exist
    if (!db.objectStoreNames.contains("drafts")) {
      console.error("Missing object store 'drafts'");
      return;
    }

    const tx = db.transaction("drafts", "readwrite");
    const store = tx.objectStore("drafts");

    store.add({
      id: Date.now(),
      text,
    });

    // Call onSaved button when transaction finishes
    tx.oncomplete = () => {
      onSaved?.();
    };
  };
}

export function loadDrafts(callback: (drafts: Draft[]) => void): void {
  // TODO: Open 'BlogDrafts' DB, version 1
  const request = indexedDB.open("BlogDrafts", 1);

  // Runs if the database version is created or needs update
  request.onupgradeneeded = () => {
    const db = request.result;

    // Log error if drafts table does not exist. Create database if it doesn't exist
    if (!db.objectStoreNames.contains("drafts")) {
      db.createObjectStore("drafts", { keyPath: "id" });
    }
  };

  // On success, read all drafts from 'drafts' store and pass to callback
  request.onsuccess = () => {
    const db = request.result;

    // If the 'drafts' table does not exist, don’t read from it. Return an empty list and stop.
    if (!db.objectStoreNames.contains("drafts")) {
      console.error("Missing object store 'drafts'");
      callback([]);
      return;
    }

    const tx = db.transaction("drafts", "readonly");
    const store = tx.objectStore("drafts");

    const req = store.getAll();

    req.onsuccess = () => {
      callback(req.result as Draft[]);
    };
  };
}

