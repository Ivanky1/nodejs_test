var http = require('http').createServer().listen(4257);
http.on('request', function(req, res) {
    res.writeHead(200);
    res.write('Start');
    req.on('data', function(msg) {
        console.log(msg.toString());
    });
    req.on('end', function() {
        res.end();
    });

   //req.emit('data', ['aaa']);

});
