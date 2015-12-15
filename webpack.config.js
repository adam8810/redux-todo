var config = {
  entry: ['./src/styles.scss', './src/index.jsx'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [ { test: /\.jsx?$/
               , exclude: /(node_modules|bower_components)/
               , loader: 'babel-loader' }

               , {test: /\.css$/, loader: "style-loader!css-loader" }
               , {test: /\.scss$/,loaders: ["style", "css", "sass"]}

               , {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}

               , {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'}
               , {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'}
               , {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}
               , {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
             ]
   }
};

module.exports = config;
