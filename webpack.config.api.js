import path from 'path';
import os from 'os';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const SAFE_APP = {
  win32: '*.dll',
  darwin: '*.dylib',
  linux: '*.so'
};

const dependenciesToCopy = [
    { context: 'node_modules/safe-app/src/native', from: SAFE_APP[os.platform()], flatten: true }
];

if (os.platform() === 'win32') {
  dependenciesToCopy.push({ context: 'node_modules/safe-app/src/native', from: 'libwinpthread-1.dll', flatten: true });
}

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
  },
  plugins: [
    new CopyWebpackPlugin(dependenciesToCopy)
  ]
};
