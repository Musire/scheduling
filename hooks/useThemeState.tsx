"use client";
import { useCallback, useEffect, useState } from "react";

export default function useThemeState() {
  // 1. Initialize state lazily from localStorage to avoid an effect during mount
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  });

  // 2. Synchronize the DOM class whenever `isDark` changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // 3. Toggle theme function
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggleTheme };
}
