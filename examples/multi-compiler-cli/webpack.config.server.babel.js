import path from 'path';
import nodeExternals from 'webpack-node-externals';
import ServerPlugin from '../../index';

export default {
  mode: 'development',
  target: 'node',
  stats: false,
  externals: [nodeExternals()],
  entry: {
    server: './src/server/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new ServerPlugin()],
};
