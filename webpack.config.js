const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map", // https://webpack.js.org/guides/typescript/#:~:text=Now%20we%20need%20to%20tell%20webpack%20to%20extract%20these%20source%20maps%20and%20include%20in%20our%20final%20bundle%3A
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "lodash", // https://webpack.js.org/guides/shimming/#:~:text=.%20Let%27s%20go%20ahead%20by%20removing%20the%20import%20statement%20for%20lodash%20and%20instead%20provide%20it%20via%20the%20plugin
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
