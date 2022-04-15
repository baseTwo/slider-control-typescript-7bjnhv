/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const main = ["core-js", "whatwg-fetch", "./src/index.ts"];

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  mode: "development",
  entry: { main },
  devtool: "source-map", // https://webpack.js.org/guides/typescript/#:~:text=Now%20we%20need%20to%20tell%20webpack%20to%20extract%20these%20source%20maps%20and%20include%20in%20our%20final%20bundle%3A
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "lodash", // https://webpack.js.org/guides/shimming/#:~:text=.%20Let%27s%20go%20ahead%20by%20removing%20the%20import%20statement%20for%20lodash%20and%20instead%20provide%20it%20via%20the%20plugin
    }),
    new ForkTsCheckerWebpackPlugin({}),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: "TypeScript",
      excludeWarnings: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "src/index.html",
    }),
  ],
  optimization: {
    usedExports: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "*.css", "*.html"],
  },
};
