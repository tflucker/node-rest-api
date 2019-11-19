var mongoose = require('mongoose')


var bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    genre: String
});


var Book = mongoose.model('Book', bookSchema);

module.exports = Book;