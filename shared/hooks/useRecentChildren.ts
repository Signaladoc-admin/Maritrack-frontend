"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "recent-children";
const MAX = 5;

function readStorage(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useRecentChildren() {
  const [recentIds, setRecentIds] = useState<string[]>(readStorage);

  const push = useCallback((id: string) => {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { recentIds, push };
}
