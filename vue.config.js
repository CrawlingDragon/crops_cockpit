module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      stylus: {
        import: "~@/common/css/theme.styl"
      }
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    compress: true,
    disableHostCheck: true,
    port: 8009,
    proxy: {
      "/api": {
        ws: true,
        target:
          process.env.NODE_ENV === "production"
            ? "http//tv.114nz.com/"
            : "http://demotv.114nz.com/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  lintOnSave: false
};
// lintOnSave: false  代表全局禁用eslint
