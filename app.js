// Convention: All requires are a the top. Requires from npm packages go first.
var createError = require('http-errors');
var express = require('express');
var path = require('path'); // Used to work with paths on the filesystem in general
var cookieParser = require('cookie-parser'); // Needed to work with cookies
var logger = require('morgan'); // Logs GET, POST, etc requests to STDOUT
var sassMiddleware = require('node-sass-middleware');

// Convention: Requires from your own packages go after npm packages
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// Set up views used to render HTML
app.set('views', path.join(__dirname, 'views'));
// EJS is like JSX for node. Here are the docs: https://ejs.co/
app.set('view engine', 'ejs');

/**
 * Configure Middleware
 */

// Set up logger
// DISCUSS1: What would you do if you wanted to change the output?
// Say you think it's too much detail and you want to make it more concise
app.use(logger('dev'));

app.use(express.json());
// Parse urlencoded HTTP payloads, like data from POST requests
// See: http://expressjs.com/en/api.html
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Automatically compile scss files from public/stylesheets into css files that the browser can read
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes. You can add more routes here.
app.use('/', indexRouter);
// All requests for urls that start with /admin will be handled by the adminRouter.
// Ex: GET /admin/products will be handled by a route defined in adminRouter.
app.use('/admin', adminRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // DISCUSS2: How does the error handler work?

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page (views/error.ejs)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
