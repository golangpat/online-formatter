var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');

var logDirectory = __dirname + '/log';

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: "YYYY-MM-DD"
})


logger.token("remote-addr", function(request) {
    var ipAddress = getClientIp(request);
    return(ipAddress);
});


// setup the logger
app.use(logger('common', {stream: accessLogStream}));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(200);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function getClientIp(req) {

    // the ipAddress we return
    var ipAddress;

    // workaround to get real client IP
    // most likely because our app will be behind a [reverse] proxy or load balancer
    var clientIp = req.headers['x-client-ip'],
        forwardedForAlt = req.headers['x-forwarded-for'],
        realIp = req.headers['x-real-ip'],
    // more obsure ones below
        clusterClientIp = req.headers['x-cluster-client-ip'],
        forwardedAlt = req.headers['x-forwarded'],
        forwardedFor = req.headers['forwarded-for'],
        forwarded = req.headers['forwarded'];

    // x-client-ip
    if (clientIp) {
        ipAddress = clientIp;
    }

    // x-forwarded-for
    else if (forwardedForAlt) {
        // x-forwarded-for header is more common
        // it may return multiple IP addresses in the format:
        // "client IP, proxy 1 IP, proxy 2 IP"
        // we pick the first one
        var forwardedIps = forwardedForAlt.split(',');
        ipAddress = forwardedIps[0];
    }

    // x-real-ip
    // (default nginx proxy/fcgi)
    else if (realIp) {
        // alternative to x-forwarded-for
        // used by some proxies
        ipAddress = realIp;
    }

    // x-cluster-client-ip
    // (Rackspace LB and Riverbed's Stingray)
    // http://www.rackspace.com/knowledge_center/article/controlling-access-to-linux-cloud-sites-based-on-the-client-ip-address
    // https://splash.riverbed.com/docs/DOC-1926
    else if (clusterClientIp) {
        ipAddress = clusterClientIp;
    }

    // x-forwarded
    else if (forwardedAlt) {
        ipAddress = forwardedAlt;
    }

    // forwarded-for
    else if (forwardedFor) {
        ipAddress = forwardedFor;
    }

    // forwarded
    else if (forwarded) {
        ipAddress = forwarded;
    }

    // fallback to something
    if (!ipAddress) {
        // ensure getting client IP address still works in development environment
        // if despite all this we do not find ip, then it returns null
        try {
            ipAddress = req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress || // for https
                null;
        } catch(e) {
            ipAddress = null;
        }
    }

    // final attempt to get IP address, via info object within request.
    // if despite all this we do not find ip, then it returns null.
    if (!ipAddress) {
        if (typeof req.info !== 'undefined'){
            ipAddress = req.info.remoteAddress || null;
        }
    }

    return ipAddress;
}


module.exports = app;
