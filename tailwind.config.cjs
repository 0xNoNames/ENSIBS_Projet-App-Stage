module.exports = {
  mode: "jit",
  purge: ["frontend/views/**/*.ejs"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        104: "30rem",
      },
      backdropSaturate: {
        125: "1.25",
      },
      colors: {
        green: {
          "ensibs-light": "#dee686",
          ensibs: "#a9c332",
          "ensibs-dark": "#608a3c",
        },
      },
    },
  },
};
