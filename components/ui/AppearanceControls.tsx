"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Moon, Sun, Type } from "lucide-react";
import portfolio from "@/portfolio.config";
import { applyAppearance, readAppearance, saveAppearance, type Appearance } from "@/lib/appearance";

const defaults: Appearance = {
  theme: portfolio.appearance.defaultTheme,
  font: portfolio.appearance.defaultFont,
  size: portfolio.appearance.defaultTextSize,
};

const fontOptions: { value: Appearance["font"]; label: string }[] = [
  { value: "sans", label: "Sans" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" },
];

const sizeOptions: { value: Appearance["size"]; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Default" },
  { value: "lg", label: "Large" },
];

interface OptionGroupProps<T extends string> {
  name: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

function OptionGroup<T extends string>({ name, options, value, onChange }: OptionGroupProps<T>) {
  return (
    <div className="btn-group w-100" role="group" aria-label={name}>
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        return (
          <Fragment key={option.value}>
            <input
              type="radio"
              className="btn-check"
              name={name}
              id={id}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label className="btn btn-glass btn-sm" htmlFor={id}>
              {option.label}
            </label>
          </Fragment>
        );
      })}
    </div>
  );
}

/** Theme toggle button and a text format menu (font + size). */
export default function AppearanceControls() {
  const [appearance, setAppearance] = useState<Appearance>(defaults);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sync with whatever the init script applied before hydration
  useEffect(() => {
    setAppearance(readAppearance(defaults));
  }, []);

  // Close the menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const update = (changes: Partial<Appearance>) => {
    const next = { ...appearance, ...changes };
    setAppearance(next);
    applyAppearance(next);
    saveAppearance(next);
  };

  const isDark = appearance.theme === "dark";

  return (
    <>
      <button
        type="button"
        className="btn btn-glass btn-icon"
        onClick={() => update({ theme: isDark ? "light" : "dark" })}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Light theme" : "Dark theme"}
      >
        {isDark ? <Sun size={19} /> : <Moon size={19} />}
      </button>

      <div className="position-relative" ref={menuRef}>
        <button
          type="button"
          className="btn btn-glass btn-icon"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Text format"
          aria-expanded={menuOpen}
          title="Text format"
        >
          <Type size={19} />
        </button>

        {menuOpen && (
          <div className="appearance-menu" role="dialog" aria-label="Text format">
            <p className="eyebrow mb-3">Text format</p>

            <div className="mb-3">
              <div className="small fw-semibold mb-2">Font</div>
              <OptionGroup
                name="font"
                options={fontOptions}
                value={appearance.font}
                onChange={(font) => update({ font })}
              />
            </div>

            <div className="mb-3">
              <div className="small fw-semibold mb-2">Text size</div>
              <OptionGroup
                name="size"
                options={sizeOptions}
                value={appearance.size}
                onChange={(size) => update({ size })}
              />
            </div>

            <button type="button" className="btn btn-link btn-sm p-0 text-accent" onClick={() => update(defaults)}>
              Reset to default
            </button>
          </div>
        )}
      </div>
    </>
  );
}
