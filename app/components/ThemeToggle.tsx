'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'jnwync-theme';
const THEME_EVENT = 'jnwync:theme';
const THEME_COLOR: Record<Theme, string> = { dark: '#0d1310', light: '#f6f6ee' };

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => (meta.content = THEME_COLOR[theme]));
  window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
}

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

const getServerSnapshot = (): Theme | null => null;

/**
 * Light / dark switch. The resolved theme lives on <html data-theme>, set
 * before first paint by the layout script (stored choice, else OS
 * preference, else dark). The icon shown is the weather you can switch to
 * and is chosen by CSS from that attribute, so the button renders correctly
 * before hydration. A choice persists in localStorage; until one is made the
 * page keeps following the OS setting.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, currentTheme, getServerSnapshot);

  useEffect(() => {
    const osLight = window.matchMedia('(prefers-color-scheme: light)');
    const followOs = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        // Storage unavailable: nothing was chosen, so follow the OS.
      }
      if (stored === 'light' || stored === 'dark') return;
      applyTheme(osLight.matches ? 'light' : 'dark');
    };
    osLight.addEventListener('change', followOs);
    return () => osLight.removeEventListener('change', followOs);
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode: the choice lasts for this page only.
    }
  };

  const label =
    theme === 'dark' ? 'Switch to light theme' : theme === 'light' ? 'Switch to dark theme' : 'Toggle color theme';

  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle ${className}`.trim()}
      aria-label={label}
      title={label}
    >
      <Sun className="tt-sun h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
      <Moon className="tt-moon h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
    </button>
  );
}
