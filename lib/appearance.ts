import type { FontStyle, TextSize, ThemeMode } from "./types";

export interface Appearance {
  theme: ThemeMode;
  font: FontStyle;
  size: TextSize;
}

export const APPEARANCE_STORAGE_KEY = "portfolio-appearance";

/** Applies the visitor's choices as attributes on <html>; CSS in globals.css reacts to them. */
export function applyAppearance(appearance: Appearance) {
  const root = document.documentElement;
  root.setAttribute("data-bs-theme", appearance.theme);
  root.setAttribute("data-font", appearance.font);
  root.setAttribute("data-text-size", appearance.size);
}

export function readAppearance(defaults: Appearance): Appearance {
  const root = document.documentElement;
  return {
    theme: (root.getAttribute("data-bs-theme") as ThemeMode) || defaults.theme,
    font: (root.getAttribute("data-font") as FontStyle) || defaults.font,
    size: (root.getAttribute("data-text-size") as TextSize) || defaults.size,
  };
}

export function saveAppearance(appearance: Appearance) {
  try {
    localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearance));
  } catch {
    // Storage can be unavailable (private mode); the choice just won't persist.
  }
}

/**
 * Inline script run before the first paint so a saved theme
 * doesn't flash the default one on load.
 */
export const appearanceInitScript = `
try {
  var s = JSON.parse(localStorage.getItem("${APPEARANCE_STORAGE_KEY}") || "null");
  if (s) {
    var r = document.documentElement;
    if (s.theme === "light" || s.theme === "dark") r.setAttribute("data-bs-theme", s.theme);
    if (["sans", "serif", "mono"].indexOf(s.font) > -1) r.setAttribute("data-font", s.font);
    if (["sm", "md", "lg"].indexOf(s.size) > -1) r.setAttribute("data-text-size", s.size);
  }
} catch (e) {}
`;
