
"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";

const ThemeEffect = () => {
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  useEffect(() => {
      // const html = document.documentElement;
      const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return null;
};

export default ThemeEffect;
