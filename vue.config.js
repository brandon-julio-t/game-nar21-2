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
        // optipng: { optimizationLevel: 7 },
        pngquant: { speed: 1, verbose: true },
        externalImages: {
          sources: [
            ...glob.sync("src/**/*.png"),
            ...glob.sync("public/**/*.png")
          ],
          fileName: filePath => filePath.replace("png", "webp")
        }
      })
    ]
  }
};
