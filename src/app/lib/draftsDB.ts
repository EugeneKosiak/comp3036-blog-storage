"use client";

interface Draft {
  id: number;
  text: string;
}

export function saveDraft(text: string): void {
  // TODO: Open 'BlogDrafts' DB, version 1
  const request = indexedDB.open("BlogDrafts", 1);
  // On upgrade, create 'drafts' object store with 'id' as keyPath
  request.onupgradeneeded = () => {
    const db = request.result;

    if (!db.objectStoreNames.contains("drafts")) {
      db.createObjectStore("drafts", { keyPath: "id" });
    }
  };
  // On success, add a draft with id (timestamp) and provided text
  request.onsuccess = () => {
    const db = request.result;

    const tx = db.transaction("drafts", "readwrite");
    const store = tx.objectStore("drafts");

    const draft: Draft = {
      id: Date.now(),
      text,
    };

    store.add(draft);
  };
}

export function loadDrafts(callback: (drafts: Draft[]) => void): void {
  // TODO: Open 'BlogDrafts' DB, version 1
  const request = indexedDB.open("BlogDrafts", 1);
  // On success, read all drafts from 'drafts' store and pass to callback
  request.onsuccess = () => {
    const db = request.result;

    const tx = db.transaction("drafts", "readonly");
    const store = tx.objectStore("drafts");

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      callback(getAllRequest.result as Draft[]);
    };
  };
}
