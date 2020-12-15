module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lionel: "#1676eb",
        "lionel-light": "#228dfd",
        "lionel-alternate": "#3ecfef"
      }
    },
    borderColor: theme => ({
      ...theme("colors"),
      lionel: theme("colors.lionel"),
      "lionel-light": theme("colors.lionel-light"),
      "lionel-alternate": theme("colors.lionel-alternate")
    }),
    backgroundColor: theme => ({
      ...theme("colors"),
      lionel: theme("colors.lionel"),
      "lionel-light": theme("colors.lionel-light"),
      "lionel-alternate": theme("colors.lionel-alternate")
    }),
    textColor: theme => ({
      ...theme("colors"),
      lionel: theme("colors.lionel"),
      "lionel-light": theme("colors.lionel-light"),
      "lionel-alternate": theme("colors.lionel-alternate")
    })
  },
  variants: {},
  plugins: []
};
