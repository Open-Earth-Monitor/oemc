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
    base: 'hsla(8, 100%, 76%, 1)',
    light: 'hsla(8, 100%, 76%, 0.2)',
    dark: 'hsla(8, 50%, 41%, 1)',
  },
  Water: {
    base: 'hsla(209, 94%, 87%, 1)',
    light: 'hsla(209, 94%, 87%, 0.2)',
    dark: 'hsla(209, 35%, 44%, 1)',
  },
  Biodiversity: {
    base: 'hsla(60, 90%, 84%, 1)',
    light: 'hsla(60, 90%, 84%, 0.2)',
    dark: 'hsla(60, 30%, 39%, 1)',
  },
  Soil: {
    base: 'hsla(29, 77%, 78%, 1)',
    light: 'hsla(29, 77%, 78%, 0.2)',
    dark: 'hsla(29, 59%, 26%, 1)',
  },
  'Climate & Health': {
    base: 'hsla(254, 78%, 87%, 1)',
    light: 'hsla(254, 78%, 87%, 0.2)',
    dark: 'hsla(254, 28%, 50%, 1)',
  },
  Forest: {
    base: 'hsla(133, 97%, 85%, 1)',
    light: 'hsla(133, 97%, 85%, 0.2)',
    dark: 'hsla(134, 17%, 34%, 1)',
  },
  Unknown: {
    base: 'hsla(0, 0%, 79%, 1)',
    light: 'hsla(0, 0%, 79%, 0.2)',
    dark: 'hsla(0, 0%, 79%, 1)',
  },
};
