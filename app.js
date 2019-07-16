var express = require('express');
var app = express();
app.listen(4027);
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/file-4.txt');
})