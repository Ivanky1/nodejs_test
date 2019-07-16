var fs = require('fs');
var http = require('http').createServer().listen(4257);
http.on('request', function(req, res) {
    res.writeHead(200);
    res.write('Start');
    var newFile = fs.createWriteStream('file-4.txt');
   // req.pipe(newFile);
    req.on('data', function(txt) {
		
        txt = 'New '+ txt;
        newFile.write(txt);
    })
    req.on('end', function() {
        res.end('UPLOADED!!!');
    });

});