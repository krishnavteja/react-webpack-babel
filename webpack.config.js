var Webpack = require('webpack');
var path = require('path');

var node_modules_dir = __dirname + '/node_modules';

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp(path));
  },
    entry: [
    	'webpack/hot/dev-server',
      	'webpack-dev-server/client?http://localhost:8080',
    	path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'app/build'),
        filename: 'bundle.js',
        // Everything related to Webpack should go through a build path,
    	// localhost:3000/build. That makes proxying easier to handle
    	publicPath: '/build/'
    },
    resolve: { alias: {} },
    module: {
      noParse: [],
      loaders: [
        { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel", query : { presets:['react'] } }
      ]
    },
  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

//config.addVendor('bootstrap', node_modules_dir + '/bootstrap/dist/js/bootstrap.min.js');
//config.addVendor('bootstrap.css', node_modules_dir + '/bootstrap/dist/css/bootstrap.min.css')

module.exports = config;