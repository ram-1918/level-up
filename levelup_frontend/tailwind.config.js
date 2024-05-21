/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'mobile': '370px',
        'tablet': '540px',
        'laptop': '924px',
        'desktop': '1280px',
      },
    },
  },
  plugins: [],
}

