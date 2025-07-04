// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        accent: '#b49d79',
        'accent-teal': '#17a2b8',
        'soft-white': '#f8f6f3',
        'deep-blue': '#0a1828',
        'rich-cream': '#f0e9db',
        'subtle-accent-bg': '#f5f1ea',
        'warm-gray': '#4a4a4a',
        'text-color': '#333333',
        'text-color-light': '#5a5a5a',
        'text-color-subtle': '#7a7a7a',
        'light-text-on-dark': '#e8e8e8',
        'border-soft': '#d8dce0',
        'border-medium': '#cccccc',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        sm: '0.375rem',
      },
      boxShadow: {
        soft: '0 8px 25px rgba(0, 0, 0, 0.05)',
        elevated: '0 12px 40px rgba(0, 0, 0, 0.08)',
        'gold-glow': '0 0 25px rgba(180, 157, 121, 0.3)',
        inset: 'inset 0 2px 4px rgba(0,0,0,0.06)',
      },
      transitionDuration: {
        DEFAULT: '0.35s',
        fast: '0.2s',
      }
    },
  },
  plugins: [],
};
export default config;