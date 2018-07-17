const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src/scripts/main.js")
  },
  output: {
    path: path.resolve(__dirname, "public/scripts"),
    publicPath: "/public/",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["env"]
        }
      }
    ]
  }
};
