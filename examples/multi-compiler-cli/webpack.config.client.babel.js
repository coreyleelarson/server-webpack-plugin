import HtmlPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  mode: 'development',
  stats: false,
  entry: {
    client: './src/index.js',
  },
  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, 'build/web'),
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
    new HtmlPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};
