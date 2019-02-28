'use strict';

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');


var api = express.Router();

/**
 * GET
 */
api.get('/user/all',
    md_auth.ensureAut,
    UserController.listUsers);

/**
 * POST
 */
api.post('/user/add',
    md_auth.ensureAut,
    UserController.addUser);

api.post('/user/login',
    UserController.loginUser);

/**
 * PUT
 */
api.put('/user/update/:id',
    md_auth.ensureAut,
    UserController.updateUser);

/**
 * DELETE
 */
api.delete('/user/delete/:id',
    md_auth.ensureAut,
    UserController.removeUser);

module.exports = api;