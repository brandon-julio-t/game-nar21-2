const ImageminPlugin = require("imagemin-webpack-plugin").default;
const glob = require("glob");

module.exports = {
  pwa: {
    name: "NAR21-2",
    themeColor: "#4D78BA"
  },

  productionSourceMap: false,
  lintOnSave: false,

  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        // disable: true,
        optipng: null,
        pngquant: process.env.NODE_ENV !== "production" ? { speed: 11 } : null,
        svgo: { plugins: [{ removeViewBox: false }] },
        externalImages: {
          context: "src/assets/images",
          sources: glob.sync("src/assets/images/**/*.{png,jpg,jpeg,svg}"),
          destination:
            process.env.NODE_ENV !== "production"
              ? "public/images"
              : "dist/images", // If build locally, change to "public/images", else "dist/images"
          fileName: filePath => filePath.replace(/(png|jpg|jpeg)/, "webp")
        }
      })
    ]
  }
};
