/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      light: "#FFFFFF",
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      secondary: "#d4d3e7",
      error: Array (10).fill ("#FF2C56"),
      "dark-red": "#970015",
      "red": "#ce282f",
      "light-red": "#ea4d4a",
      "orange": "#FF8A08",
      "yellow": "#FFC100",
      "green": "#03873f",
      "light-green": "#12c865",
      "primary-text": "#334155",
      "primary-text-500": "#334155",
      "secondary-text": "#808fa4",
      "secondary-text-500": "#808fa4",
    },
    fontFamily: {
      'poppins': [
        'poppins', 'sans-serif'
      ],
      'poppins-bold': [
        'poppins-bold', 'sans-serif'
      ],
      'poppins-light': [
        'poppins-light', 'sans-serif'
      ],
      'poppins-semibold': ['poppins-semibold', 'sans-serif']
    },
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 20,
      "2xl": 24,
      "3xl": 28,
      "10xl": 80
    },
    letterSpacing: {
      "1": "0.001em",
      "2": "0.0015em",
      "3": "0.0025em",
      "4": "0.004em"
    },
    dropShadow: {
      "1": "0px 1px 4px rgba(0, 0, 0, 0.12)",
      "2": "drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
    },
    extend: {},
  },
  plugins: [],
}

