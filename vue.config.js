const ImageminPlugin = require("imagemin-webpack-plugin").default;
const glob = require("glob");

module.exports = {
  pages: {
    index: {
      entry: "src/main.ts",
      title: "NAR21-2"
    }
  },

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
        pngquant: {
          speed: 1,
          quality: "0-1"
        },
        svgo: { plugins: [{ removeViewBox: false }] },
        externalImages: {
          context: "src/assets",
          sources: glob.sync("src/assets/**/*.{png,svg}"),
          destination: "public/images",
          fileName: filePath => filePath.replace("png", "webp")
        }
      })
    ]
  }
};
