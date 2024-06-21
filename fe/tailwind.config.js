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
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        handwriting: ["Dancing Script", "cursive"],
        'noto-sans-kr': ['Noto Sans KR', 'sans-serif'],
        'nanum-gothic': ['Nanum Gothic', 'sans-serif'],
        'nanum-myeongjo': ['Nanum Myeongjo', 'serif'],
        'nanum-pen-script': ['Nanum Pen Script', 'cursive'],
        'do-hyeon': ['Do Hyeon', 'sans-serif'],

      },
      clipPath: {
        "custom-left": "polygon(10% 100%, 100% 100%, 90% 0%, 0% 0%)",
        "custom-right": "polygon(0% 100%, 90% 100%, 100% 0%, 10% 0%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-clip-path")],
};
