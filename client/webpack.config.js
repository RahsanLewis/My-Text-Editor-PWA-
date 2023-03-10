const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:'./index.html',
      title: 'Web Text Editor'
    }),

    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),

    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'The Worlds Best Progressive Web App!',
      background_color: '#ffffff',
      publicPath: './',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
