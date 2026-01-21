export const THEMES = [
  'Agriculture',
  'Water',
  'Biodiversity',
  'Soil',
  'Climate & Health',
  'Forest',
  'Unknown',
] as const;

export type Theme = (typeof THEMES)[number];

export type ThemeColor = {
  base: string;
  light: string;
  dark: string;
};

export const THEMES_COLORS: Record<Theme, ThemeColor> = {
  Agriculture: {
    base: '#FF4F71',
    light: 'hsla(348, 85%, 58%, 0.2)',
    dark: 'hsla(8, 50%, 41%, 1)',
  },
  Water: {
    base: '#6E8DFF',
    light: 'hsla(221, 100%, 73%, 1)',
    dark: 'hsla(209, 35%, 44%, 1)',
  },
  Biodiversity: {
    base: '#FCB84B',
    light: 'hsla(37, 97%, 64%, 0.2)',
    dark: 'hsla(246, 100%, 71%, 0.2)',
  },
  Soil: {
    base: '#F1642E',
    light: 'hsla(17, 87%, 56%, 0.2)',
    dark: 'hsla(29, 59%, 26%, 1)',
  },
  'Climate & Health': {
    base: '#E44CFF',
    light: 'hsla(290, 69%, 51%, 0.2)',
    dark: 'hsla(254, 28%, 50%, 1)',
  },
  Forest: {
    base: '#19C37C',
    light: 'hsla(155, 77%, 43%, 0.2)',
    dark: 'hsla(167, 85%, 52%, 1)',
  },
  Unknown: {
    base: 'hsla(0, 0%, 79%, 1)',
    light: 'hsla(0, 0%, 79%, 0.2)',
    dark: 'hsla(0, 0%, 79%, 1)',
  },
};

export const DEFAULT_COLOR = 'hsla(0, 0%, 79%, 1)';
