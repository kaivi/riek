const Webpack = require('webpack');
const path = require('path');
const DOCROOT = path.resolve(__dirname);

module.exports = {
  entry: {
    app: './demo/demo.jsx',
  },
  output: {
    path: DOCROOT + '/demo',
    filename: 'demo.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
