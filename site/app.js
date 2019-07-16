/**
 * Created by Ena on 24.04.15.
 */

var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var conf = require('./config/config');
var router = express.Router();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsLocals = require('ejs-locals');
var cookieParser = require('cookie-parser');



var app = express();
app.engine('ejs', ejsLocals);

app.use(cookieParser());
app.use(session(
    {
        secret: conf.session.secret,
        key: conf.session.key,
        cookie: conf.session.cookie

    }
));


app.set('views',  __dirname + '/'+ conf.app_view);
app.set('view engine', conf.app_engine);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + conf.app_static));

require('./routes')(app);

app.listen( conf.port, function() {
    console.log( 'Express server listening on port %d in %s mode',conf.port, app.settings.env );
});

