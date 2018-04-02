const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js",
  devtool: "source-map",
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
        loader: "ejs-loader"
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
  plugins: []
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
