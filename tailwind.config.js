// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      DEFAULT: "#19161A",
      black: "#19161A",
      white: "#ffffff",
      background: "#E6EBEF",
      primary: {
        green: "#2D521E",
        blue: "#27346A",
        light: "#769089",
        dark: "#696A5C",
      },
      comp: {
        DEFAULT: "#ecebff",
        purple: "#CCCBDB",
        gray: "#EFF1EE",
        green: "#C0D1B9",
        greenDark: "#B2BDAE",
      },
      danger: "#D32F2F",
    },
    extend: {},
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars = typeof value === "string" ? { [`--color${colorGroup}-${colorKey}`]: value } : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
