/**
 * Created by Ena on 23.04.15.
 */

var mongoose = require('mongoose');

//подключение к базе данных
mongoose.connect( 'mongodb://localhost/backbone_books' );
var Keywords = new mongoose.Schema({
    keyword: String
});
//схемы
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [ Keywords ],
    coverImage: String
});
//модели
var BookModel = mongoose.model( 'Book', Book );

exports.BookModel = BookModel;