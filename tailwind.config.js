/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        spotify: "#1DB954",
        terrary: "#1ED760",
        bg: "#121212",
        off: "#333",
        textColor: "#8c8c8c",
      },
    },
  },
  plugins: [],
};
