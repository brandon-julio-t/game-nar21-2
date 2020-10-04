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
        disable: process.env.NODE_ENV !== "production",
        optipng: null,
        pngquant: { speed: 11 },
        svgo: { plugins: [{ removeViewBox: false }] },
        externalImages: {
          context: "src/assets/images",
          sources: glob.sync("src/assets/images/**/*.{png,svg}"),
          destination: "public/images", // If build locally, change to "public/images"
          fileName: filePath => filePath.replace("png", "webp")
        }
      })
    ]
  }
};
