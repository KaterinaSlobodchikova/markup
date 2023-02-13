const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    // filename: path.resolve(__dirname, "src/index.js"),
    app: "./src/index",
    worker: "./src/worker",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCss.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      excludeChunks: ["worker"],
    }),
    new MiniCss(),
  ],
};
