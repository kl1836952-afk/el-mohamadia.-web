import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "maritime" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("app_theme");
      return (saved === "light" || saved === "maritime") ? saved : "maritime";
    } catch {
      return "maritime";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_theme", theme);
    } catch (e) {
      console.warn("Could not save theme to localStorage:", e);
    }

    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "maritime" ? "light" : "maritime"));
  };

  const isLight = theme === "light";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
