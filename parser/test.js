/**
 * Created by Ena on 28.04.15.
 */
var url = require('url');
var ejs = require('ejs');
var request = require('request');
var express = require('express');
var app = express();
app.listen(4027);

//app.engine('ejs', require('ejs'));
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/find/google/:search', function(req, res) {
    var search = req.params.search;
    var option = {
        protocol: 'http',
        host: 'ajax.googleapis.com',
        pathname: '/ajax/services/feed/find',
        query: {v: '1.0', q: search}
    }
    var myUrl = url.format(option);
    request(myUrl, function(err, responce, body) {
        var feeds = JSON.parse(body);
        res.render('google_search', {feeds: feeds.responseData, keyword: search});
    })
})

//ajax/services/feed/find