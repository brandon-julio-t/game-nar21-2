module.exports = {
  pwa: {
    name: "NAR21-2",
    themeColor: "#4D78BA"
  },

  productionSourceMap: false,

  chainWebpack: config => {
    config.module
      .rule("svg-sprite")
      .use("svgo-loader")
      .loader("svgo-loader");
  },

  pluginOptions: {
    svgSprite: {
      dir: "src/assets"
    }
  }
};
