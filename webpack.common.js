<<<<<<< HEAD
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    filename: path.resolve(__dirname, "src/index.js"),
=======
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
>>>>>>> f35b19353856084173727b0c5ad7a20797f93232
  },
  module: {
    rules: [
      {
<<<<<<< HEAD
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
=======
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
>>>>>>> f35b19353856084173727b0c5ad7a20797f93232
      },
    ],
  },
  plugins: [
<<<<<<< HEAD
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
=======
    new HtmlWebpackPlugin({
      title: 'Markup',
      filename: 'index.html',
      template: 'src/template.html',
>>>>>>> f35b19353856084173727b0c5ad7a20797f93232
    }),
  ],
};
