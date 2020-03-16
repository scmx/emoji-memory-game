const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "babel-loader" },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
                context: path.resolve(__dirname, "src")
                // hashPrefix: 'my-custom-hash',
              }
            }
          },
          // "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./src/favicon.png",
      template: "index.html"
    }),
    new CopyWebpackPlugin(["./src/favicon.ico"])
  ]
};
