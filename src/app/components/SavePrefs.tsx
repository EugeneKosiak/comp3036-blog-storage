"use client";
import { useEffect, useState } from "react";

export default function SavePrefs() {
  const [prefs, setPrefs] = useState<string>("");

  useEffect(() => {
    // TODO: Save 'prefs' as 'tag:tech' in localStorage when component mounts
    const savedPrefs = localStorage.getItem("prefs");
    // Then, read it back and set it to state

      if (savedPrefs) {
        setPrefs(savedPrefs);
      } else {
        localStorage.setItem("prefs", "tag:tech");
        setPrefs("tag:tech");
      }
    }, []);

  return (
    <div>
      <h2>Filter Preference</h2>
      <p>Current: {prefs || "None"}</p>
    </div>
  );
}
