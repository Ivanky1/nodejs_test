var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');

var port = 4721;


var app = express();
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(multer({dest: __dirname + '/public/uploads'}));


var BookModel = require(__dirname +'/db').BookModel;

app.get('/api/books', function(req, res) {
    return BookModel.find(function(err, books) {
        if (!err) {
            return res.send( books );
        } else {
            return console.log( err );
        }
    })
})

app.post('/api/books',  function(req, res) {
    //var fnew = fs.createWriteStream(__dirname + '/public/uploads/test.txt');
  //  var rf = fs.createReadStream(req.body.coverImage);

    //rf.pipe(fnew);
    var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords
    })

    book.save(function(err) {
        if (!err) {
            return console.log( 'created' );
        } else {
            return console.log(err);
        }
    })
    return res.send(book);
})

app.put('/api/books/:id', function(req, res) {
    return BookModel.findById(req.params.id, function(err, book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.releaseDate = req.body.releaseDate;
        book.keywords = req.body.keywords
        return book.save(function(err) {
            if (!err) {
                console.log( 'updated book' );
            } else {
                console.log(err);
            }
            return res.send(book);
        })
    })
})

app.delete('/api/books/:id', function(req, res) {
    return BookModel.findById(req.params.id, function(err, book) {
        return book.remove(function(err) {
            if (!err) {
                console.log( 'remove book' );
            } else {
                console.log(err);
            }
        })
    })
})

app.listen(port, function() {
    console.log('Connect server is express ', port);
});
