const express = require('express');

const User = require('../models/user.model');
//const middleware = require('../middleware/user.middleware');
const { getUser, getUserID } = require('../controllers/user.controllers');

//const jwt = require('jsonwebtoken');

const  routes = express.Router();

routes.get('/get-user/:id', getUserID);

routes.get('/get-user', getUser);

module.exports = routes;