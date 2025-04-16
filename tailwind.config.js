/** @type {import('tailwindcss').Config} */

/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');

module.exports = {
  darkMode: ['class'],
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    container: {
      DEFAULT: '1rem', // Default padding for medium screens
      sm: '1rem', // Small screens
      md: '1rem', // Medium screens
      lg: '2rem', // Large screens
      xl: '4rem', // Extra large screens
      '2xl': '6rem', // Extra-extra large screens
      '3xl': '10rem', // Extra-extra-extra large screens
    },
    extend: {
      font: {
        inter: ['var(--font-inter)'],
        satoshi: ['var(--font-satoshi)'],
      },
      colors: {
        black: {
          500: '#09131D',
        },
        white: {
          50: '#FFFFFF',
          500: '#FFFFE6',
        },
        gray: {
          600: 'hsl(220, 7%, 40%)',
        },
        brand: {
          50: 'hsl(210, 9%, 22%, 1)', // no ui kit
          100: 'hsl(211, 52%, 15%)',
          150: 'hsl(209, 53%, 14%)',
          200: 'hsl(210, 53%, 13%)',
          300: 'hsl(211, 53%, 12%)',
          400: 'hsl(210, 54%, 9%)',
          500: 'hsl(210, 53%, 7%)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          500: 'hsl(60, 100%, 95%)',
          600: 'hsl(60, 16%, 76%)',
          700: 'hsl(180, 3%, 55%)',
          800: 'hsl(180, 3%, 35%)',
          900: 'hsl(184, 5%, 19%)',
          950: 'hsl(60, 6%, 10%,)',
          1000: 'hsl(60, 5%, 19%)', // no ui kit

          foreground: 'hsl(var(--secondary-foreground))',
        },
        alert: 'hsl(167, 85%, 52%)',
        monitors: {
          blue: 'hsla(209, 94%, 87%, 1)',
          green: 'hsla(133, 97%, 85%, 1)',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          green: 'hsl(var(--accent-green))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      padding: {
        7.5: '1.875rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), forms, typography],
};
