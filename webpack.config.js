const path = require("path");

module.exports = {
  entry: "./src/build-cli/webpack/index.ts",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
};
