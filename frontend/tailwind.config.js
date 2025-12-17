/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modesta Resort Brand Colors
        copper: {
          DEFAULT: '#C17B5C',
          50: '#F5EBE6',
          100: '#EDD8CE',
          200: '#DCB19D',
          300: '#CB8A6C',
          400: '#C17B5C', // Primary
          500: '#A86145',
          600: '#8A4D34',
          700: '#6B3926',
          800: '#4C2619',
          900: '#2E130D',
        },
        forest: {
          DEFAULT: '#2C5530',
          50: '#E7F0E8',
          100: '#D0E1D1',
          200: '#A1C3A3',
          300: '#72A575',
          400: '#438747',
          500: '#2C5530', // Primary
          600: '#234426',
          700: '#1A331C',
          800: '#112213',
          900: '#081109',
        },
        coral: {
          DEFAULT: '#E85D75',
          50: '#FCE9ED',
          100: '#F9D3DA',
          200: '#F3A7B5',
          300: '#ED7B90',
          400: '#E85D75', // Primary
          500: '#DD2F52',
          600: '#B5243F',
          700: '#881B2F',
          800: '#5B121F',
          900: '#2E0910',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          50: '#FEFDFB',
          100: '#FCF9F5',
          200: '#F5F0E8', // Primary
          300: '#EDE4D5',
          400: '#E5D8C2',
          500: '#DDCCAF',
          600: '#C9B28D',
          700: '#B5986B',
          800: '#8C754F',
          900: '#634F36',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#E8E8E8',
          100: '#D1D1D1',
          200: '#A3A3A3',
          300: '#757575',
          400: '#474747',
          500: '#1A1A1A', // Primary
          600: '#151515',
          700: '#101010',
          800: '#0A0A0A',
          900: '#050505',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-1': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-3': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        'heading-4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'ken-burns': 'kenBurns 20s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        kenBurns: {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(1.2)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
        'luxury-lg': '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner-luxury': 'inset 0 2px 10px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
