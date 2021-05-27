const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prodMode = process.env.NODE_ENV === 'production';

let mode = 'development';
let target = 'web';

const plugins = [
   new CleanWebpackPlugin(),
   new MiniCssExtractPlugin({ filename: !prodMode ? '[name].css' : '[name].[contenthash].css' }),
   new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './public/favicon.ico'
   })
];

if (prodMode) {
   mode = 'production';
   target = 'browserslist'; // to fix temporary hmr problem for scss

} else {
   // only enable hot in development
   plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
   entry: {
      app: './src/js/index.js'
   },
   output: {
      // output path is required for `clean-webpack-plugin`
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      // this places all images processed in an image folder
      assetModuleFilename: 'images/[hash][ext][query]'
   },
   mode,
   module: {
      rules: [
         {
            test: /\.(s[ac]|c)ss$/i,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  // This is required for asset imports in CSS, such as url()
                  options: { publicPath: '' }
               },
               'css-loader',
               'postcss-loader',
               // according to the docs, sass-loader should be at the bottom, which
               // loads it first to avoid prefixes in your sourcemaps and other issues.
               'sass-loader'
            ]
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'
            }
         },
         {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset'
         }
      ]
   },

   resolve: {
      alias: {
         Components: path.resolve(__dirname, 'src/js/components/')

      }
   },


   plugins,
   target,
   devtool: 'source-map',


   devServer: {
      contentBase: './dist',
      port: 4000,
      hot: true,
      historyApiFallback: true //This is needed for react-router-dom when a server is running
   }
};
