const path = require('path');

module.exports = {
  entry: './src/PassageMetadataApp.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'passage-metadata-library.min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: {
      name: 'PassageMetadataAppExport',
      type: 'var',
    },
  },
};
