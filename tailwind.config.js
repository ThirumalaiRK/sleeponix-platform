/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory': '#FAFAF8',
        'ivory-dark': '#F4F1E8',
        'deep-indigo': '#1A1A1A',
        'slate-gray': '#4E4E4E',
        'gold-champagne': '#C6A66D',
        'mint-glow': '#B8D8A2',
        'soft-error': '#E26A5E',
        'form-base': '#FFFDF9',
        'form-border': '#EAE5D8',
        'emerald-start': '#065f46',
        'emerald-end': '#059669',
        'teal-dark': '#115e59',
        'cream': '#FBF7F2',
        'cream-light': '#F6F1E9',
        'navy': '#1C2635',
        'gold': '#C2A66D',
        'gold-dark': '#B59A61',
        'grey-soft': '#D9D4C7',
        'divider': '#EDE8DF',
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'inner-soft': 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.04)',
        'form-card': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'premium-hover': '0 25px 50px -15px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-2px)' },
          '50%': { transform: 'translateY(2px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-6px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(6px)' },
        },
        check: {
          '0%': { pathLength: 0 },
          '100%': { pathLength: 1 },
        },
        circle: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1.1)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shake: 'shake 0.4s ease-in-out',
        'draw-check': 'check 0.5s ease-in-out 0.5s forwards',
        'draw-circle': 'circle 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}