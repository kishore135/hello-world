import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: {
          green: '#2d5a27',
          stripe: '#345e2d',
          line: '#f0f0f0',
        },
        home: {
          primary: '#3b82f6',
          glow: '#60a5fa',
        },
        away: {
          primary: '#ef4444',
          glow: '#f87171',
        },
        surface: {
          base: '#0a0e14',
          card: '#111827',
          elevated: '#1e2a3a',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-cursor': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
