var express = require('express');
var router = express.Router();

var Book = require('./../models/books');

// API ENDPOINTS

/* Returns a list of all 'Book' records */
router.get('/findAll', function (req, res, next) {
    //   res.render('index',);
    Book.find({}, function (err, books) {
        if (err) {
            res.send(err)
        } else {
            res.send(books);
        }
    });
});

/* Returns a single 'Book' record based on the provided id */
router.get('/findById/:id', function (req, res, next) {
    Book.findById(req.params.id, function (err, book) {
        if (err) {
            res.send(err)
        } else if (book) {
            res.send(book)
        } else {
            res.send('Unable to find Book with that id.')
        }
    });
});

/* Creates a new 'Book' record based on parameters provided */
router.post('/create', function (req, res, next) {

    var newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre
    });

    newBook.save(function (err, result) {
        if (err) {
            res.send('Error occured when creating new book ...');
        } else {
            res.send(result)
        }
    });
});

/* Updates an existing 'Book' record, based on whatever input is provided. If record is not found, return error. */
router.post('/update/:id', function (req, res, next) {
    Book.findById(req.params.id, function (err, book) {
        if (err) {
            res.send(err)
        } else if (!book) {
            res.send('Unable to find Book with that id.')
        } else {

            book.name = req.body.name;
            book.author = req.body.author;
            book.genre = req.body.genre;

            book.save(function (err, result) {
                if (err) {
                    res.send('Error occured when creating new book ...');
                } else {
                    res.send(result)
                }
            });
        }
    });
});

/* Deletes a 'book' record based on the id provided */
router.post('/delete/:id', function (req, res, next) {
    Book.deleteOne({
        _id: req.params.id
    }, function (err) {
        if (err) {
            res.send('Unable to delete record ...')
        }
    })
    res.send('Successfully deleted record with id: ' + req.params.id)
});

module.exports = router;