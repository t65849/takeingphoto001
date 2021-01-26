// Application Log
var log4js = require('log4js');
var log4js_extend = require('log4js-extend');
log4js_extend(log4js, {
    path: __dirname,
    format: '(@file:@line:@column)'
});
log4js.configure(__dirname + '/log4js.json');
var logger = log4js.getLogger('bot');
var quickSearchData = [];

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var server = http.Server(app); // create express server
var options = {
    pingTimeout: 60000,
    pingInterval: 3000
};
var listener = server.listen(process.env.port || process.env.PORT || 3870, function () {
    logger.info('Server listening to ' + listener.address().port);
});

process.on('uncaughtException', function (err) {
    logger.error('uncaughtException occurred: ' + (err.stack ? err.stack : err));
});

// Setup Express Server
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});

// 讀取組態表
var fs = require('fs');

app.get('/api', function (request, response) {
    response.send('API is running');
    console.log('API is running');
});

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/pages', express.static(__dirname + '/pages'));
//app.use(express.static('pages')); //導入pages資料夾裡的東西
app.get('/capture', function (request, response) {
    console.log('GET /login');
    request.header("Content-Type", 'text/html');
    var nonce = "";
    nonce = new Date().getTime();
    //nonce = 'testnonce';
    var fs = require('fs');
    fs.readFile(__dirname + '/pages/capture.html', 'utf8', function (err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({
        req: request,
        res: response
    }));
});
