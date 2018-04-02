const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: "ejs-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/,
        use: "json-loader"
      }
    ]
  },
  plugins: [new UglifyJsPlugin()]
};
