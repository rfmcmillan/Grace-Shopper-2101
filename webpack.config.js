module.exports = {
  entry: ['@babel/polyfill', './client/index.js'],
  output: { path: __dirname, filename: './public/main.js' },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
    ],
  },
};
