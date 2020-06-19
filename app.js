const express = require('express')
    , http = require('http')
    , path = require('path')

var app = express();

// CONFIGURATION
app.set('port', process.env.PORT || 3000);

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));

// app.configure(() => {
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'ejs');
  // app.use(express.favicon());
  // app.use(express.logger('dev'));
  // app.use(express.bodyParser());
  // app.use(express.methodOverride());
  // app.use(express.cookieParser('your secret here'));
  // app.use(express.session());
  // app.use(app.router);
// });

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello World Express');
});

// CREATE HTTP SERVER and LISTEN
http.createServer(app).listen(app.get('port'), () => {
  console.log("Express server listening on port " + app.get('port'));
});
