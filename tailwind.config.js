/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      scale: {
        '102': '1.02',
        '98': '0.98',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'tabFadeIn': 'tabFadeIn 0.5s ease-out',
        'cardExpand': 'cardExpand 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'status-icon': 'status-icon 2s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'progress-infinite': 'progress-infinite 3s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite', 
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'cardExpand': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px) scale(0.98)',
            height: '0'
          },
          '50%': {
            opacity: '0.5',
            transform: 'translateY(10px) scale(0.99)',
            height: '50%'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)',
            height: '100%'
          }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tabFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
        'status-icon': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'pulse-subtle': {
          '0%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
          '100%': { opacity: '0.1' },
        },
        'progress-infinite': {
          '0%': { transform: 'translateX(-10%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-10%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
};
