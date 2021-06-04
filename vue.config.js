const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  themeVariables: ["@primary-color"],
  indexFileName: "index.html",
  generateOnce: false,
  lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
  publicPath: "",
  customColorRegexArray: [], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
};

const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A",
          "link-color": "#1DA57A",
          "border-radius-base": "2px",
        },
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: {
    plugins: [
      themePlugin,
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, //匹配文件名
        threshold: 10240, //对超过10k的数据进行压缩
        deleteOriginalAssets: false, //是否删除原文件
      }),
    ],
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(
          __dirname,
          "./src/icons.js"
        ),
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");

    // config.plugin("define").tap((args) => {
    //   args[0]["process.env"].MOCK = JSON.stringify(process.env.MOCK);
    //   console.log(args);
    //   return args;
    // });
  },
  devServer: {
    port: 9000,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        bypass: function (req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path.split("/api/")[1].split("/").join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)]; //删除缓存 每次都能拿到最新的数据
            return res.send(result);
          }
        },
      },
    },
  },
};
