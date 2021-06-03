module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    port: 9000,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        bypass: function (req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path?.split("/api/")[1]?.split("/").join("_");
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
