// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "razorpay": require.resolve("razorpay") // Include this line
    }
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // ... other presets ...
              '@babel/preset-react'
            ],
            plugins: [
              // ... other plugins ...
              '@babel/plugin-syntax-jsx'
            ]
          }
        },
      },
    ],
  },
};
