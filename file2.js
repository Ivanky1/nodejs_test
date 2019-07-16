var fs = require('fs');
var file = fs.createReadStream('file1.txt');
var newFile = fs.createWriteStream('file2.txt');
file.pipe(newFile);