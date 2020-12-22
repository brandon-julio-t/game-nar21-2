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
        disable: process.env.NODE_ENV === "development",
        optipng: null,
        pngquant: process.env.NODE_ENV !== "production" ? null : { speed: 11 },
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
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: "~",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  }
};
