/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // En Passant chess-inspired palette
        chess: {
          black: '#1a1a1a',
          dark: '#2d2d2d',
          cream: '#f5f5dc',
          ivory: '#fffff0',
          gold: '#d4af37',
          'gold-dark': '#b8960c',
          green: '#228b22',
          'green-dark': '#1a6b1a',
        },
        // Primary - Gold accent
        primary: {
          DEFAULT: '#d4af37',
          50: '#fdf9e9',
          100: '#faf0c7',
          200: '#f5e08f',
          300: '#eecb4d',
          400: '#e6b821',
          500: '#d4af37',
          600: '#b8960c',
          700: '#8f7209',
          800: '#6b550d',
          900: '#4a3b0f',
        },
        // Navy/Dark - Chess board dark squares
        navy: {
          DEFAULT: '#1a1a1a',
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#a3a3a3',
          400: '#737373',
          500: '#1a1a1a',
          600: '#171717',
          700: '#141414',
          800: '#0f0f0f',
          900: '#0a0a0a',
        },
        // Surface - Slightly lighter darks
        surface: {
          DEFAULT: '#2d2d2d',
          50: '#fafafa',
          100: '#f0f0f0',
          200: '#d9d9d9',
          300: '#b3b3b3',
          400: '#666666',
          500: '#2d2d2d',
          600: '#262626',
          700: '#1f1f1f',
          800: '#171717',
          900: '#0f0f0f',
        },
        // Accent colors
        success: '#228b22',
        warning: '#d4af37',
        danger: '#b22222',
        // Cream for light text/backgrounds
        cream: {
          DEFAULT: '#f5f5dc',
          50: '#fefefe',
          100: '#fcfcf7',
          200: '#f9f9ed',
          300: '#f5f5dc',
          400: '#ebebc8',
          500: '#d9d9a8',
          600: '#c4c47d',
          700: '#a3a355',
          800: '#7a7a3d',
          900: '#525229',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        'chess-pattern': 'repeating-conic-gradient(#2d2d2d 0% 25%, #1a1a1a 0% 50%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'glow-gold': '0 0 30px rgba(212, 175, 55, 0.5)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
