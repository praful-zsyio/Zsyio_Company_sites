// src/theme/theme.js
import { palettes } from "./colors";

const THEME_KEY = "theme";
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export function getSystemTheme() {
  if (typeof window === "undefined") return THEMES.LIGHT;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

export function getInitialTheme() {
  if (typeof window === "undefined") return THEMES.LIGHT;

  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === THEMES.LIGHT || saved === THEMES.DARK) return saved;

  return getSystemTheme();
}

export function applyTheme(theme) {
  if (typeof document === "undefined") return;

  const palette = palettes[theme];
  if (!palette) return;

  const root = document.documentElement;

  // set data-theme attr (if you need it in CSS)
  root.setAttribute("data-theme", theme);

  // write all CSS variables: --rosewater, --text, etc.
  Object.entries(palette).forEach(([token, value]) => {
    root.style.setProperty(`--${token}`, value);
  });

  // store preference
  window.localStorage.setItem(THEME_KEY, theme);
}
