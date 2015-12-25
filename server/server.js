var express = require("express");
var app = express();
var httpProxy = require('http-proxy');
var path = require("path");
var config = require("./config");
var port = process.env.PORT || 3000;
var publicPath = path.resolve(__dirname, 'app');

var proxy = httpProxy.createProxyServer();
var isProduction = process.env.NODE_ENV === "production";

app.set('views', path.join(__dirname, '../app/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(publicPath));
app.use(function (req, res, next) {
    for (var key in req.query) {
        req.query[key.toLowerCase()] = req.query[key];
    }
    next();
});


// We only want to run the workflow when not in production
if (!isProduction) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/home', function (req, res) {
    res.render('home');
});

var apiRoutes = express.Router();
app.use('/api', apiRoutes);
app.listen(port);
console.log('Magic happens at http://localhost:' + port);