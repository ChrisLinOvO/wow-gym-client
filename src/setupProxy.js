const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const ports = process.env.PORT || 3000
  app.use(
    ["/api", "/api/user", "/api/user/google"],
    createProxyMiddleware({ target: `http://localhost:${ports}` })
  );
};
