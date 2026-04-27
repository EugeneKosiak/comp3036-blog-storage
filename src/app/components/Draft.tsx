"use client";
import { useEffect, useState } from "react";

export default function Draft() {
  const [draft, setDraft] = useState<string>("");

  useEffect(() => {
    // TODO: Save 'draft' as 'My temp draft...' in sessionStorage when component mounts
    sessionStorage.setItem("draft", "My temp draft...");
    // Then, read it back and set it to state
    const saved = sessionStorage.getItem("draft");
    if (saved) {
      setDraft(saved);
    }
  }, []);

  return (
    <div>
      <h2>Tab Draft</h2>
      <p>Draft: {draft || "None"}</p>
    </div>
  );
}
