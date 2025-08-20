/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B4FE5",
        secondary: "#8B7FF7",
        accent: "#FF6B6B",
        surface: "#FFFFFF",
        background: "#F8F7FF",
        success: "#4ECDC4",
        warning: "#FFE66D",
        error: "#FF6B6B",
        info: "#4A90E2",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #5B4FE5 0%, #8B7FF7 100%)',
        'coral-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.3s ease-in forwards',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}