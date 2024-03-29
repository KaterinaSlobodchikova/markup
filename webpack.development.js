const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
require("dotenv").config();

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
});
