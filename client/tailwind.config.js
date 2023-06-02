/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mml-red-400": "#EA001B",
        "mml-red-300": "#EA3B4F",
        "mmlred-200": "#EA7583",
        "mml-red-100": "#EAAFB6",
        "mml-blue-400": "#0014EA",
        "mml-blue-300": "#3B49EA",
        "mml-blue-200": "#757FEA",
        "mml-blue-100": "#AFB4EA",
      },
    },
  },
  plugins: [],
};
