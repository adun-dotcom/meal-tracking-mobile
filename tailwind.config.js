/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          200: "rgba(255, 131, 3, 0.2)",
          400: "#FF8303",
        },
        neutral: {
          100: "#F1F3F4",
          200: "#E3E5E6",
          300: "#DDE9EA",
          400: "#FAFAFA",
        },
        gray: {
          100: "#696F79",
          200: "#8692A6",
          300: "#303434",
          400: "#030F36",
          500: "#C5C5C5",
          600: "#666666",
          700: "#E0E0E0",
        },
        green: {
          100: "rgba(20, 174, 92, 0.2)",
          200: "rgba(20, 174, 92, 1)",
        },
      },
      fontSize: {
        8: "8px",
        10: "10px",
        13: "13.26px",
        17: "17px",
        22: "22px",
        25: "25.97px",
        26: "26px",
        30: "30px",
        38: "38.96px",
        40: "40px",
        50: "50px",
      },

      height: {
        25: "25px",
        34: "34px",
        42: "42px",
        53: "53px",
        58: "58px",
        100: "100px",
      },
      width: {
        100: "100px",
      },
      spacing: {
        "1/10": "10%",
      },
    },
  },
  plugins: [],
};
