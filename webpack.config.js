const path = require("path");

module.exports = {
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
        test: /\.html$/,
        loader: "ejs-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: {
              importer: function(url, prev) {
                if (url.indexOf("@material") === 0) {
                  var filePath = url.split("@material")[1];
                  var nodeModulePath = `./node_modules/@material/${filePath}`;
                  return { file: require("path").resolve(nodeModulePath) };
                }
                return { file: url };
              }
            }
          }
        ]
      }
    ]
  }
};
