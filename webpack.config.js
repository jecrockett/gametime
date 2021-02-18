module.exports = {
  entry: {
    main: "./lib/index.js",
    test: ["mocha-loader", "./test/index.js"]
  },
  output: {
    path: __dirname + '/public',
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.css'],
    fallback: {
      "crypto": false,
      "path": false
    }
  }
};
