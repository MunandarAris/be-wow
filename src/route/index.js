const express = require('express');

const router  = express.Router();

const { register } = require('../controller/registerController');
const { getUsers, addUser, deleteUser } = require('../controller/userController');
const { login } = require('../controller/loginController');

const { token } = require('../middlewares/token');


//login
router.get('/login',login);

//register
router.post('/register',register);


//users
router.get('/users',getUsers);
router.delete('/user/:id',deleteUser);

module.exports = router;