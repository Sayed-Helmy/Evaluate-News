const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.s?css$/i,
        use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new miniCssExtractPlugin(),
    new htmlWebpackPlugin({
      title: "EVALUATE NEWS",
      template: "src/client/public/index.html",
    }),
  ],
  output: {
    // filename: "[name].bundle.js",
    assetModuleFilename: "assets/[hash][ext][query]",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
