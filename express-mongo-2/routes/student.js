'use strict';

var express = require('express');
var StudentController = require('../controllers/student');

var api = express.Router();

api.get('/student/test', StudentController.test);

module.exports = api;