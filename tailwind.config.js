module.exports = {
  future: {},
  purge: {
    content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    options: {
      safelist: [
        "fade-enter-active",
        "fade-leave-active",
        "fade-enter-from",
        "fade-leave-to"
      ]
    }
  },
  theme: {},
  variants: {},
  plugins: []
};
