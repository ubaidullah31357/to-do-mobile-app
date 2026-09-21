/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#182230",
        muted: "#728096",
        cloud: "#F5F7FB",
        primary: "#5B5CE2",
        lilac: "#EEEFFF",
      },
    },
  },
  plugins: [],
};
