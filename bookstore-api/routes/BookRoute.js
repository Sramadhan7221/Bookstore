const express = require('express');
const {getBooks, getBooksDetail, addBook, updateBook, deleteBook} = require('../controllers/BookController.js');
const {addBookFile, deleteBookFile} = require('../controllers/BookFileController.js');
const { authenticate, authAdmin } = require('../config/Middleware.js');

const router = express.Router();

router.get('/books',authenticate, getBooks);
router.get('/books/:slug', authenticate, getBooksDetail);
router.post('/books', authenticate, addBook);
router.patch('/books/:id', authenticate, updateBook);
router.delete('/books/:id', authAdmin,deleteBook);
router.post('/book-files', authenticate, addBookFile);
router.delete('/book-files/:id', authAdmin,deleteBookFile);

module.exports = router;