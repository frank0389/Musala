const { HotModuleReplacementPlugin } = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const Dotenv = require('dotenv-webpack');
const path = require("path");


/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: "development",
  entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname, "../build"),
      filename: 'app/[name].bundle.js',
      chunkFilename: 'app/[id].chunk.js',
    },
    optimization: {
      moduleIds: 'named',
    },
  devServer: {
    port: 3000,
    contentBase: "../build",
    open: "chrome",
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
    },
    historyApiFallback: true,
    writeToDisk: true
  },
  target: "web",
  plugins: [new HotModuleReplacementPlugin(),
    new Dotenv({
      path: `./environments/.env.development`
    })],
  devtool: "eval-source-map",
};

module.exports = merge(common, devConfig);
