const express = require('express');

const router  = express.Router();

const { register } = require('../controllers/register');
const { getUsers, deleteUser } = require('../controllers/user');
const { login } = require('../controllers/login');
const { addBook, getBooks, getBook, deleteBook, updateBook } = require('../controllers/book');
const { addTransaction, updateTransaction, getTransactions, getTransaction } = require('../controllers/transaction');

const { token } = require('../middlewares/token');
const { uploadFiles } = require('../middlewares/uploadFiles');


//login
router.get('/login',login);

//register
router.post('/register',register);


//users
router.get('/users',getUsers);
router.delete('/user/:id',deleteUser);

//Book
router.post('/book',token,uploadFiles("bookFile"),addBook);
router.get('/books',getBooks);
router.get('/book/:id',getBook);
router.put('/book/:id',token,uploadFiles("bookFile"),updateBook);
router.delete('/book/:id',token,deleteBook);

//transaction
router.post('/transaction',token,uploadFiles("proofTransaction"),addTransaction);
router.put('/transaction/:id',token,updateTransaction);
router.get('/transactions',getTransactions);
router.get('/transaction/:id',getTransaction);

module.exports = router;