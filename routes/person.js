'use strict';

var express = require('express');
var PersonController = require('../controllers/person');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/add', PersonController.savePerson);
api.post('/login', PersonController.loginPerson);

api.delete('/delete', PersonController.deletePerson);

module.exports = api;