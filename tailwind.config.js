/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#07090D',
        green: { DEFAULT: '#22C55E', dark: '#16A34A', light: '#4ADE80', xlight: '#86EFAC' },
        card: '#111520',
        border: '#1E2530',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
