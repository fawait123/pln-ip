/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonGray: "#a5a5a5",
      },
    },
  },
  plugins: [],
};
