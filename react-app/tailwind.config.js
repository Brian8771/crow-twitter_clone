// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'body': ['TwitterChirpExtendedHeavy', 'Verdana', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        grayish: 'rgb(207, 207, 207)'
      }
    },
  },
  plugins: [],
}
