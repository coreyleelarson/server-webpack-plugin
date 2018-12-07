import path from 'path';
import nodeExternals from 'webpack-node-externals';
import ServerPlugin from '../../index';

export default {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  stats: false,
  watch: true,
  entry: {
    server: './src/index.js',
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
  plugins: [
    new ServerPlugin({
      disableWatch: true,
    }),
  ],
};