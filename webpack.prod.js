const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "production",
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
    new WorkboxPlugin.GenerateSW({
      // Do not precache images
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      // Define runtime caching rules.
      runtimeCaching: [
        {
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          // Apply a cache-first strategy.
          handler: "CacheFirst",
          options: {
            // Use a custom cache name.
            cacheName: "images",
            // Only cache 10 images.
            expiration: {
              maxEntries: 10,
            },
          },
        },
      ],
    }),
  ],
  output: {
    // filename: "[name].bundle.js",
    assetModuleFilename: "assets/[hash][ext][query]",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
