'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type MobaTheme = 'blue-essence' | 'red-essence' | 'prestige';

const THEME_LABELS: Record<MobaTheme, string> = {
  'blue-essence': 'Esencia Azul',
  'red-essence': 'Esencia Roja',
  'prestige': 'Prestigio',
};

interface ThemeContextValue {
  theme: MobaTheme;
  setTheme: (t: MobaTheme) => void;
  cycleTheme: () => void;
  themeLabel: string;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'blue-essence',
  setTheme: () => {},
  cycleTheme: () => {},
  themeLabel: THEME_LABELS['blue-essence'],
});

export function useMobaTheme() {
  return useContext(ThemeContext);
}

const STORAGE_KEY = 'moba-sage-theme';
const ALL_THEMES: MobaTheme[] = ['blue-essence', 'red-essence', 'prestige'];

export function MobaThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<MobaTheme>('blue-essence');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as MobaTheme | null;
      if (saved && ALL_THEMES.includes(saved)) {
        setThemeState(saved);
      }
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    ALL_THEMES.forEach(t => root.classList.remove(`theme-${t}`));
    root.classList.add(`theme-${theme}`);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch { /* ignore */ }
  }, [theme, mounted]);

  const setTheme = useCallback((t: MobaTheme) => {
    setThemeState(t);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState(prev => {
      const idx = ALL_THEMES.indexOf(prev);
      return ALL_THEMES[(idx + 1) % ALL_THEMES.length];
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themeLabel: THEME_LABELS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}
