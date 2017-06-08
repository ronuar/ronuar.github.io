const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./scripts/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss|sass)(\?.+)?$/,
        loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif)(\?.+)?$/,
        loader: {
          loader: 'url-loader',
          query: {
            limit: 300000,
            name: '[name].[ext]'
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'template.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass']
  }
};
