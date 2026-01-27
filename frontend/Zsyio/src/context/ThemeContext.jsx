// src/theme/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { applyTheme, getInitialTheme, THEMES } from "../data/theme";

const ThemeContext = createContext({
  theme: THEMES.LIGHT,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
      applyTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
