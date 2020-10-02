module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        lionel: "#1676eb",
        "lionel-light": "#228dfd"
      }
    },
    borderColor: theme => ({
      ...theme("colors"),
      lionel: theme("colors.lionel"),
      "lionel-light": theme("colors.lionel-light")
    }),
    backgroundColor: theme => ({
      ...theme("colors"),
      lionel: theme("colors.lionel"),
      "lionel-light": theme("colors.lionel-light")
    }),
    textColor: theme => ({
      ...theme("colors"),
      lionel: theme("colors.lionel"),
      "lionel-light": theme("colors.lionel-light")
    })
  },
  variants: {},
  plugins: []
};
