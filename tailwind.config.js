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
      whiteTransparent: "rgba(255, 255, 255, 0.8)",
      primary: {
        green: "#2D521E",
        blue: "#27346A",
        light: "#769089",
        dark: "#696A5C",
        cta: "#F44336",
      },
      comp: {
        DEFAULT: "#ecebff",
        purple: "#CCCBDB",
        gray: "#EFF1EE",
        green: "#C0D1B9",
      },
      success: "#4A9948",
      warning: "#C78910",
      danger: "#F44336",
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
