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
        optipng: null,
        pngquant: {
          speed: process.env.NODE_ENV === "development" ? 11 : 1,
          quality: "70-90"
        },
        svgo: { plugins: [{ removeViewBox: false }] },
        externalImages: {
          context: "src/assets",
          sources: glob.sync("src/assets/**/*.{png,svg}"),
          destination:
            process.env.NODE_ENV !== "production"
              ? "public/images"
              : "dist/images",
          fileName: filePath => filePath.replace("png", "webp")
        }
      })
    ]
  }
};
