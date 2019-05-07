const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    resolve: {
        modules: [
          path.join(__dirname, 'src'),
          "node_modules"
        ],
        // alias: {
        //   components: path.resolve(__dirname, 'src/components/'),
        //   assets: path.resolve(__dirname, 'src/assets/'),
        //   middlend: path.resolve(__dirname, 'src/middleend/')
        // }
    },
    devServer: {
      contentBase: './build',
    },
    module: {
      rules: [
        {
            test: /\.(s?css|sass)$/,
            use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']//, 'eslint-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('./index.html'),
      }),
    ]
};