/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#101322",
        primary: {
          DEFAULT: "#163D68",
          light: "#4263EB",
        },
        textActive: "#d4d9e1",
        textInactive: "#586a85",
      },
    },
  },
  plugins: [],
};
