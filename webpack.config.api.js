import path from 'path';

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
    '@maidsafe/safe-node-app': '@maidsafe/safe-node-app'
  }
};
