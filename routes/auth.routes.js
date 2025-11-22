const express = require('express');

const { createUser, loginUser } = require('../controllers/auth.controllers');

const  routes = express.Router();

routes.post('/create-user', createUser);

routes.post('/login-user', loginUser);

module.exports = routes;