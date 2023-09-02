/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      current: "currentColor",
      purple: "#7786D2",
      "light-purple": "#C7D1F4",
    },
  },
};
