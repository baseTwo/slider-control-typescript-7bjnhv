/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const main = ["core-js", "whatwg-fetch", "./src/index.ts"];

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  entry: {
    main: main,
  },
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [{ loader: "ts-loader", options: { transpileOnly: true } }],
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
    new ForkTsCheckerWebpackPlugin({
      async: false,
      //useTypescriptIncrementalApi: true,
      //memoryLimit: 4096,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: "src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
