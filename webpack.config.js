"use strict";

const path = require("path");

module.exports = {
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  devtool: "source-map",
  //plugins: [],
  //watch: true,
  mode: "development"
};
