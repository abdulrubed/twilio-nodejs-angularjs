//Created date 17-04-2017
var express      = require('express'),
    app          = express(),
    fs           = require('fs'),
    path         = require('path'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    compression  = require('compression');
 
var logConfig = {
    skip: function(req, res) {
        return res.statusCode < 400
    }
};

app.use(logger('dev', logConfig));

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
}

app.set('rootDirectory', __dirname); // Set root directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(2149, function() {
    console.log('listening on 2149');
})

// require routes files
var routPath = path.join(app.get('rootDirectory'), 'routes');
var files    = fs.readdirSync(routPath);
files.forEach(function(file, index) {
    require(path.join(routPath, file))(app);
})

// catch 404 and forward to error handler
app.use('/api/*',function(req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});
 

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            success: false,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message,
        error: err
    });
});

module.exports = app;
