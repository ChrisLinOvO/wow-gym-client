const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/api/user", "/api/user/google"],
    createProxyMiddleware({ target: "http://localhost:5000" })
  );
};
