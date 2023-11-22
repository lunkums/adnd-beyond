const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  devServer: {
    open: true, // Set to false to prevent the dev server from opening up automatically
    static: "./dist",
    watchFiles: ["./src/index.html"],
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/, // regex to match files with the .ts extension
        loader: "ts-loader",
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "D&D Above", // Replace this with the name of your app
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
