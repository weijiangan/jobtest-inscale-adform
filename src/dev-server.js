const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../config/webpack.dev");

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 4000;

app.use(
  webpackDevMiddleware(compiler, {
    logLevel: "warn",
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

app.use("/", express.static(path.join(__dirname, "..", "dist")));

app.get("*", (req, res, next) => {
  if (req.url === "/graphql") return next();
  res.sendFile(
    "index.html",
    { root: path.join(__dirname, "..", "dist") },
    err => {
      if (err) next(err);
    }
  );
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
