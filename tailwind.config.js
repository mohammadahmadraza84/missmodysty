/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          50:  '#FBF0F4',
          100: '#F5D8E3',
          200: '#EBB5CB',
          300: '#DA8DAD',
          400: '#C46E93',
          500: '#A85078',
          600: '#8A3A5E',
          700: '#712E4C',
          800: '#55223A',
          900: '#5E2D40',
        },
        gold: {
          300: '#E8D3A8',
          400: '#DEC08A',
          500: '#D4AF7A',
          600: '#B8935A',
        },
        mauve:  '#C4849A',
        ivory:  '#FDF7F0',
        blush:  '#F5DDD5',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF7A' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
