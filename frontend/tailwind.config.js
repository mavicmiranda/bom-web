export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#cbbeff",
        "primary-container": "#967ef7",
        background: "#12121A",
        surface: "#1f1f27",
        "surface-low": "#1b1b23",
        "surface-high": "#292932",
        outline: "#484554",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
    },
  },
  plugins: [],
};