const express = require('express');

const router  = express.Router();

const { register } = require('../controller/registerController');
const { getUsers, addUser, deleteUser } = require('../controller/userController');

const { token } = require('../middlewares/token');


//register
router.post('/register',register);


//users
router.get('/users',getUsers);
router.post('/user',addUser);
router.delete('/user/:id',deleteUser);

module.exports = router;