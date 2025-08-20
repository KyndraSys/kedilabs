/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "kedi-teal": "#008B8B",
        "kedi-orange": "#FF6B35",
        "kedi-green": "#228B22",
        "kedi-gray": "#36454F",
      },
    },
  },
  plugins: [],
};