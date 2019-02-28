'use strict';

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');


var api = express.Router();

/**
 * GET
 */
api.get('/all',
    md_auth.ensureAut,
    UserController.listUsers);

/**
 * POST
 */
api.post('/add',
    UserController.addUser);

api.post('/login',
    UserController.loginUser);

/**
 * PUT
 */
api.put('/update/:id',
    md_auth.ensureAut,
    UserController.updateUser);

/**
 * DELETE
 */
api.delete('/delete/:id',
    md_auth.ensureAut,
    UserController.removeUser);

module.exports = api;