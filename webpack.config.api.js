import path from 'path';
import os from 'os';

const SAFE_APP = {
  win32: '*.dll',
  darwin: '*.dylib',
  linux: '*.so'
};

export default {
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, 'src/api/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'api.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: {
    electron: 'electron',
    crypto: 'crypto',
    'safe-app': 'safe-app'
  }
};
