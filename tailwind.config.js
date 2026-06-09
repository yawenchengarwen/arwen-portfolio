/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night-sky': '#0D1B2A',
        'deep-indigo': '#1B263B',
        'midnight': '#2D3A52',
        'lantern-orange': '#F4A261',
        'warm-amber': '#E9C46A',
        'soft-violet': '#7B6CF6',
        'dawn-yellow': '#FEF3C7',
        'pure-white': '#FFFFFF',
        'mist-white': '#E0E1DD',
        'pale-silver': '#94A3B8',
        'dim-grey': '#64748B',
        'coral-red': '#E76F51',
        border: 'hsl(213 20% 25%)',
        input: 'hsl(213 20% 25%)',
        ring: 'hsl(30 87% 67%)',
        background: 'hsl(210 38% 11%)',
        foreground: 'hsl(0 0% 100%)',
        primary: {
          DEFAULT: 'hsl(30 87% 67%)',
          foreground: 'hsl(210 38% 11%)',
        },
        secondary: {
          DEFAULT: 'hsl(213 33% 17%)',
          foreground: 'hsl(0 0% 100%)',
        },
        destructive: {
          DEFAULT: 'hsl(14 79% 61%)',
          foreground: 'hsl(0 0% 100%)',
        },
        muted: {
          DEFAULT: 'hsl(213 33% 17%)',
          foreground: 'hsl(215 16% 62%)',
        },
        accent: {
          DEFAULT: 'hsl(213 33% 17%)',
          foreground: 'hsl(0 0% 100%)',
        },
        popover: {
          DEFAULT: 'hsl(213 33% 17%)',
          foreground: 'hsl(0 0% 100%)',
        },
        card: {
          DEFAULT: 'hsl(213 33% 17%)',
          foreground: 'hsl(0 0% 100%)',
        },
      },
      fontFamily: {
        'display-en': ['"Playfair Display"', 'serif'],
        'body-en': ['Inter', 'sans-serif'],
        'display-cn': ['"Noto Serif SC"', 'serif'],
        'body-cn': ['"Noto Sans SC"', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.625rem',
        md: 'calc(0.625rem - 2px)',
        sm: 'calc(0.625rem - 4px)',
      },
      boxShadow: {
        'lantern': '0 0 12px rgba(244, 162, 97, 0.3)',
        'lantern-lg': '0 0 30px rgba(244, 162, 97, 0.35), 0 0 60px rgba(244, 162, 97, 0.1)',
        'card-hover': '0 10px 40px rgba(0,0,0,0.3), 0 0 20px rgba(244,162,97,0.15)',
        'button': '0 0 24px rgba(244, 162, 97, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
