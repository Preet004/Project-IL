import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
export type ColorPalette = 'emerald' | 'violet' | 'sunset' | 'ocean';

export interface PaletteInfo {
  id: ColorPalette;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  previewClass: string;
}

export const PALETTES: PaletteInfo[] = [
  {
    id: 'emerald',
    name: 'Quantum Emerald & Gold',
    primaryColor: '#10b981',
    secondaryColor: '#8b5cf6',
    accentColor: '#f59e0b',
    previewClass: 'from-emerald-400 to-violet-500'
  },
  {
    id: 'violet',
    name: 'Electric Ultraviolet',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ec4899',
    accentColor: '#06b6d4',
    previewClass: 'from-violet-500 to-pink-500'
  },
  {
    id: 'sunset',
    name: 'Solar Amber & Flame',
    primaryColor: '#f59e0b',
    secondaryColor: '#f43f5e',
    accentColor: '#10b981',
    previewClass: 'from-amber-400 to-rose-500'
  },
  {
    id: 'ocean',
    name: 'Cyber Sapphire',
    primaryColor: '#0ea5e9',
    secondaryColor: '#3b82f6',
    accentColor: '#14b8a6',
    previewClass: 'from-sky-400 to-blue-600'
  }
];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  colorPalette: ColorPalette;
  setColorPalette: (palette: ColorPalette) => void;
  activePaletteInfo: PaletteInfo;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('internsloom_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  const [colorPalette, setColorPaletteState] = useState<ColorPalette>(() => {
    const saved = localStorage.getItem('internsloom_palette') as ColorPalette;
    if (saved && ['emerald', 'violet', 'sunset', 'ocean'].includes(saved)) return saved;
    return 'emerald'; // Fresh new default: Quantum Emerald & Gold
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    localStorage.setItem('internsloom_theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    // Remove previous palette classes
    root.classList.remove('palette-emerald', 'palette-violet', 'palette-sunset', 'palette-ocean');
    root.classList.add(`palette-${colorPalette}`);
    root.dataset.palette = colorPalette;
    localStorage.setItem('internsloom_palette', colorPalette);
  }, [colorPalette]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setColorPalette = (palette: ColorPalette) => {
    setColorPaletteState(palette);
  };

  const activePaletteInfo = PALETTES.find((p) => p.id === colorPalette) || PALETTES[0];

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        setTheme, 
        colorPalette, 
        setColorPalette,
        activePaletteInfo
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
