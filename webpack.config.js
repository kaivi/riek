const Webpack = require('webpack');
const path = require('path');
const DOCROOT = path.resolve(__dirname);

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: DOCROOT + '/demo',
    filename: 'demo.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new Webpack.optimize.AggressiveMergingPlugin(),
    new Webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compressor: {
            dead_code: true,
            warnings: true,
            drop_debugger: true,
            passes: 1,
          },
          comments: false,
          beautify: false,
          mangle: {
            except: ['$'], // Don't mangle $
            screw_ie8 : true, // Don't care about IE8
            keep_fnames: false, // Don't mangle function names
          },
        }
    ),
  ],
};
