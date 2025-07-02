module.exports = {
    module: {
      rules: [{
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
          test: /\.(jpe?g|png|gif)$/i,
          loader: "file-loader"
      },
    ]
    }
  };