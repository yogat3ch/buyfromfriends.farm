/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/html/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#35A59Eff",
        secondary: "#823B45ff",
        "frosted-blue": "#B3E2E4ff",
        white: "#FFFFFFff",
        "light-sea-green": "#35A59Eff",
        "burnt-rose": "#823B45ff",
        teal: "#258482ff",
      },
      fontFamily: {
        libre: ["'Libre Baskerville'", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        lora: ["Lora", "serif"],
        sacramento: ["Sacramento", "cursive"],
      },
      fontWeight: {
        semibold: 600,
        medium: 500,
      },
    },
  },
  plugins: [],
}
