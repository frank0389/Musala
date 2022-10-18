const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const Dotenv = require('dotenv-webpack');
const path = require("path");

/** @type {import('webpack').Configuration} */
const prodConfig = {
  mode: "production",
  devtool: "source-map",
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: 'app/[name].[contenthash].bundle.js',
    chunkFilename: 'app/[name].[chunkhash].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [new MiniCssExtractPlugin(),
    new Dotenv({
      path: `./environments/.env.production`
    })],
};

module.exports = merge(common, prodConfig);
