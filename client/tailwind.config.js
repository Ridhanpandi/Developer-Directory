/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        'primary-dark': '#6d28d9',
        'primary-light': '#a78bfa',
        secondary: '#06b6d4',
        accent: '#ec4899',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in-up': 'fadeInUp 1s ease-out 0.3s both',
        'glow': 'glow 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateZ(0) rotateX(0deg)' },
          '50%': { transform: 'translateZ(20px) rotateX(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            transform: 'scale(1) rotateZ(0deg)',
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
          },
          '50%': { 
            transform: 'scale(1.05) rotateZ(5deg)',
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)',
          },
        },
        slideIn: {
          from: {
            opacity: '0',
            transform: 'translateX(-50px) rotateY(20deg)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0) rotateY(0deg)',
          },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(236, 72, 153, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)',
          },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(124, 58, 237, 0.2), inset 0 0 10px rgba(124, 58, 237, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.5), inset 0 0 20px rgba(124, 58, 237, 0.2)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
