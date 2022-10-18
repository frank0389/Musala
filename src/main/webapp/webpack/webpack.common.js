const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  module: {
    rules: [
      {
        use: "babel-loader",
        test:  /\.(js|jsx)?$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.(css|scss|sass)$/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/i18n/locales',
          to: 'app/locales'
        },{
          context:"./src/app/modules/",
          from:"*/i18n/locales/en/*.json" ,
          to: 'app/locales/en/[name].json'
        },{
          context:"./src/app/modules/",
          from:"*/i18n/locales/es/*.json" ,
          to: 'app/locales/es/[name].json'
        }]}),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    })
  ],
};
